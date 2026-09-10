import fs from 'node:fs'
import {spawnSync} from 'node:child_process'
const dir=import.meta.dirname,file=dir+'/output/final-walkthrough.mp4'
const run=(cmd,args)=>{const r=spawnSync(cmd,args,{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr||r.stdout);return r}
const probe=JSON.parse(run('ffprobe',['-v','error','-show_streams','-show_format','-of','json',file]).stdout)
const decode=run('ffmpeg',['-hide_banner','-loglevel','warning','-i',file,'-f','null','-'])
fs.writeFileSync(dir+'/review/decode.log',decode.stderr)
run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',file,'-vn','-ar','24000','-ac','1','-b:a','96k',dir+'/review/audio.mp3'])
const volume=run('ffmpeg',['-hide_banner','-i',file,'-vn','-af','volumedetect','-f','null','-']).stderr
fs.writeFileSync(dir+'/review/volume.log',volume)
run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',file,'-vf',"fps=1,scale=320:180,drawtext=fontfile=/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf:text='%{pts\\:hms}':fontsize=16:fontcolor=white:box=1:boxcolor=black@0.8:x=5:y=5,tile=6x5",'-q:v','2',dir+'/review/dense-%02d.jpg'])
run('ffmpeg',['-hide_banner','-loglevel','error','-y','-i',file,'-frames:v','1',dir+'/review/poster.png'])
const srt=fs.readFileSync(dir+'/output/final-walkthrough.srt','utf8');fs.writeFileSync(dir+'/output/final-walkthrough.vtt','WEBVTT\n\n'+srt.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g,'$1.$2'))
fs.writeFileSync(dir+'/review/media-probe.json',JSON.stringify(probe,null,2));console.log(JSON.stringify({duration:probe.format.duration,streams:probe.streams.map(s=>({type:s.codec_type,codec:s.codec_name,width:s.width,height:s.height})),decodeWarnings:decode.stderr,mean:volume.match(/mean_volume: (.+)/)?.[1],peak:volume.match(/max_volume: (.+)/)?.[1]}))
