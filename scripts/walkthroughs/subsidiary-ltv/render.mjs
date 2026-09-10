#!/usr/bin/env node

import fs from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const manifestPath = process.argv[2]
if (!manifestPath) {
  throw new Error('Usage: node render-walkthrough.mjs <walkthrough.json>')
}

function run(command, args, options = {}) {
  const result = spawnSync(command, args, { encoding: 'utf8', ...options })
  if (result.status !== 0) {
    throw new Error(`${command} failed\n${result.stderr || result.stdout}`)
  }
  return result.stdout
}

function probeDuration(file) {
  const output = run('ffprobe', [
    '-v', 'error',
    '-show_entries', 'format=duration',
    '-of', 'default=nw=1:nk=1',
    file,
  ]).trim()
  const duration = Number(output)
  if (!Number.isFinite(duration) || duration <= 0) {
    throw new Error(`Could not determine audio duration: ${file}`)
  }
  return duration
}

run('ffmpeg', ['-version'])
run('ffprobe', ['-version'])

const absoluteManifest = path.resolve(manifestPath)
const projectDir = path.dirname(absoluteManifest)
const manifest = JSON.parse(await fs.readFile(absoluteManifest, 'utf8'))
const width = Number(manifest.width || 1440)
const height = Number(manifest.height || 900)
const fps = Number(manifest.fps || 30)
const defaultHold = Number(manifest.hold_after ?? 0.8)
const audioDelay = Number(manifest.audio_delay ?? 0.35)
const output = path.resolve(projectDir, manifest.output || 'final-walkthrough.mp4')
const tempDir = path.resolve(projectDir, '.walkthrough-render')

if (!Array.isArray(manifest.scenes) || manifest.scenes.length === 0) {
  throw new Error('walkthrough.json must include a non-empty scenes array')
}
if (![width, height, fps].every((value) => Number.isFinite(value) && value > 0)) {
  throw new Error('width, height, and fps must be positive numbers')
}

await fs.rm(tempDir, { recursive: true, force: true })
await fs.mkdir(tempDir, { recursive: true })

const concatLines = []
const sceneResults = []

for (let index = 0; index < manifest.scenes.length; index += 1) {
  const scene = manifest.scenes[index]
  const id = String(scene.id || `s${index + 1}`)
  if (!/^[A-Za-z0-9_-]+$/.test(id)) {
    throw new Error(`Invalid scene id: ${id}`)
  }

  const hasImage = typeof scene.image === 'string' && scene.image.length > 0
  const hasVideo = typeof scene.video === 'string' && scene.video.length > 0
  if (hasImage === hasVideo) {
    throw new Error(`Scene ${id} must include exactly one of image or video`)
  }

  const visual = path.resolve(projectDir, hasImage ? scene.image : scene.video)
  const audio = path.resolve(projectDir, scene.audio || '')
  await fs.access(visual)
  await fs.access(audio)

  const voiceDuration = probeDuration(audio)
  const holdAfter = Number(scene.hold_after ?? defaultHold)
  const duration = voiceDuration + Math.max(holdAfter, audioDelay + 0.1)
  const fadeOut = Math.max(0, duration - 0.35)
  const videoFade = index === 0
    ? `fade=t=out:st=${fadeOut.toFixed(3)}:d=0.35`
    : `fade=t=in:st=0:d=0.35,fade=t=out:st=${fadeOut.toFixed(3)}:d=0.35`
  const segmentName = `${String(index + 1).padStart(2, '0')}-${id}.mp4`
  const segmentPath = path.resolve(tempDir, segmentName)
  const scaleCrop = `scale=${width}:${height}:force_original_aspect_ratio=increase,crop=${width}:${height}`
  const visualInput = hasImage
    ? ['-loop', '1', '-framerate', String(fps), '-i', visual]
    : ['-ss', String(Math.max(0, Number(scene.clip_start || 0))), '-i', visual]
  const motionFilter = scene.motion === false
    ? `${scaleCrop},fps=${fps}`
    : `${scaleCrop},zoompan=z='min(zoom+0.00012,1.025)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:s=${width}x${height}:fps=${fps}`
  const videoFilter = hasImage
    ? `${motionFilter},format=yuv420p`
    : `${scaleCrop},fps=${fps},tpad=stop_mode=clone:stop_duration=${duration.toFixed(3)},format=yuv420p`

  run('ffmpeg', [
    '-hide_banner', '-loglevel', 'error', '-y',
    ...visualInput,
    '-i', audio,
    '-vf', videoFilter,
    '-af', `loudnorm=I=-16:TP=-1.5:LRA=11,adelay=${Math.round(audioDelay * 1000)}:all=1,afade=t=in:st=${audioDelay}:d=0.2,apad`,
    '-t', duration.toFixed(3),
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '19',
    '-profile:v', 'main', '-level', '4.0', '-pix_fmt', 'yuv420p',
    '-c:a', 'aac', '-b:a', '160k', '-ar', '48000',
    '-movflags', '+faststart',
    segmentPath,
  ])

  concatLines.push(`file '${segmentName}'`)
  sceneResults.push({ id, visual, visual_type: hasImage ? 'image' : 'video', audio, duration_s: duration })
}

await fs.writeFile(path.resolve(tempDir, 'concat.txt'), `${concatLines.join('\n')}\n`)
run('ffmpeg', [
  '-hide_banner', '-loglevel', 'error', '-y',
  '-f', 'concat', '-safe', '0', '-i', 'concat.txt',
  '-c', 'copy', '-movflags', '+faststart',
  output,
], { cwd: tempDir })

if (!manifest.keep_segments) {
  await fs.rm(tempDir, { recursive: true, force: true })
}

console.log(JSON.stringify({ output, width, height, fps, scenes: sceneResults }, null, 2))
