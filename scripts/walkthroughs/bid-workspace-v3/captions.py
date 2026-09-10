import json, pathlib, re, subprocess, textwrap
root = pathlib.Path(__file__).parent
manifest = json.loads((root / 'walkthrough.json').read_text())
lines = {x['id']: x['text'] for x in json.loads((root / 'audio_request.json').read_text())['lines']}
cursor = 0
cues = []
def stamp(t, sep=','):
    ms = round(t * 1000)
    return f'{ms // 3600000:02}:{ms // 60000 % 60:02}:{ms // 1000 % 60:02}{sep}{ms % 1000:03}'
for scene in manifest['scenes']:
    duration = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', str(root / scene['audio'])]))
    chunks = []
    for sentence in re.split(r'(?<=[.!?])\s+', lines[scene['id']]):
        words = sentence.split()
        while len(words) > 15:
            cut = 12
            for k in range(8, 15):
                if words[k].lower() in ['and', 'then', 'when', 'or', 'so', 'including']:
                    cut = k
                    break
            chunks.append(' '.join(words[:cut])); words = words[cut:]
        if words: chunks.append(' '.join(words))
    total = sum(len(c.split()) for c in chunks)
    local = 0
    for chunk in chunks:
        length = duration * len(chunk.split()) / total
        start = cursor + manifest['audio_delay'] + local
        cues.append((start, start + length, '\n'.join(textwrap.wrap(chunk, width=52))))
        local += length
    cursor += duration + max(scene.get('hold_after', manifest['hold_after']), manifest['audio_delay'] + .1)
basename = root / manifest['output']
basename.with_suffix('.srt').write_text('\n\n'.join(f'{i+1}\n{stamp(a)} --> {stamp(b)}\n{t}' for i,(a,b,t) in enumerate(cues)) + '\n')
basename.with_suffix('.vtt').write_text('WEBVTT\n\n' + '\n\n'.join(f'{stamp(a,".")} --> {stamp(b,".")}\n{t}' for a,b,t in cues) + '\n')
print(f'{len(cues)} readable caption cues; {cursor:.2f}s timeline')
