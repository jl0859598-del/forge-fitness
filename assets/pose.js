/* 炼 FORGE — 本地姿态估计与个人轨迹分析
 * MediaPipe Tasks Vision 1.1.1 (Apache-2.0)，模型与 WASM 均从本地加载。
 * 视频不会上传；分析结果只保存在当前页面内存中。
 */

import { FilesetResolver, PoseLandmarker } from './vendor/vision_bundle.mjs';

let landmarkerPromise = null;

async function createLandmarker() {
  const fileset = await FilesetResolver.forVisionTasks(new URL('./vendor/wasm', import.meta.url).href);
  const options = {
    baseOptions: {
      modelAssetPath: new URL('./vendor/pose_landmarker_lite.task', import.meta.url).href,
      delegate: 'GPU'
    },
    runningMode: 'IMAGE',
    numPoses: 1,
    minPoseDetectionConfidence: 0.5,
    minPosePresenceConfidence: 0.5,
    minTrackingConfidence: 0.5
  };
  try {
    return await PoseLandmarker.createFromOptions(fileset, options);
  } catch (error) {
    options.baseOptions.delegate = 'CPU';
    return PoseLandmarker.createFromOptions(fileset, options);
  }
}

export function warmup() {
  if (!landmarkerPromise) landmarkerPromise = createLandmarker();
  return landmarkerPromise;
}

const IDX = {
  lShoulder: 11, rShoulder: 12, lElbow: 13, rElbow: 14, lWrist: 15, rWrist: 16,
  lHip: 23, rHip: 24, lKnee: 25, rKnee: 26, lAnkle: 27, rAnkle: 28
};

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function angle(a, b, c) {
  if (!a || !b || !c) return null;
  const v1x = a.x - b.x;
  const v1y = a.y - b.y;
  const v2x = c.x - b.x;
  const v2y = c.y - b.y;
  const denom = Math.hypot(v1x, v1y) * Math.hypot(v2x, v2y);
  if (!denom) return null;
  return (Math.acos(clamp((v1x * v2x + v1y * v2y) / denom, -1, 1)) * 180) / Math.PI;
}

