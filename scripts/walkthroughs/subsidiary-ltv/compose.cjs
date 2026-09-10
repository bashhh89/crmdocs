const {chromium}=require('/tmp/node_modules/playwright');
const fs=require('node:fs');
const root=__dirname;
const scenes=[
 {image:'01-start.png',title:'Open Business',summary:'Company record → Fields → Business',text:'Expand Business in the Fields panel on the left.',active:-1},
 {image:'02-business.png',title:'Four fields, one place',summary:'Subsidiary lifetime value',text:'Read from top to bottom in this order.',active:4},
 {image:'03-types.png',title:'Read the field types',summary:'Two totals. One count. One timestamp.',text:'The labels stay in the same order on every Company.',active:4},
 {image:'04-refresh.png',title:'Check the last refresh',summary:'Before your account review',text:'The layout is shared across Company records.',active:3},
];
const labels=['Subsidiary LTV (Revenue)','Subsidiary LTV (Margin)','Subsidiary LTV (Won Deals)','Subsidiary LTV (Last Rollup)'];
const types=['Currency','Currency','Number','Timestamp'];
(async()=>{
 const browser=await chromium.launch({headless:true,args:['--no-sandbox']});const page=await browser.newPage({viewport:{width:1920,height:1080}});
 for(let i=0;i<scenes.length;i++){
  const s=scenes[i];const source='data:image/png;base64,'+fs.readFileSync(root+'/frames/'+s.image).toString('base64');
  await page.setContent(`<!doctype html><html><head><style>
  *{box-sizing:border-box}body{margin:0;background:#07182c;color:#f5f7fc;font-family:Arial,sans-serif}.top{position:absolute;left:100px;right:100px;top:58px;font-size:22px;letter-spacing:3px;color:#8cabcb;display:flex;justify-content:space-between}.title{position:absolute;left:100px;top:106px;font-size:60px;letter-spacing:-1.7px;font-weight:700}.shot{position:absolute;left:100px;top:222px;width:660px;border-radius:14px;overflow:hidden;border:1px solid #27425e;background:#fff;box-shadow:0 18px 50px #0005}.shot img{width:660px;display:block}.instruction{position:absolute;left:840px;right:92px;top:246px}.eyebrow{font-size:26px;color:#8dbbef;margin-bottom:34px}.row{display:flex;align-items:center;gap:19px;border-top:1px solid #28405a;padding:24px 0;opacity:.5}.row.active{opacity:1}.number{font-size:23px;color:#91bff5;width:28px}.name{font-size:31px;letter-spacing:-.4px}.type{font-size:21px;color:#a7bbd2;margin-top:8px}.text{font-size:29px;line-height:1.45;color:#bacbde;margin-top:30px;max-width:870px}.footer{position:absolute;left:100px;right:100px;bottom:43px;border-top:1px solid #2b3f56;padding-top:22px;color:#8cabcb;font-size:20px;display:flex;justify-content:space-between}
  </style></head><body><div class="top"><span>ANC ACADEMY / COMPANY RECORDS</span><span>0${i+1} / 04</span></div><div class="title">${s.title}</div><div class="shot"><img src="${source}"></div><div class="instruction"><div class="eyebrow">${s.summary}</div>${labels.map((l,j)=>`<div class="row ${s.active===4||s.active===j?'active':''}"><span class="number">0${j+1}</span><div><div class="name">${l}</div>${i>=2?`<div class="type">${types[j]}</div>`:''}</div></div>`).join('')}<div class="text">${s.text}</div></div><div class="footer"><span>Live Company page · Diamond Baseball Holdings</span><span>Business section · Recorded September 10, 2026</span></div></body></html>`);
  await page.screenshot({path:root+'/frames/scene-'+(i+1)+'.png'});
 }
 await browser.close();console.log('Four narrated scene frames composed from real captures.');
})().catch(e=>{console.error(e.message);process.exit(1)});
