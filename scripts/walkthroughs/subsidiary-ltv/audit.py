import base64, json, pathlib, subprocess, urllib.request

root=pathlib.Path(__file__).parent
media=root/'output/subsidiary-ltv.mp4'
key=None
for service in ['abc_anc-services','abc_ancapp','abc_anything-llm']:
    data=json.loads(subprocess.check_output(['docker','service','inspect',service]))[0]
    env=dict(v.split('=',1) for v in data['Spec']['TaskTemplate']['ContainerSpec'].get('Env',[]) if '=' in v)
    if env.get('GEMINI_API_KEY'):
        key=env['GEMINI_API_KEY'];break
assert key,'Media review key unavailable'
script=json.loads((root/'audio_request.json').read_text())
prompt='''Audit this actual exported practical narrated screen walkthrough. It uses cropped REAL CRM screenshots with teaching annotations, not a continuous screen recording. The user specifically named Diamond Baseball Holdings as the approved populated example. Only that Company header and the requested fields are intended; flag credentials, internal vendor names or unrelated client records. Listen to the complete soundtrack and inspect the whole video. Return JSON: verdict(pass/fix), full_transcript, audio_quality(including voice clarity/accent, missing or clipped words, levels), visual_quality(readability, correct fields in correct sequence, picture matches narration, no black or loading frames), issues(concrete timed issues only). The four fields are already correctly placed; do not require a layout edit demonstration. Do not criticize this practical lesson for lacking cinematic effects. Note that won and one are English homophones, so hearing the normal pronunciation of Won Deals is correct, not an error. Report any other real defects candidly. Expected narration: '''+' '.join(l['text'] for l in script['lines'])
body={'contents':[{'role':'user','parts':[{'text':prompt},{'inline_data':{'mime_type':'video/mp4','data':base64.b64encode(media.read_bytes()).decode()}}]}],'generationConfig':{'responseMimeType':'application/json','temperature':0.1}}
req=urllib.request.Request('https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',data=json.dumps(body).encode(),headers={'x-goog-api-key':key,'Content-Type':'application/json'})
result=json.load(urllib.request.urlopen(req,timeout=150))
reply=''.join(p.get('text','') for p in result.get('candidates',[{}])[0].get('content',{}).get('parts',[]))
parsed=json.loads(reply);(root/'review/semantic-audit.json').write_text(json.dumps(parsed,indent=2));print(json.dumps(parsed,indent=2))
