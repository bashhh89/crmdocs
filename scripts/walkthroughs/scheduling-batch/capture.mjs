import {execFileSync} from 'node:child_process'
import {createHmac} from 'node:crypto'
import {createRequire} from 'node:module'
import fs from 'node:fs'
import path from 'node:path'
const {chromium}=createRequire('/root/anc-kb/package.json')('playwright')
const dir=import.meta.dirname
const sh=(c,a)=>execFileSync(c,a,{encoding:'utf8'}).trim()
const sql=s=>sh('docker',['exec','anc-services-db-standalone','psql','-U','ancservices','-d','anc_services','-t','-A','-c',s])
const base='https://services.ancsports.net'
const publishedPeriod=sql("SELECT id FROM tech_schedule_periods WHERE status='published' AND end_date>=CURRENT_DATE ORDER BY start_date LIMIT 1")
const draftPeriod=sql("SELECT id FROM tech_schedule_periods WHERE status='draft' ORDER BY end_date DESC LIMIT 1")
const user=JSON.parse(sql(`SELECT row_to_json(u) FROM (SELECT id AS "userId", full_name AS "fullName", email, role FROM staff WHERE id='ff9a213b-e194-4656-9137-773a59b5f572' AND is_active) u`))
const spec=JSON.parse(sh('docker',['service','inspect','abc_anc-services']))[0]
const key=spec.Spec.TaskTemplate.ContainerSpec.Env.find(s=>s.startsWith('JWT_SECRET=')).slice(11)
const b=x=>Buffer.from(JSON.stringify(x)).toString('base64url')
const body=b({alg:'HS256'})+'.'+b({...user,iat:Math.floor(Date.now()/1000),exp:Math.floor(Date.now()/1000)+1800})
const jwt=body+'.'+createHmac('sha256',key).update(body).digest('base64url')
for(const folder of ['raw','clips','frames','review'])fs.mkdirSync(path.join(dir,folder),{recursive:true})
const dur=id=>Number(sh('ffprobe',['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',path.join(dir,'voice',id+'.mp3')]))+1
const sleep=ms=>new Promise(r=>setTimeout(r,ms))
const browser=await chromium.launch()
const timeline=[]
let raw
try{
 const ctx=await browser.newContext({viewport:{width:1600,height:900},deviceScaleFactor:1.2,recordVideo:{dir:path.join(dir,'raw'),size:{width:1920,height:1080}},permissions:['clipboard-read','clipboard-write']})
 await ctx.addCookies([{name:'token',value:jwt,domain:new URL(base).hostname,path:'/',secure:true,httpOnly:true}])
 await ctx.addInitScript(u=>{
  for(const [k,v]of Object.entries({userName:u.fullName,userRole:u.role,userId:u.userId,userEmail:u.email,sidebarExpanded:'true',sidebarSections:JSON.stringify({events:true})}))localStorage.setItem(k,v)
  const install=()=>{
   if(!document.documentElement)return
   if(!document.getElementById('capture-privacy')){
    const style=document.createElement('style');style.id='capture-privacy';style.textContent='#techCalUrl{filter:blur(7px)!important}';document.documentElement.append(style)
   }
   if(document.getElementById('capture-pointer'))return
   const cursor=document.createElement('div');cursor.id='capture-pointer';cursor.style.cssText='position:fixed;left:800px;top:440px;z-index:2147483647;pointer-events:none;filter:drop-shadow(0 1px 2px #999)';cursor.innerHTML='<svg width="25" height="28" viewBox="0 0 25 28"><path d="M3 2 L3 22 L9 17 L13 26 L17 24 L13 15 L22 15 Z" fill="#111" stroke="white" stroke-width="2"/></svg>';document.documentElement.append(cursor)
   window.addEventListener('mousemove',e=>{cursor.style.left=e.clientX+'px';cursor.style.top=e.clientY+'px'},true)
  }
  install();document.addEventListener('DOMContentLoaded',install)
 },user)
 const started=Date.now();const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message))
 const move=async locator=>{const r=await locator.boundingBox();if(!r)throw Error('target missing');await page.mouse.move(r.x+r.width/2,r.y+r.height/2,{steps:30});await sleep(350)}
 const click=async locator=>{await move(locator);await locator.click();await sleep(450)}
 const scene=async(id,action)=>{const t=Date.now();const from=(t-started)/1000;await action();await sleep(Math.max(0,dur(id)*1000-(Date.now()-t)));await page.screenshot({path:path.join(dir,'frames',id+'.png')});timeline.push({id,from,duration:(Date.now()-t)/1000})}
 const visit=async route=>{await page.goto(base+route,{waitUntil:'networkidle'});await sleep(500)}
 await visit('/tech-schedule?period='+publishedPeriod)
 await page.locator('[data-testid="schedule-planning"]').waitFor()
 await scene('s1',async()=>{await move(page.getByRole('heading',{name:'Support Tech Schedule',exact:true}));await sleep(2500);await move(page.getByRole('navigation',{name:'Scheduling tools'}))})
 await visit('/tech-schedule/month')
 await scene('s2',async()=>{await move(page.getByLabel('Filter technician'));await page.getByLabel('Filter technician').selectOption(user.userId);await sleep(2800);await move(page.getByLabel('Filter shift'));await sleep(1600);await move(page.getByLabel('Filter location'))})
 await visit('/tech-schedule/team?calendar=master')
 await page.locator('#techCalUrl').waitFor()
 await scene('s3',async()=>{await move(page.locator('#techCalScope'));await page.locator('#techCalScope').selectOption(user.userId);await page.locator('#techCalUrl').waitFor();await sleep(1600);await click(page.getByRole('button',{name:'Copy link',exact:true}));await sleep(2000);await move(page.locator('[data-testid="tech-calendar-panel"] ol'))})
 await visit('/tech-schedule?period='+publishedPeriod)
 await scene('s4',async()=>{await sleep(700);await click(page.getByRole('button',{name:'+ New schedule',exact:true}));await move(page.getByLabel('Copy from schedule'));await page.getByLabel('Copy from schedule').selectOption(publishedPeriod);await sleep(1800);await move(page.getByRole('button',{name:'Open it',exact:true}))})
 await visit('/tech-schedule?period='+(draftPeriod||publishedPeriod))
 const deadline=page.locator('details').filter({has:page.locator('summary').filter({hasText:'Availability deadline & reminders'})})
 await scene('s5',async()=>{await click(deadline.locator('summary').first());await deadline.scrollIntoViewIfNeeded();await sleep(700);await move(deadline.locator('input[type="date"]'));await sleep(2200);await move(page.getByRole('button',{name:'Remind missing respondents',exact:true}))})
 await page.locator('#schedule-publish-review').evaluate(el=>el.open=true)
 await page.locator('#schedule-publish-review').scrollIntoViewIfNeeded()
 await scene('s6',async()=>{await move(page.locator('#schedule-publish-review table'));await sleep(3000);const warn=page.locator('#schedule-publish-review details summary');if(await warn.count()){await click(warn.first());await sleep(1800)}await page.locator('#schedule-publish-review').scrollIntoViewIfNeeded()})
 await visit('/tech-schedule/requests')
 await scene('s7',async()=>{await click(page.getByText('Submit a request',{exact:true}));await sleep(2500);await move(page.getByLabel('Request type'));await page.getByLabel('Request type').selectOption('swap');await sleep(1100);const mine=page.locator('main select').nth(1),other=page.locator('main select').nth(2);if(await mine.locator('option').count()>1)await mine.selectOption({index:1});if(await other.locator('option').count()>1)await other.selectOption({index:1});await move(page.getByText(/The other technician must accept first/))})
 await visit('/tech-schedule?period='+publishedPeriod)
 const history=page.locator('details').filter({has:page.locator('summary').filter({hasText:'Change history & acknowledgments'})})
 await scene('s8',async()=>{await click(history.locator('summary').first());await history.scrollIntoViewIfNeeded();await move(history);await sleep(2500);await move(page.getByRole('link',{name:/Scheduling inbox/}).last())})
 await visit('/tech-schedule/notifications')
 await scene('s9',async()=>{await move(page.getByRole('heading',{name:'Scheduling inbox',exact:true}));await sleep(2500);await move(page.getByLabel('Email alerts'));await sleep(2300);await move(page.getByText(/Send new scheduling updates to your account email/))})
 await visit('/tech-schedule?period='+publishedPeriod)
 await scene('s10',async()=>{await move(page.getByRole('navigation',{name:'Scheduling tools'}));await sleep(3000);await click(page.getByRole('link',{name:'See it as the techs do',exact:true}));await page.waitForFunction(()=>document.body.innerText.includes('Week 1'));await move(page.getByRole('heading',{name:"Who's on",exact:true}))})
 if(errors.length)throw Error(errors.join('; '))
 const video=page.video();await ctx.close();raw=await video.path()
}finally{await browser.close()}
fs.writeFileSync(path.join(dir,'raw','timeline.json'),JSON.stringify({raw,timeline},null,2))
for(const s of timeline){
 sh('ffmpeg',['-hide_banner','-loglevel','error','-y','-ss',String(s.from),'-i',raw,'-t',String(s.duration-0.6),'-vf','crop=1600:900:0:0,scale=1920:1080,fps=30','-an','-c:v','libx264','-threads','2','-preset','fast','-crf','18','-pix_fmt','yuv420p',path.join(dir,'clips',s.id+'.mp4')]);console.log('Captured',s.id,s.duration.toFixed(1)+'s')
}
fs.writeFileSync(path.join(dir,'walkthrough.json'),JSON.stringify({width:1920,height:1080,fps:30,hold_after:1,audio_delay:0.25,output:'output/final-walkthrough.mp4',scenes:timeline.map(s=>({id:s.id,video:'clips/'+s.id+'.mp4',audio:'voice/'+s.id+'.mp3'}))},null,2))
