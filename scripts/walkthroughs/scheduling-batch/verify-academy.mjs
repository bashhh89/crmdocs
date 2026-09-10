import {createRequire} from 'node:module'
import fs from 'node:fs'
import assert from 'node:assert/strict'
const {chromium}=createRequire('/root/anc-kb/package.json')('playwright')
const url='https://docs.ancsports.net/docs/training/venue-services/whos-on#planning-requests-and-notifications'
const results=[]
const browser=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']})
try{
 for(const width of [1440,390]){
  const ctx=await browser.newContext({viewport:{width,height:width===390?844:1000}})
  const page=await ctx.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message))
  await page.goto('https://docs.ancsports.net/academy',{waitUntil:'networkidle'});
  const card=page.locator('[data-umami-event="academy-support-scheduling"]');await card.waitFor();assert.equal(await card.getAttribute('href'),new URL(url).pathname+new URL(url).hash);await card.click();await page.waitForURL(url);assert.equal(page.url(),url)
  const video=page.locator('video:has(source[src="/videos/training/scheduling-batch.mp4"])')
  await video.waitFor({timeout:30000});await video.scrollIntoViewIfNeeded()
  const played=await video.evaluate(async v=>{
   v.muted=false;v.volume=1
   await v.play();await new Promise(r=>setTimeout(r,2500))
   return {time:v.currentTime,paused:v.paused,muted:v.muted,duration:v.duration,width:v.videoWidth,height:v.videoHeight,audioBytes:v.webkitAudioDecodedByteCount}
  })
  assert.ok(played.time>1.5&&!played.paused&&!played.muted);assert.ok(played.audioBytes>0);assert.ok(played.duration>150&&played.duration<165);assert.equal(played.width,1920);assert.equal(played.height,1080)
  const track=await video.locator('track').getAttribute('src');assert.equal(track,'/videos/training/scheduling-batch.vtt')
  const captions=await page.request.get(new URL(track,url).href);assert.equal(captions.status(),200);assert.match(await captions.text(),/^WEBVTT/)
  await video.evaluate(async v=>{v.currentTime=30;await new Promise(r=>{v.addEventListener('seeked',r,{once:true});setTimeout(r,4000)});v.pause()})
  await page.screenshot({path:`/root/anc-walkthroughs/scheduling-batch/review/academy-${width}.png`})
  const ending=await video.evaluate(async v=>{v.currentTime=v.duration-1.5;await v.play();await new Promise(r=>setTimeout(r,2500));return {ended:v.ended,time:v.currentTime}})
  assert.ok(ending.ended)
  const poster=await video.getAttribute('poster');assert.equal((await page.request.get(new URL(poster,url).href)).status(),200)
  const analytics=await page.locator('script[src="https://abc-umami.izcgmb.easypanel.host/script.js"]').count();assert.equal(analytics,1)
  const overflow=await page.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);assert.ok(overflow<=0);assert.deepEqual(errors,[])
  results.push({viewportWidth:page.viewportSize().width,...played,captions:true,ended:true,overflow,pageErrors:errors.length,tracking:true})
  await ctx.close()
 }
}finally{await browser.close()}
fs.writeFileSync('/root/anc-walkthroughs/scheduling-batch/review/academy-verification.json',JSON.stringify({url,results},null,2))
console.log(JSON.stringify({url,results},null,2))
