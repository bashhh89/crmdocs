from pathlib import Path
import json,subprocess,re
root=Path(__file__).parent
script=json.loads((root/'audio_request.json').read_text());cues=[];offset=0
for line in script['lines']:
    dur=float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',str(root/'voice'/(line['id']+'.mp3'))]))
    words=line['text'].split();parts=[]
    while words:
        take=min(12,len(words));part=words[:take];words=words[take:];parts.append(' '.join(part))
    total=sum(len(x.split()) for x in parts);start=offset+.25
    for part in parts:
        stop=start+dur*len(part.split())/total;cues.append((start,stop,part));start=stop
    offset+=dur+.65
def stamp(t):
    ms=round(t*1000)
    return f'{ms//3600000:02d}:{ms%3600000//60000:02d}:{ms%60000//1000:02d},{ms%1000:03d}'
srt='\n\n'.join(f'{i+1}\n{stamp(a)} --> {stamp(b)}\n{text}' for i,(a,b,text) in enumerate(cues))+'\n'
(root/'output/subsidiary-ltv.srt').write_text(srt)
(root/'output/subsidiary-ltv.vtt').write_text('WEBVTT\n\n'+re.sub(r'(\d{2}:\d{2}:\d{2}),(\d{3})',r'\1.\2',srt))
print('Readable caption cues:',len(cues))