function midpoint(a, b) {
  return { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
}

function visibility(...points) {
  const vals = points.map((p) => (p && Number.isFinite(p.visibility) ? p.visibility : 0.5));
  return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : 0;
}

function smooth(values, window = 3) {
  const out = [];
  for (let i = 0; i < values.length; i += 1) {
    let total = 0;
    let count = 0;
    for (let j = Math.max(0, i - window); j <= Math.min(values.length - 1, i + window); j += 1) {
      if (Number.isFinite(values[j])) {
        total += values[j];
        count += 1;
      }
    }
    out.push(count ? total / count : null);
  }
  return out;
}

const SPECS = {
  squat: { joint: 'knee', low: 100, high: 150, romMin: 55, path: 'hip', axis: 'y', sideSensitive: true, label: '膝关节屈曲' },
  hinge: { joint: 'hip', low: 105, high: 150, romMin: 35, path: 'hip', axis: 'y', sideSensitive: true, label: '髋关节折叠' },
  push: { joint: 'elbow', low: 100, high: 155, romMin: 50, path: 'wrist', axis: 'y', sideSensitive: true, label: '肘关节屈伸' },
  pull: { joint: 'elbow', low: 80, high: 140, romMin: 40, path: 'wrist', axis: 'y', sideSensitive: true, label: '肘关节屈伸' },
  curl: { joint: 'elbow', low: 60, high: 145, romMin: 55, path: 'wrist', axis: 'arc', sideSensitive: true, label: '肘关节弯举' },
  tricep: { joint: 'elbow', low: 75, high: 145, romMin: 45, path: 'wrist', axis: 'y', sideSensitive: true, label: '肘关节伸展' },
  lateral: { joint: 'shoulder', low: 35, high: 78, romMin: 40, path: 'wrist', axis: 'arc', sideSensitive: true, label: '肩关节外展' },
  glute: { joint: 'hip', low: 95, high: 145, romMin: 35, path: 'hip', axis: 'y', sideSensitive: true, label: '伸髋幅度' },
  legext: { joint: 'knee', low: 80, high: 145, romMin: 45, path: 'ankle', axis: 'arc', sideSensitive: true, label: '膝关节伸展' },
  legcurl: { joint: 'knee', low: 45, high: 110, romMin: 40, path: 'ankle', axis: 'arc', sideSensitive: true, label: '膝关节屈曲' },
  core: { joint: 'hip', low: 70, high: 115, romMin: 25, path: 'shoulder', axis: 'arc', sideSensitive: false, label: '躯干屈曲' },
  cardio: { joint: 'knee', low: 95, high: 140, romMin: 25, path: 'ankle', axis: 'arc', sideSensitive: true, label: '下肢摆动' },
  mobility: { joint: 'shoulder', low: 65, high: 105, romMin: 25, path: 'wrist', axis: 'arc', sideSensitive: true, label: '关节活动范围' }
};

function specFor(ex) {
  const pat = ex.pat || '';
  if (['squat', 'single_leg'].includes(pat)) return { key: 'squat', ...SPECS.squat };
  if (pat === 'hinge') return { key: 'hinge', ...SPECS.hinge };
  if (['horizontal_push', 'incline_push', 'vertical_push', 'chest_iso'].includes(pat)) return { key: 'push', ...SPECS.push };
  if (['vertical_pull', 'horizontal_pull', 'lat_iso'].includes(pat)) return { key: 'pull', ...SPECS.pull };
  if (pat === 'bicep') return { key: 'curl', ...SPECS.curl };
  if (pat === 'tricep') return { key: 'tricep', ...SPECS.tricep };
  if (['lateral', 'front_delt', 'rear_delt'].includes(pat)) return { key: 'lateral', ...SPECS.lateral };
  if (pat === 'glute') return { key: 'glute', ...SPECS.glute };
  if (pat === 'leg_ext') return { key: 'legext', ...SPECS.legext };
  if (pat === 'leg_curl') return { key: 'legcurl', ...SPECS.legcurl };
  if (pat === 'core') return { key: 'core', ...SPECS.core };
  if (pat === 'cardio') return { key: 'cardio', ...SPECS.cardio };
  if (pat === 'mobility') return { key: 'mobility', ...SPECS.mobility };
  return { key: 'core', ...SPECS.core };
}

function metricValue(frame, spec) {
  const l = frame;
  if (spec.joint === 'knee') return {
    left: angle(l[IDX.lHip], l[IDX.lKnee], l[IDX.lAnkle]),
    right: angle(l[IDX.rHip], l[IDX.rKnee], l[IDX.rAnkle]),
    visL: visibility(l[IDX.lHip], l[IDX.lKnee], l[IDX.lAnkle]),
    visR: visibility(l[IDX.rHip], l[IDX.rKnee], l[IDX.rAnkle])
  };
  if (spec.joint === 'elbow') return {
    left: angle(l[IDX.lShoulder], l[IDX.lElbow], l[IDX.lWrist]),
    right: angle(l[IDX.rShoulder], l[IDX.rElbow], l[IDX.rWrist]),
    visL: visibility(l[IDX.lShoulder], l[IDX.lElbow], l[IDX.lWrist]),
    visR: visibility(l[IDX.rShoulder], l[IDX.rElbow], l[IDX.rWrist])
  };
  if (spec.joint === 'shoulder') return {
    left: angle(l[IDX.lHip], l[IDX.lShoulder], l[IDX.lElbow]),
    right: angle(l[IDX.rHip], l[IDX.rShoulder], l[IDX.rElbow]),
    visL: visibility(l[IDX.lHip], l[IDX.lShoulder], l[IDX.lElbow]),
    visR: visibility(l[IDX.rHip], l[IDX.rShoulder], l[IDX.rElbow])
  };
  return {
    left: angle(l[IDX.lShoulder], l[IDX.lHip], l[IDX.lKnee]),
    right: angle(l[IDX.rShoulder], l[IDX.rHip], l[IDX.rKnee]),
    visL: visibility(l[IDX.lShoulder], l[IDX.lHip], l[IDX.lKnee]),
    visR: visibility(l[IDX.rShoulder], l[IDX.rHip], l[IDX.rKnee])
  };
}

function chooseSide(values) {
  const left = values.map((v) => v.left).filter(Number.isFinite);
  const right = values.map((v) => v.right).filter(Number.isFinite);
  const visL = values.reduce((a, v) => a + (Number(v.visL) || 0), 0);
  const visR = values.reduce((a, v) => a + (Number(v.visR) || 0), 0);
  if (visR > visL * 1.15) return { side: 'right', values: right, visibility: visR / Math.max(1, values.length) };
  return { side: 'left', values: left, visibility: visL / Math.max(1, values.length) };
}

function countReps(series, spec) {
  const values = series.filter(Number.isFinite);
  if (values.length < 5) return 0;
  let count = 0;
  if (spec.key === 'lateral') {
    let high = false;
    for (const v of values) {
      if (v >= spec.high) high = true;
      if (high && v <= spec.low) {
        count += 1;
        high = false;
      }
    }
  } else {
    let low = false;
    for (const v of values) {
      if (v <= spec.low) low = true;
      if (low && v >= spec.high) {
        count += 1;
        low = false;
      }
    }
  }
  return count;
}

function pathPoints(frames, spec) {
  const points = [];
  for (const frame of frames) {
    const l = frame.landmarks;
    let p = null;
    if (spec.path === 'hip') {
      p = midpoint(l[IDX.lHip], l[IDX.rHip]);
    } else if (spec.path === 'wrist') {
      p = midpoint(l[IDX.lWrist], l[IDX.rWrist]);
    } else if (spec.path === 'ankle') {
      p = midpoint(l[IDX.lAnkle], l[IDX.rAnkle]);
    } else {
      p = midpoint(l[IDX.lShoulder], l[IDX.rShoulder]);
    }
    const shoulder = midpoint(l[IDX.lShoulder], l[IDX.rShoulder]);
    const hip = midpoint(l[IDX.lHip], l[IDX.rHip]);
    const scale = Math.max(0.08, distance(shoulder, hip));
    if (p && Number.isFinite(p.x) && Number.isFinite(p.y)) {
      points.push({ x: p.x / scale, y: p.y / scale, t: frame.t });
    }
  }
  if (points.length < 3) return { points: [], rangeX: 0, rangeY: 0 };
  const smoothCoord = (key) => points.map((p, i) => {
    let total = 0;
    let count = 0;
    for (let j = Math.max(0, i - 3); j <= Math.min(points.length - 1, i + 3); j += 1) {
      total += points[j][key];
      count += 1;
    }
    return total / count;
  });
  const xs = smoothCoord('x');
  const ys = smoothCoord('y');
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rangeX = maxX - minX;
  const rangeY = maxY - minY;
  const scale = Math.max(rangeX, rangeY, 0.25);
  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  return {
    rangeX,
    rangeY,
    points: points.map((p, i) => ({
      x: clamp(0.5 + (xs[i] - cx) / scale * 0.8, 0.05, 0.95),
      y: clamp(0.5 + (ys[i] - cy) / scale * 0.8, 0.05, 0.95),
      t: p.t
    }))
  };
}

function waitEvent(el, eventName) {
  return new Promise((resolve, reject) => {
    const onEvent = () => {
      cleanup();
      resolve();
    };
    const onError = () => {
      cleanup();
      reject(new Error(`视频事件失败：${eventName}`));
    };
    const cleanup = () => {
      el.removeEventListener(eventName, onEvent);
      el.removeEventListener('error', onError);
    };
    el.addEventListener(eventName, onEvent, { once: true });
    el.addEventListener('error', onError, { once: true });
  });
}

async function seekVideo(video, time) {
  if (Math.abs(video.currentTime - time) < 0.015) return;
  const ready = waitEvent(video, 'seeked');
  try {
    video.currentTime = time;
  } catch (e) {
    throw new Error('无法读取视频时间点，请换一个 MP4/MOV 视频');
  }
  await ready;
}

export async function analyzeVideo(video, ex, onProgress = () => {}) {
  if (!video || !Number.isFinite(video.duration) || video.duration <= 0) {
    throw new Error('视频尚未加载完成');
  }
  const landmarker = await warmup();
  const duration = video.duration;
  const maxFrames = duration > 30 ? 100 : duration > 15 ? 120 : 150;
  const step = Math.max(1 / 12, duration / maxFrames);
  const total = Math.max(1, Math.floor(duration / step));
  video.pause();
  const frames = [];
  const canvas = document.createElement('canvas');
  const scale = Math.min(1, 720 / Math.max(video.videoWidth || 720, video.videoHeight || 720));
  canvas.width = Math.max(1, Math.round((video.videoWidth || 720) * scale));
  canvas.height = Math.max(1, Math.round((video.videoHeight || 720) * scale));
  const ctx = canvas.getContext('2d');
  for (let i = 0; i < total; i += 1) {
    const t = Math.min(duration - 0.01, i * step);
    await seekVideo(video, t);
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const result = landmarker.detect(canvas);
    const l = result && result.landmarks && result.landmarks[0];
    if (l) frames.push({ t, landmarks: l });
    onProgress(Math.min(1, (i + 1) / total), t);
  }
  if (frames.length < 8) {
    throw new Error('检测到的有效姿态太少。请确保全身入镜、光线充足，并让手机保持固定。');
  }

  const spec = specFor(ex);
  const metrics = frames.map((frame) => metricValue(frame.landmarks, spec));
  const side = chooseSide(metrics);
  const series = smooth(side.values, 2).filter((v) => Number.isFinite(v));
  if (series.length < 5) {
    throw new Error('关键关节可见度不足，请拍摄侧面全身视频。');
  }
  const min = Math.min(...series);
  const max = Math.max(...series);
  const rom = max - min;
  const reps = countReps(series, spec);
  const durationSec = duration;
  const avgRepTime = reps ? durationSec / reps : durationSec;
  const symmetry = metrics.reduce((acc, v, i) => {
    if (!Number.isFinite(v.left) || !Number.isFinite(v.right)) return acc;
    return acc + Math.abs(v.left - v.right);
  }, 0) / Math.max(1, metrics.filter((v) => Number.isFinite(v.left) && Number.isFinite(v.right)).length);
  const qualityFrames = frames.map((frame) => {
    const l = frame.landmarks;
    return visibility(l[IDX.lShoulder], l[IDX.rShoulder], l[IDX.lHip], l[IDX.rHip]);
  });
  const quality = qualityFrames.reduce((a, b) => a + b, 0) / qualityFrames.length;
  const pathData = pathPoints(frames, spec);
  const path = pathData.points;
  const pathX = pathData.rangeX;
  const pathY = pathData.rangeY;
  const romRatio = clamp(rom / spec.romMin, 0, 1);
  const symScore = spec.sideSensitive ? clamp(1 - symmetry / 30, 0, 1) : 1;
  const tempoScore = clamp(1 - Math.abs(avgRepTime - 3.5) / 4.5, 0, 1);
  const qualityScore = clamp(quality, 0, 1);
  const score = Math.round(romRatio * 40 + symScore * 25 + tempoScore * 20 + qualityScore * 15);
  const advice = [];
  if (quality < 0.45) advice.push('检测质量偏低：请让全身入镜、避免逆光，并把手机固定在身体侧面。');
  if (romRatio < 0.75) advice.push(`活动范围偏小：${spec.label}约 ${Math.round(min)}°–${Math.round(max)}°，建议在无痛范围内逐步接近目标幅度。`);
  if (spec.sideSensitive && symmetry > 12) advice.push(`左右差异约 ${Math.round(symmetry)}°，注意重心和两侧发力是否对称。`);
  if (avgRepTime < 1.5) advice.push('动作节奏偏快：放慢离心阶段，给关节和目标肌肉更多控制时间。');
  if (avgRepTime > 8) advice.push('单次重复时间较长：如果目标是力量或增肌，可以在动作稳定后适当提高节奏。');
  if (reps === 0) advice.push('未检测到完整重复：请拍摄完整的一次起止动作，确保关键关节没有被遮挡。');
  if (spec.axis === 'y' && pathX > pathY * 1.25) advice.push('主要移动点横向偏移较多：注意把重量控制在身体中线附近，减少前后/左右晃动。');
  if (!advice.length) advice.push('主要关节活动范围、左右对称性和节奏都在参考范围内；继续保持动作控制。');
  advice.push('这是基于二维视频姿态估计的参考反馈，不是医学诊断；疼痛或关节不适时请停止并咨询专业人士。');

  return {
    spec: spec.key,
    label: spec.label,
    score,
    reps,
    duration: durationSec,
    frames: frames.length,
    quality: Math.round(quality * 100),
    min: Math.round(min),
    max: Math.round(max),
    rom: Math.round(rom),
    targetRom: spec.romMin,
    symmetry: spec.sideSensitive ? Math.round(symmetry) : 0,
    avgRepTime: Math.round(avgRepTime * 10) / 10,
    path,
    pathRange: { x: Math.round(pathX * 100), y: Math.round(pathY * 100) },
    advice
  };
}
