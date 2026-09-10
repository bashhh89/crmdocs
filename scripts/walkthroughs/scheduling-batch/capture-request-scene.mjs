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
 await visit('/tech-schedule/requests')
 await scene('s7',async()=>{await click(page.getByText('Submit a request',{exact:true}));await sleep(2500);await move(page.getByLabel('Request type'));await page.getByLabel('Request type').selectOption('swap');await sleep(1100);const mine=page.locator('main select').nth(1),other=page.locator('main select').nth(2);if(await mine.locator('option').count()>1)await mine.selectOption({index:1});if(await other.locator('option').count()>1)await other.selectOption({index:1});await move(page.getByText(/The other technician must accept first/))})
 if(errors.length)throw Error(errors.join('; '))
 const video=page.video();await ctx.close();raw=await video.path()
}finally{await browser.close()}
fs.writeFileSync(path.join(dir,'raw','timeline-s7.json'),JSON.stringify({raw,timeline},null,2))
for(const s of timeline){
 sh('ffmpeg',['-hide_banner','-loglevel','error','-y','-ss',String(s.from),'-i',raw,'-t',String(s.duration),'-vf','crop=1600:900:0:0,scale=1920:1080,fps=30','-an','-c:v','libx264','-threads','2','-preset','fast','-crf','18','-pix_fmt','yuv420p',path.join(dir,'clips',s.id+'.mp4')]);console.log('Captured',s.id,s.duration.toFixed(1)+'s')
}
