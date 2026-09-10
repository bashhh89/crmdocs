import {execFileSync} from 'node:child_process'
import {createHmac,createHash} from 'node:crypto'
import {createRequire} from 'node:module'
import fs from 'node:fs'
import assert from 'node:assert/strict'
const {chromium}=createRequire('/root/anc-kb/package.json')('playwright')
const sql=s=>execFileSync('docker',['exec','anc-services-db-standalone','psql','-U','ancservices','-d','anc_services','-t','-A','-c',s],{encoding:'utf8'}).trim()
const base='https://services.ancsports.net'
const id='ff9a213b-e194-4656-9137-773a59b5f572'
const user=JSON.parse(sql(`SELECT row_to_json(u) FROM (SELECT id AS "userId", full_name AS "fullName", email, role FROM staff WHERE id='${id}' AND is_active) u`))
const spec=JSON.parse(execFileSync('docker',['service','inspect','abc_anc-services'],{encoding:'utf8'}))[0]
const secret=spec.Spec.TaskTemplate.ContainerSpec.Env.find(x=>x.startsWith('JWT_SECRET=')).slice(11)
const sign=u=>{const b=v=>Buffer.from(JSON.stringify(v)).toString('base64url');const s=b({alg:'HS256'})+'.'+b({...u,iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+600});return s+'.'+createHmac('sha256',secret).update(s).digest('base64url')}
const token=sign(user)
const api=async(path,jwt=token)=>{const r=await fetch(base+path,{headers:{Cookie:'token='+jwt}});return {status:r.status,body:await r.json()}}
const hash=s=>createHash('sha256').update(s).digest('hex')
const before=hash(sql(`SELECT token FROM tech_schedule_calendar_tokens WHERE staff_id='${id}'`))
const master=await api('/api/tech-schedule/calendar?scope=master')
assert.equal(master.status,200)
assert.equal(master.body.scope,'master','new version must declare master scope')
const feed=await fetch(master.body.url);assert.equal(feed.status,200);assert.match(feed.headers.get('content-type'),/^text\/calendar/)
const ics=(await feed.text()).replace(/\r\n /g,'')
assert.match(ics,/X-WR-CALNAME:ANC Tech Support — Master Schedule/)
const expected=JSON.parse(sql(`SELECT json_agg(x) FROM (SELECT a.staff_id, to_char(a.work_date,'YYYY-MM-DD') AS date,a.shift_id,s.full_name FROM tech_schedule_assignments a JOIN tech_schedule_periods p ON p.id=a.period_id JOIN staff s ON s.id=a.staff_id WHERE p.status='published' AND p.end_date>=CURRENT_DATE-60) x`))
const expectedIds=expected.map(x=>`${x.staff_id}.${x.date}.${x.shift_id}@services.ancsports.net`).sort()
const actualIds=[...ics.matchAll(/^UID:(.+)$/gm)].map(m=>m[1].trim()).sort()
assert.deepEqual(actualIds,expectedIds)
for(const name of new Set(expected.map(x=>x.full_name)))assert.ok(ics.includes('SUMMARY:'+name+' —'))
const mine=await api('/api/tech-schedule/calendar')
assert.notEqual(mine.body.url,master.body.url)
const personal=await (await fetch(mine.body.url+'?scope=master')).text()
assert.equal((personal.match(/BEGIN:VEVENT/g)||[]).length,expected.filter(x=>x.staff_id===id).length)
assert.equal(hash(sql(`SELECT token FROM tech_schedule_calendar_tokens WHERE staff_id='${id}'`)),before)
const noAccess=JSON.parse(sql(`SELECT row_to_json(u) FROM (SELECT s.id AS "userId",s.role,s.full_name AS "fullName",s.email FROM staff s WHERE s.is_active AND NOT EXISTS(SELECT 1 FROM tech_schedule_admins a WHERE a.staff_id=s.id) AND s.role='tech_support' LIMIT 1) u`))
assert.equal((await api('/api/tech-schedule/calendar?scope=master',sign(noAccess))).status,403)
const checks=[]
const browser=await chromium.launch()
try{
 for(const viewport of [{width:1440,height:1000},{width:390,height:844}]){
  const ctx=await browser.newContext({viewport,permissions:['clipboard-read','clipboard-write']})
  await ctx.addCookies([{name:'token',value:token,domain:new URL(base).hostname,path:'/',secure:true,httpOnly:true}])
  await ctx.addInitScript(u=>{for(const [k,v]of Object.entries({userName:u.fullName,userRole:u.role,userId:u.userId,userEmail:u.email}))localStorage.setItem(k,v)},user)
  const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message))
  await page.goto(base+'/tech-schedule',{waitUntil:'domcontentloaded'})
  const link=page.getByRole('link',{name:'Master schedule to Outlook',exact:true});await link.click()
  await page.waitForSelector('#techCalUrl',{timeout:30000})
  assert.equal(await page.locator('#techCalScope').inputValue(),'master')
  assert.equal(await page.locator('#techCalUrl').inputValue(),master.body.url)
  await page.getByRole('button',{name:'Copy link',exact:true}).click()
  assert.equal(await page.evaluate(()=>navigator.clipboard.readText()),master.body.url)
  await page.addStyleTag({content:'#techCalUrl {filter:blur(6px)}'})
  await page.screenshot({path:`/root/anc-walkthroughs/master-outlook/review/master-${viewport.width}.png`})
  await page.locator('#techCalScope').selectOption('personal')
  await page.waitForFunction(()=>!document.querySelector('#techCalScope')?.disabled)
  assert.equal(await page.locator('#techCalUrl').inputValue(),mine.body.url)
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth)
  assert.equal(overflow,0);assert.deepEqual(errors,[])
  checks.push({width:viewport.width,scopeSwitch:true,copy:true,overflow,pageErrors:errors.length})
  await ctx.close()
 }
}finally{await browser.close()}
const report={url:base+'/tech-schedule/team?calendar=master',at:new Date().toISOString(),masterShifts:expected.length,people:new Set(expected.map(x=>x.staff_id)).size,personalShifts:expected.filter(x=>x.staff_id===id).length,exactEventIdentityMatch:true,personalTokenUnchanged:true,nonBuilderDenied:true,checks}
fs.writeFileSync('/root/anc-walkthroughs/master-outlook/review/live-verification.json',JSON.stringify(report,null,2))
console.log(JSON.stringify(report,null,2))
