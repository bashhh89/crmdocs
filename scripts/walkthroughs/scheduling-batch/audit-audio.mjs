import fs from 'node:fs'
import {execFileSync} from 'node:child_process'
const spec=JSON.parse(execFileSync('docker',['service','inspect','abc_anc-services'],{encoding:'utf8'}))[0]
const key=spec.Spec.TaskTemplate.ContainerSpec.Env.find(s=>s.startsWith('GEMINI_API_KEY='))?.slice(15)
if(!key)throw Error('No configured audio-review provider')
const file=process.argv[2]||'review/audio.mp3'
const scene=process.argv[3]
const audio=fs.readFileSync(file).toString('base64')
const lines=JSON.parse(fs.readFileSync('audio_request.json')).lines.filter(l=>!scene||l.id===scene)
const prompt=`Listen to the entire training narration. Return JSON: {transcript:string,line_check:[{id:string,spoken:boolean,issue:string|null}],audio_flags:string[],unintelligible:string[],pacing:string,intelligibility:number from 1 to 10,verdict:"pass"|"fail",notes:string}. Transcribe all words. Compare every intended sentence, flag missing/repeated/clipped phrases, distortion, dropouts, unintended gaps over three seconds, unclear acronyms or numbers. Do not penalize spelling of spoken acronyms. Expected script: ${lines.map(l=>l.id+': '+l.text).join('\n')}`
let result, modelUsed
for(const model of ['gemini-3.6-flash','gemini-2.5-flash']){
 const r=await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({contents:[{role:'user',parts:[{inlineData:{mimeType:'audio/mp3',data:audio}},{text:prompt}]}],generationConfig:{temperature:0,responseMimeType:'application/json'}})})
 if(!r.ok){console.log('Review provider',model,'HTTP',r.status);continue}
 const d=await r.json();const raw=d.candidates[0].content.parts.map(x=>x.text||'').join('');fs.writeFileSync(scene?'review/proof-audio-raw.txt':'review/audio-raw.txt',raw);result=JSON.parse(raw.slice(raw.indexOf('{'),raw.lastIndexOf('}')+1));modelUsed=model;break
}
if(!result)throw Error('Audio-review providers did not return a review')
fs.writeFileSync(scene?'review/proof-audio.json':'review/gemini-audit.json',JSON.stringify({model:modelUsed,...result},null,2))
console.log(JSON.stringify({model:modelUsed,verdict:result.verdict,intelligibility:result.intelligibility,pacing:result.pacing,audio_flags:result.audio_flags,line_check:result.line_check}))
if(result.verdict!=='pass')process.exitCode=1
