import {execFileSync} from 'node:child_process'
import {createHmac,createHash} from 'node:crypto'
import {createRequire} from 'node:module'
import fs from 'node:fs'
import assert from 'node:assert/strict'
const {chromium}=createRequire('/root/anc-kb/package.json')('playwright')
const folder=import.meta.dirname+'/review',base='https://services.ancsports.net'
const sql=s=>execFileSync('docker',['exec','anc-services-db-standalone','psql','-U','ancservices','-d','anc_services','-t','-A','-c',s],{encoding:'utf8'}).trim()
const id='ff9a213b-e194-4656-9137-773a59b5f572'
const who=where=>JSON.parse(sql(`SELECT row_to_json(u) FROM (SELECT s.id AS "userId",s.full_name AS "fullName",s.email,s.role FROM staff s WHERE s.is_active AND ${where} LIMIT 1)u`))
const user=who(`s.id='${id}'`),tech=who(`s.role='tech_support' AND EXISTS(SELECT 1 FROM tech_schedule_rules r WHERE r.staff_id=s.id AND r.is_active) AND NOT EXISTS(SELECT 1 FROM tech_schedule_admins a WHERE a.staff_id=s.id)`)
const spec=JSON.parse(execFileSync('docker',['service','inspect','abc_anc-services'],{encoding:'utf8'}))[0]
const secret=spec.Spec.TaskTemplate.ContainerSpec.Env.find(x=>x.startsWith('JWT_SECRET=')).slice(11)
const sign=u=>{const b=v=>Buffer.from(JSON.stringify(v)).toString('base64url');const s=b({alg:'HS256'})+'.'+b({...u,iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+1200});return s+'.'+createHmac('sha256',secret).update(s).digest('base64url')}
const api=async(p,u=user)=>{const r=await fetch(base+p,{headers:{Cookie:'token='+sign(u)}});return{status:r.status,data:await r.json()}}
const mutation=async(path,method,body)=>{const r=await fetch(base+path,{method,headers:{Cookie:'token='+sign(user),'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});return{status:r.status,data:await r.json()}}
const periods=(await api('/api/tech-schedule/periods')).data.periods
const source=periods.find(p=>p.status==='published'&&p.assigned_count>0)
assert.ok(source)
const start='2030-01-06'
assert.ok(!periods.some(p=>p.start_date<='2030-01-19'&&p.end_date>=start))
const before=sql("SELECT json_build_object('periods',(SELECT count(*) FROM tech_schedule_periods),'assignments',(SELECT count(*) FROM tech_schedule_assignments),'notifications',(SELECT count(*) FROM tech_schedule_notifications))")
let created,report
try {
 const result=await mutation('/api/tech-schedule/periods','POST',{start_date:start,weeks:2,copy_from:source.id})
 assert.equal(result.status,200,JSON.stringify(result.data));created=result.data.period.id
 assert.ok(result.data.copied>0);assert.equal(result.data.period.status,'draft')
 const review=(await api('/api/tech-schedule/planning?period='+created)).data
 assert.ok(review.unconfirmed.length>0);assert.equal(review.conflicts.length,0)
 const publish=await mutation('/api/tech-schedule/periods/'+created,'PATCH',{status:'published',review_token:review.review_token})
 assert.equal(publish.status,409)
 const browser=await chromium.launch();try {
 const ctx=await browser.newContext({viewport:{width:1440,height:1000}})
 await ctx.addCookies([{name:'token',value:sign(user),domain:new URL(base).hostname,path:'/',secure:true,httpOnly:true}]);await ctx.addInitScript(u=>{for(const[k,v]of Object.entries({userName:u.fullName,userRole:u.role,userId:u.userId,userEmail:u.email}))localStorage.setItem(k,v)},user)
 const page=await ctx.newPage();await page.goto(base+'/tech-schedule?period='+created,{waitUntil:'networkidle'});await page.locator('#schedule-publish-review summary').first().click();await page.getByText(/availability unconfirmed/).first().waitFor({state:'attached'});await page.locator('#schedule-publish-review').scrollIntoViewIfNeeded();await page.screenshot({path:folder+'/live-copy-correction.png'})
 }finally{await browser.close()}
 report={at:new Date().toISOString(),copied:result.data.copied,skipped:result.data.skipped.length,unconfirmed:review.unconfirmed.length,publishBlockedWithoutConfirmation:true}
}finally {
 if(created){const cleanup=await mutation('/api/tech-schedule/periods/'+created,'DELETE');assert.equal(cleanup.status,200,JSON.stringify(cleanup.data))}
 assert.equal(sql("SELECT json_build_object('periods',(SELECT count(*) FROM tech_schedule_periods),'assignments',(SELECT count(*) FROM tech_schedule_assignments),'notifications',(SELECT count(*) FROM tech_schedule_notifications))"),before)
}
fs.writeFileSync(folder+'/live-copy-correction.json',JSON.stringify({...report,temporaryDraftRemoved:true,noNotificationsCreated:true},null,2));console.log(JSON.stringify(report))
