
import re, os, json, math
base = r'C:/Users/harle/Downloads/mlrassets.com-master/production/mlr-opening/audit'

# Parse YAVG from existing yavg.txt
yavg_path = os.path.join(base, 'yavg.txt')
frames = []
with open(yavg_path, 'r', encoding='utf-8', errors='ignore') as f:
    lines = f.read().splitlines()
for i in range(0, len(lines), 2):
    header = lines[i]
    value = lines[i+1] if i+1 < len(lines) else ''
    fm = re.search(r'frame:(\d+)', header)
    vm = re.search(r'lavfi\.signalstats\.YAVG=([0-9.eE-]+)', value)
    if fm and vm:
        frames.append({
            'frame': int(fm.group(1)),
            'time': round(int(fm.group(1))/24.0, 3),
            'yavg': float(vm.group(1))
        })

# Ensure contiguous 0..239
if frames and frames[0]['frame'] != 0:
    frames = [{'frame': i, 'time': round(i/24.0,3), 'yavg': frames[0]['yavg']} for i in range(frames[0]['frame'])] + frames
if len(frames) < 240:
    last = frames[-1] if frames else {'yavg': 0}
    for i in range(len(frames), 240):
        frames.append({'frame': i, 'time': round(i/24.0,3), 'yavg': last['yavg']})
frames = frames[:240]

# Parse mean[Y,U,V] from scene-scores.log (showinfo output)
scene_path = os.path.join(base, 'scene-scores.log')
mean_by_frame = {}
with open(scene_path, 'r', encoding='utf-8', errors='ignore') as f:
    for line in f:
        nm = re.search(r'n:\s*(\d+).*mean:\[(\d+)\s+(\d+)\s+(\d+)\]', line)
        if nm:
            fn = int(nm.group(1))
            mean_by_frame[fn] = (int(nm.group(2)), int(nm.group(3)), int(nm.group(4)))

for f in frames:
    fn = f['frame']
    if fn in mean_by_frame:
        f['mean_y'], f['mean_u'], f['mean_v'] = mean_by_frame[fn]
    else:
        f['mean_y'] = f['mean_u'] = f['mean_v'] = 0

# Compute deltas
for i in range(1, 240):
    frames[i]['dy'] = frames[i]['yavg'] - frames[i-1]['yavg']
    frames[i]['du'] = frames[i]['mean_u'] - frames[i-1]['mean_u']
    frames[i]['dv'] = frames[i]['mean_v'] - frames[i-1]['mean_v']
    frames[i]['dcolor'] = math.sqrt(frames[i]['du']**2 + frames[i]['dv']**2)
    # Luma-based scene-change proxy: normalized absolute luma delta
    frames[i]['luma_scene'] = abs(frames[i]['dy']) / max(frames[i]['yavg'], 1.0)

# Identify problem frames
problems = []
for i in range(1, 240):
    f = frames[i]
    reasons = []
    if f['luma_scene'] > 0.20:
        reasons.append(f'luma-scene {f["luma_scene"]:.3f}')
    if abs(f['dy']) > 5:
        reasons.append(f'luma-jump {f["dy"]:+.1f}')
    if f['dcolor'] > 4:
        reasons.append(f'color-shift {f["dcolor"]:.1f}')
    if reasons:
        problems.append({
            'frame': f['frame'],
            'time': f['time'],
            'yavg': round(f['yavg'], 1),
            'dy': round(f['dy'], 1),
            'dcolor': round(f['dcolor'], 1),
            'luma_scene': round(f['luma_scene'], 3),
            'reasons': reasons
        })

# Summary stats
yavgs = [f['yavg'] for f in frames]
dys = [f.get('dy', 0) for f in frames]
dcolors = [f.get('dcolor', 0) for f in frames]
luma_scenes = [f.get('luma_scene', 0) for f in frames]

summary = {
    'frame_count': len(frames),
    'duration': 10.0,
    'fps': 24,
    'luma_min': round(min(yavgs), 1),
    'luma_max': round(max(yavgs), 1),
    'luma_mean': round(sum(yavgs)/len(yavgs), 1),
    'luma_std': round(math.sqrt(sum((x-sum(yavgs)/len(yavgs))**2 for x in yavgs)/len(yavgs)), 1),
    'max_dy': round(max(dys, key=abs), 1),
    'max_dcolor': round(max(dcolors), 1),
    'max_luma_scene': round(max(luma_scenes), 3),
    'problem_count': len(problems)
}

with open(os.path.join(base, 'audit-data.json'), 'w') as f:
    json.dump({'summary': summary, 'problems': problems, 'frames': frames}, f, indent=2)
print('JSON written with', len(problems), 'problems')
