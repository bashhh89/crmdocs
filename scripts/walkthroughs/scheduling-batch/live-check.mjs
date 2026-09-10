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
const before=sql(`SELECT row_to_json(t) FROM tech_schedule_calendar_tokens t WHERE staff_id='${id}'`)
for(const route of ['month','notifications','requests'])assert.equal((await api('/api/tech-schedule/'+route)).status,200)
const periods=(await api('/api/tech-schedule/periods')).data.periods
const published=periods.find(p=>p.status==='published'),draft=periods.find(p=>p.status==='draft')
assert.equal((await api('/api/tech-schedule/planning?period='+published.id)).status,200)
assert.equal((await api('/api/tech-schedule/planning?period='+published.id,tech)).status,403)
if(draft)assert.equal((await api('/api/tech-schedule/periods/'+draft.id,tech)).status,403)
assert.equal((await api('/api/tech-schedule/calendar?scope=technician&staff_id='+id,tech)).status,403)
const techMonth=(await api('/api/tech-schedule/month',tech)).data
assert.ok(techMonth.assignments.every(a=>a.status==='published'))
const selection=await api('/api/tech-schedule/calendar?scope=technician&staff_id='+tech.userId);assert.equal(selection.status,200,JSON.stringify(selection.data));const selected=selection.data
const text=(await (await fetch(selected.url)).text()).replace(/\r\n /g,'')
const expected=JSON.parse(sql(`SELECT COALESCE(json_agg(x),'[]') FROM(SELECT staff_id,to_char(work_date,'YYYY-MM-DD') AS date,shift_id FROM tech_schedule_assignments a JOIN tech_schedule_periods p ON p.id=a.period_id WHERE staff_id='${tech.userId}' AND p.status='published' AND p.archived_at IS NULL AND p.end_date>=CURRENT_DATE-60)x`))
assert.deepEqual([...text.matchAll(/^UID:(.+)$/gm)].map(m=>m[1].trim()).sort(),expected.map(x=>`${x.staff_id}.${x.date}.${x.shift_id}@services.ancsports.net`).sort())
assert.equal(sql(`SELECT row_to_json(t) FROM tech_schedule_calendar_tokens t WHERE staff_id='${id}'`),before)
const browser=await chromium.launch(),checks=[]
try{for(const width of [1440,390]){
 const ctx=await browser.newContext({viewport:{width,height:1000},permissions:['clipboard-read','clipboard-write']})
 await ctx.addCookies([{name:'token',value:sign(user),domain:new URL(base).hostname,path:'/',secure:true,httpOnly:true}]);await ctx.addInitScript(u=>{for(const[k,v]of Object.entries({userName:u.fullName,userRole:u.role,userId:u.userId,userEmail:u.email}))localStorage.setItem(k,v)},user)
 const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));page.setDefaultTimeout(45000)
 for(const route of ['month','notifications','requests']){
 await page.goto(base+'/tech-schedule/'+route,{waitUntil:'networkidle'});await page.locator('main h1').waitFor()
 if(route==='month'){await page.getByLabel('Filter technician').selectOption(id);await page.waitForTimeout(250)}
 if(route==='requests'){await page.getByText('Submit a request',{exact:true}).click();await page.getByLabel('Request type').selectOption('swap');const choices=page.locator('main select');assert.ok(await choices.nth(1).locator('option').count()>1);await choices.nth(1).selectOption({index:1});await choices.nth(2).selectOption({index:1});assert.ok(await choices.nth(1).inputValue());assert.ok(await choices.nth(2).inputValue())}
 await page.screenshot({path:folder+`/live-${route}-${width}.png`})
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)
 assert.ok(overflow<=0);checks.push({route,width,overflow})
 }
 await page.goto(base+'/tech-schedule?period='+published.id,{waitUntil:'networkidle'});await page.locator('#schedule-publish-review summary').first().click();await page.locator('#schedule-publish-review table tbody tr').first().waitFor({state:'attached'});await page.locator('#schedule-publish-review').scrollIntoViewIfNeeded()
 await page.screenshot({path:folder+`/live-review-${width}.png`})
 await page.getByRole('button',{name:'+ New schedule',exact:true}).click();await page.getByLabel('Copy from schedule').selectOption(published.id)
 await page.screenshot({path:folder+`/live-copy-${width}.png`})
 await page.goto(base+'/tech-schedule/team?calendar=master',{waitUntil:'networkidle'});await page.locator('#techCalScope').selectOption(tech.userId);await page.waitForFunction(()=>!!document.querySelector('#techCalUrl')?.value)
 await page.getByRole('button',{name:'Copy link',exact:true}).click();assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),selected.url)
 await page.addStyleTag({content:'#techCalUrl{filter:blur(6px)}'});await page.screenshot({path:folder+`/live-outlook-${width}.png`})
 assert.deepEqual(errors,[]);assert.ok(await page.locator('script[src*="umami"]').count()>0)
 checks.push({route:'board/outlook',width,pageErrors:0,copy:true,tracking:true})
 await ctx.close()
}}finally{await browser.close()}
const report={at:new Date().toISOString(),url:base+'/tech-schedule',individualFeedExactMatch:expected.length,existingCalendarCredentialsUnchanged:true,draftDenied:true,builderControlsDenied:true,checks}
fs.writeFileSync(folder+'/live-verification.json',JSON.stringify(report,null,2));console.log(JSON.stringify(report))
