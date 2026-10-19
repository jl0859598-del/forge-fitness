(() => {
  'use strict';

  const EX = window.FORGE_EXERCISES || [];
  const FOODS = window.FORGE_FOODS || { proteins: [], carbs: [], fats: [], veg: [], quick: [] };
  const STUDIES = window.FORGE_STUDIES || [];
  const ATHLETES = window.FORGE_ATHLETES || [];
  const COACHES = window.FORGE_COACHES || [];
  const MEDIA = window.FORGE_EXERCISE_MEDIA || {};
  const BY_ID = new Map(EX.map((e) => [e.id, e]));
  const STORAGE_KEY = 'forge_state_v2';
  const VIEWS = ['home', 'library', 'plan', 'log', 'nutrition', 'research'];

  const GOALS = {
    hypertrophy: { label: '增肌', desc: '在可恢复的范围里，把训练量变成肌肉', hero: '把每一组，练成可复利的刺激' },
    cut: { label: '减脂', desc: '保住肌肉，用可持续的热量赤字稳步掉脂', hero: '保住肌肉，稳步掉脂' },
    strength: { label: '力量', desc: '低次数、高质量、充分休息，把力量练上去', hero: '更少的次数，更重的重量' },
    recomp: { label: '身体重组', desc: '体重不一定大起大落，但力量和线条会变', hero: '体重不变，身体在变' },
    health: { label: '健康体态', desc: '规律训练、足够蛋白和稳定作息优先', hero: '让训练成为长期习惯' }
  };

  const EXPERIENCE = {
    beginner: { label: '新手', desc: '训练 0–12 个月' },
    intermediate: { label: '进阶', desc: '稳定训练 1–3 年' },
    advanced: { label: '高阶', desc: '系统训练 3 年以上' }
  };

  const EQUIPMENT = {
    gym: { label: '商业健身房', desc: '杠铃、哑铃、器械、绳索都有' },
    home: { label: '家庭哑铃', desc: '哑铃、可调凳、弹力带' },
    body: { label: '徒手 / 弹力带', desc: '少量器械或完全自重' }
  };

  const ACTIVITY = {
    sedentary: { label: '久坐少动', factor: 1.2 },
    light: { label: '轻度活动', factor: 1.375 },
    moderate: { label: '中度活动', factor: 1.55 },
    high: { label: '高活动量', factor: 1.725 },
    veryHigh: { label: '极高活动量', factor: 1.9 }
  };

  const DIETS = {
    omnivore: { label: '普通饮食', desc: '肉、蛋、奶、豆制品都可以' },
    vegetarian: { label: '蛋奶素', desc: '蛋、奶、豆制品为主' },
    lactoseFree: { label: '无乳糖 / 少奶', desc: '避开牛奶、酸奶和乳清' }
  };

  const LIMITS = ['肩', '腰', '膝', '腕'];
  const FOCUS_GROUPS = ['胸', '背', '肩', '手臂', '腿', '臀', '核心'];

  const GROUP_LABEL = {
    胸: '胸', 背: '背', 肩: '肩', 手臂: '手臂', 腿: '腿', 臀: '臀', 核心: '核心', 有氧: '有氧', 灵活性: '灵活性'
  };

  const VOLUME_TARGET = {
    胸: [10, 20], 背: [10, 20], 肩: [8, 20], 肱二头: [6, 15], 肱三头: [6, 15],
    腿: [10, 20], 臀: [8, 16], 核心: [6, 15]
  };

  const ICONS = {
    home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.5 12 3l9 7.5"/><path d="M5.5 9.5V21h13V9.5"/><path d="M9.5 21v-6h5v6"/></svg>',
    dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6.5 7.5v9M3.5 9.5v5M17.5 7.5v9M20.5 9.5v5M6.5 12h11"/></svg>',
    calendar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>',
    chart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/></svg>',
    apple: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 8c-1.5-1.2-3.2-1.8-4.7-1.2C4.7 7.8 3.5 11 4.4 14.3 5.4 18 8.4 21 12 21s6.6-3 7.6-6.7c.9-3.3-.3-6.5-2.9-7.5-1.5-.6-3.2 0-4.7 1.2Z"/><path d="M12 8c.1-2.5 1.4-4.3 3.8-5"/><path d="M12 8c-.2-1.6-1-2.8-2.4-3.6"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h3l1.5-2h7L17 7h3a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2Z"/><circle cx="12" cy="13" r="4"/></svg>',
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    minus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M5 12h14"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13l10-6.5-10-6.5Z"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>',
    flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22c4 0 7-2.8 7-6.6 0-3-1.7-5.2-4.2-7.5C13.3 6.5 12.3 4.6 12 2c-1.2 2.4-3.3 3.9-4.7 6.1C5.5 10.5 5 12.4 5 14.5 5 18.9 8 22 12 22Z"/><path d="M9.5 17.5c0-1.6 1-2.7 2.3-3.8.9-.8 1.3-1.5 1.4-2.5 1.2 1.4 2.3 2.7 2.3 4.4 0 2-1.3 3.4-3 3.4s-3-1.5-3-1.5Z"/></svg>',
    scale: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="4" width="18" height="17" rx="4"/><path d="M8 9.5c.8-1 1.6-1.5 2.6-1.5h2.8c1 0 1.8.5 2.6 1.5"/><path d="M12 11v4"/><circle cx="12" cy="16" r="1"/></svg>',
    target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>',
    bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="m13 2-8 12h6l-1 8 9-13h-6V2Z"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5h.01"/></svg>',
    book: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M4 5.5V21.5M8 7h8M8 11h7"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c.8-4 3.5-6 8-6s7.2 2 8 6"/></svg>',
    download: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M4 19h16"/></svg>',
    upload: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 16V4M7 9l5-5 5 5"/><path d="M4 20h16"/></svg>',
    trash: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6"/></svg>',
    refresh: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 11a8 8 0 1 0-2.3 6.3"/><path d="M20 4v7h-7"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 8h13l-3-3M20 16H7l3 3"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/></svg>',
    external: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></svg>',
    alert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2.8 20h18.4L12 3Z"/><path d="M12 9v5M12 17.5h.01"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/><path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z"/></svg>',
    arrowUpRight: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    more: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="5" cy="12" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="19" cy="12" r="1.6"/></svg>'
  };

  const NAV = [
    { id: 'home', label: '首页', icon: 'home' },
    { id: 'library', label: '动作', icon: 'dumbbell' },
    { id: 'plan', label: '计划', icon: 'calendar' },
    { id: 'log', label: '记录', icon: 'chart' },
    { id: 'nutrition', label: '营养', icon: 'apple' }
  ];

  const DEFAULT_PROFILE = {
    name: '',
    sex: 'male',
    age: 28,
    height: 175,
    weight: 72,
    bodyFat: null,
    waist: null,
    experience: 'intermediate',
    goal: 'hypertrophy',
    days: 4,
    minutes: 60,
    equipment: 'gym',
    activity: 'moderate',
    limitations: [],
    focus: ['胸', '背', '腿'],
    diet: 'omnivore',
    targetWeight: 75,
    weeklyRate: 0.5
  };

  function defaultState() {
    return {
      version: 2,
      profile: { ...DEFAULT_PROFILE },
      plan: null,
      logs: [],
      sessions: [],
      analyses: [],
      intake: {},
      onboarded: false,
      createdAt: Date.now()
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const base = defaultState();
      return {
        ...base,
        ...parsed,
        profile: { ...base.profile, ...(parsed.profile || {}) },
        logs: Array.isArray(parsed.logs) ? parsed.logs : [],
        sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
        analyses: Array.isArray(parsed.analyses) ? parsed.analyses : [],
        intake: parsed.intake && typeof parsed.intake === 'object' ? parsed.intake : {}
      };
    } catch (e) {
      return defaultState();
    }
  }

  let S = loadState();
  let memoryOnly = false;

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(S));
    } catch (e) {
      memoryOnly = true;
    }
  }

  function routeFromHash() {
    const h = (location.hash || '').replace(/^#\/?/, '');
    return VIEWS.includes(h) ? h : 'home';
  }

  const UI = {
    view: routeFromHash(),
    lib: { q: '', group: '全部', equip: '全部', sort: 'sfr' },
    planDay: 0,
    chartRange: 30,
    studyTag: '全部',
    sheet: null,
    session: null,
    demo: null,
    analysis: {
      exId: null,
      videoUrl: '',
      fileName: '',
      analyzing: false,
      progress: 0,
      result: null,
      error: '',
      saved: false
    },
    photo: {
      dataUrl: '',
      note: '',
      fileName: '',
      analyzing: false,
      result: null,
      baseItems: null,
      error: '',
      health: 'unknown',
      model: '',
      mock: false
    },
    onboardStep: 0,
    draft: null,
    profileDraft: null
  };

  const app = document.getElementById('app');
  const sheetRoot = document.getElementById('sheet-root');
  const onboardRoot = document.getElementById('onboarding-root');
  const sessionRoot = document.getElementById('session-root');
  const toastEl = document.getElementById('toast');
  let toastTimer = null;
  let sessionTicker = null;

  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));
  const round = (n, step = 1) => Math.round(n / step) * step;
  const sum = (arr) => arr.reduce((a, b) => a + (Number(b) || 0), 0);
  const avg = (arr) => (arr.length ? sum(arr) / arr.length : 0);

  function esc(value) {
    return String(value == null ? '' : value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function pad(n) {
    return String(n).padStart(2, '0');
  }

  function isoDate(d = new Date()) {
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }

  function parseDate(iso) {
    const parts = String(iso).split('-').map(Number);
    return new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
  }

  function daysAgoISO(days) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() - days);
    return isoDate(d);
  }

  function fmtShortDate(iso) {
    const d = parseDate(iso);
    return `${d.getMonth() + 1}月${d.getDate()}日`;
  }

  function fmtWeekday(iso) {
    const d = parseDate(iso);
    return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'][d.getDay()];
  }

  function fmtRelative(iso) {
    const today = isoDate();
    if (iso === today) return '今天';
    if (iso === daysAgoISO(1)) return '昨天';
    if (iso === daysAgoISO(2)) return '前天';
    return `${fmtShortDate(iso)} ${fmtWeekday(iso)}`;
  }

  function logDateLabel(iso) {
    const rel = fmtRelative(iso);
    if (iso === isoDate() || iso === daysAgoISO(1) || iso === daysAgoISO(2)) {
      return `${rel} · ${fmtWeekday(iso)}`;
    }
    return rel;
  }

  function fmtDuration(minutes) {
    const m = Math.max(0, Math.round(Number(minutes) || 0));
    return m >= 60 ? `${Math.floor(m / 60)} 小时 ${m % 60 ? `${m % 60} 分` : ''}`.trim() : `${m} 分钟`;
  }

  function toast(message, tone = '') {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.className = `toast show ${tone}`.trim();
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.className = 'toast';
    }, 2400);
  }

  function sortedLogs() {
    return [...S.logs].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  }

  function latestLog() {
    const logs = sortedLogs();
    return logs.length ? logs[logs.length - 1] : null;
  }

  function currentWeight() {
    const l = latestLog();
    return l ? Number(l.weight) : Number(S.profile.weight) || 0;
  }

  function bmiValue(weight = currentWeight(), height = S.profile.height) {
    const h = Number(height) / 100;
    return h > 0 ? weight / (h * h) : 0;
  }

  function bmr(p) {
    const base = 10 * Number(p.weight) + 6.25 * Number(p.height) - 5 * Number(p.age);
    return base + (p.sex === 'male' ? 5 : -161);
  }

  function tdee(p) {
    return bmr(p) * (ACTIVITY[p.activity] ? ACTIVITY[p.activity].factor : 1.55);
  }

  function proteinBodyWeight(p) {
    const b = bmiValue(Number(p.weight), Number(p.height));
    if (b > 30) {
      const h = Number(p.height) / 100;
      return 27.5 * h * h;
    }
    return Number(p.weight);
  }

  function nutritionTargets(p = S.profile) {
    const b = bmr(p);
    const maintenance = tdee(p);
    const rate = clamp(Number(p.weeklyRate) || 0.5, 0.2, 1);
    let kcal = maintenance;

    if (p.goal === 'cut') {
      const deficit = (rate / 100) * Number(p.weight) * 7700 / 7;
      kcal = Math.max(maintenance * 0.75, maintenance - deficit);
    } else if (p.goal === 'gain') {
      const surplus = (rate / 100) * Number(p.weight) * 7700 / 7;
      kcal = Math.min(maintenance * 1.15, maintenance + surplus);
    } else if (p.goal === 'recomp') {
      kcal = maintenance * 0.95;
    } else if (p.goal === 'strength') {
      kcal = maintenance * 1.05;
    }

    kcal = Math.max(p.sex === 'male' ? 1500 : 1200, round(kcal, 10));
    const refWeight = proteinBodyWeight(p);
    let protein;
    if (p.goal === 'cut') protein = 2.2 * refWeight;
    else if (p.goal === 'hypertrophy') protein = 1.8 * refWeight;
    else if (p.goal === 'recomp') protein = 2.0 * refWeight;
    else if (p.goal === 'strength') protein = 1.8 * refWeight;
    else protein = 1.6 * refWeight;

    protein = Math.round(clamp(protein, 1.2 * refWeight, 2.4 * refWeight));
    let fat = Math.max(0.8 * Number(p.weight), (kcal * 0.24) / 9);
    let carbs = (kcal - protein * 4 - fat * 9) / 4;

    if (carbs < 1.5 * Number(p.weight)) {
      fat = Math.max(0.6 * Number(p.weight), (kcal - protein * 4 - 1.5 * Number(p.weight) * 4) / 9);
      carbs = (kcal - protein * 4 - fat * 9) / 4;
    }
    carbs = Math.max(0, Math.round(carbs));
    fat = Math.round(Math.max(0.5 * Number(p.weight), fat));

    const fiber = Math.round((14 * kcal) / 1000);
    const water = Math.round((Number(p.weight) * 0.035 + (Number(p.minutes) / 60) * 0.6) * 10) / 10;

    return {
      bmr: Math.round(b),
      maintenance: Math.round(maintenance),
      kcal,
      protein,
      carbs,
      fat,
      fiber,
      water,
      refWeight: Math.round(refWeight * 10) / 10
    };
  }

  function goalDeltaLabel(goal) {
    if (goal === 'cut') return '热量赤字';
    if (goal === 'gain') return '热量盈余';
    if (goal === 'recomp') return '接近维持';
    if (goal === 'strength') return '略高于维持';
    return '维持热量';
  }

  function linreg(points) {
    const n = points.length;
    if (n < 2) return { slope: 0, intercept: points[0] ? points[0].y : 0 };
    const sx = sum(points.map((p) => p.x));
    const sy = sum(points.map((p) => p.y));
    const sxx = sum(points.map((p) => p.x * p.x));
    const sxy = sum(points.map((p) => p.x * p.y));
    const denom = n * sxx - sx * sx;
    if (!denom) return { slope: 0, intercept: sy / n };
    const slope = (n * sxy - sx * sy) / denom;
    return { slope, intercept: (sy - slope * sx) / n };
  }

  function weekStartISO() {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    const mondayOffset = (d.getDay() + 6) % 7;
    d.setDate(d.getDate() - mondayOffset);
    return isoDate(d);
  }

  function weeklySessions() {
    const start = weekStartISO();
    return S.sessions.filter((s) => s.date >= start);
  }

  function lastSession() {
    return [...S.sessions].sort((a, b) => String(b.date).localeCompare(String(a.date)))[0] || null;
  }

  function volumeKey(ex, slot) {
    if (!ex) return '';
    if (ex.g === '手臂') return (slot && slot.pat === 'bicep') || ex.p.includes('二头') ? '肱二头' : '肱三头';
    if (ex.g === '腿') return '腿';
    if (ex.g === '臀') return '臀';
    return ex.g;
  }

  function planVolume(plan) {
    const map = {};
    if (!plan) return map;
    plan.days.forEach((day) => {
      day.slots.forEach((slot) => {
        const ex = BY_ID.get(slot.exId);
        if (!ex) return;
        const key = volumeKey(ex, slot);
        map[key] = (map[key] || 0) + Number(slot.sets || 0);
      });
    });
    return map;
  }

  function planAvgSfr(plan) {
    if (!plan) return 0;
    let weighted = 0;
    let sets = 0;
    plan.days.forEach((day) => {
      day.slots.forEach((slot) => {
        const ex = BY_ID.get(slot.exId);
        if (!ex) return;
        weighted += ex.sfr * Number(slot.sets || 0);
        sets += Number(slot.sets || 0);
      });
    });
    return sets ? Math.round((weighted / sets) * 10) / 10 : 0;
  }

  function planTotalSets(plan) {
    if (!plan) return 0;
    return plan.days.reduce((total, day) => total + day.slots.reduce((t, slot) => t + Number(slot.sets || 0), 0), 0);
  }

  function planTotalMinutes(plan) {
    if (!plan) return 0;
    return plan.days.reduce((total, day) => total + dayMinutes(day), 0);
  }

  function dayMinutes(day) {
    if (!day) return 0;
    const work = day.slots.reduce((total, slot) => {
      const sets = Number(slot.sets || 0);
      return total + sets * (42 + Number(slot.rest || 90));
    }, 0);
    return Math.round(8 + work / 60);
  }

  function equipmentAvailable(eq, p) {
    if (p.equipment === 'gym') return true;
    if (p.equipment === 'home') return ['哑铃', '自重', '弹力带'].includes(eq);
    if (p.equipment === 'body') return ['自重', '弹力带'].includes(eq);
    return true;
  }

  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      a += 0x6D2B79F5;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function pickExercise(slot, p, used, rng) {
    const available = EX.filter((e) => equipmentAvailable(e.eq, p) && !e.avoid.some((a) => p.limitations.includes(a)));
    let pool = available.filter((e) => e.g === slot.g);
    if (!pool.length) pool = available.filter((e) => e.pat === slot.pat);
    if (!pool.length) pool = available;

    const patPool = pool.filter((e) => e.pat === slot.pat);
    if (patPool.length) pool = patPool;

    if (p.experience === 'beginner') {
      const safer = pool.filter((e) => e.lv <= 2);
      if (safer.length) pool = safer;
    }

    if (slot.role === 'primary') {
      const compounds = pool.filter((e) => e.t === '复合' || e.t === '负重行走');
      if (compounds.length) pool = compounds;
    } else if (slot.role === 'iso') {
      const isolations = pool.filter((e) => e.t !== '复合');
      if (isolations.length) pool = isolations;
    }

    const scored = pool.map((e) => {
      let score = e.sfr * 2.1;
      if (e.t === '复合') score += 4;
      if (p.focus.includes(slot.g)) score += 3;
      if (p.experience === 'beginner') score += e.lv === 1 ? 3 : e.lv === 2 ? 0 : -3;
      if (p.experience === 'advanced') score += e.lv >= 2 ? 1.5 : 0;
      if (used[e.id]) score -= used[e.id] * 12;
      score += rng() * 1.6;
      return { e, score };
    });
    scored.sort((a, b) => b.score - a.score);
    return scored.length ? scored[0].e : null;
  }

  const SPLITS = {
    2: [
      {
        title: '全身 A', focus: ['深蹲', '水平推', '垂直拉'],
        slots: [
          { pat: 'squat', g: '腿', role: 'primary', label: '深蹲类' },
          { pat: 'horizontal_push', g: '胸', role: 'primary', label: '水平推' },
          { pat: 'vertical_pull', g: '背', role: 'primary', label: '垂直拉' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' },
          { pat: 'lateral', g: '肩', role: 'iso', label: '中束' },
          { pat: 'tricep', g: '手臂', role: 'iso', label: '三头' }
        ]
      },
      {
        title: '全身 B', focus: ['髋铰链', '垂直推', '水平拉'],
        slots: [
          { pat: 'hinge', g: '腿', role: 'primary', label: '髋铰链' },
          { pat: 'vertical_push', g: '肩', role: 'primary', label: '垂直推' },
          { pat: 'horizontal_pull', g: '背', role: 'primary', label: '水平拉' },
          { pat: 'rear_delt', g: '肩', role: 'iso', label: '后束' },
          { pat: 'bicep', g: '手臂', role: 'iso', label: '二头' },
          { pat: 'glute', g: '臀', role: 'iso', label: '臀部' }
        ]
      }
    ],
    3: [
      {
        title: '全身 A', focus: ['深蹲', '水平推', '垂直拉'],
        slots: [
          { pat: 'squat', g: '腿', role: 'primary', label: '深蹲类' },
          { pat: 'horizontal_push', g: '胸', role: 'primary', label: '水平推' },
          { pat: 'vertical_pull', g: '背', role: 'primary', label: '垂直拉' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' },
          { pat: 'lateral', g: '肩', role: 'iso', label: '中束' },
          { pat: 'tricep', g: '手臂', role: 'iso', label: '三头' }
        ]
      },
      {
        title: '全身 B', focus: ['髋铰链', '垂直推', '水平拉'],
        slots: [
          { pat: 'hinge', g: '腿', role: 'primary', label: '髋铰链' },
          { pat: 'vertical_push', g: '肩', role: 'primary', label: '垂直推' },
          { pat: 'horizontal_pull', g: '背', role: 'primary', label: '水平拉' },
          { pat: 'bicep', g: '手臂', role: 'iso', label: '二头' },
          { pat: 'rear_delt', g: '肩', role: 'iso', label: '后束' },
          { pat: 'calf', g: '腿', role: 'iso', label: '小腿' }
        ]
      },
      {
        title: '全身 C', focus: ['单腿', '上斜推', '垂直拉'],
        slots: [
          { pat: 'single_leg', g: '腿', role: 'primary', label: '单腿' },
          { pat: 'incline_push', g: '胸', role: 'primary', label: '上斜推' },
          { pat: 'vertical_pull', g: '背', role: 'secondary', label: '垂直拉' },
          { pat: 'glute', g: '臀', role: 'iso', label: '臀部' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' },
          { pat: 'chest_iso', g: '胸', role: 'iso', label: '胸部孤立' }
        ]
      }
    ],
    4: [
      {
        title: '上肢 A', focus: ['水平推', '垂直拉', '上斜推'],
        slots: [
          { pat: 'horizontal_push', g: '胸', role: 'primary', label: '水平推' },
          { pat: 'vertical_pull', g: '背', role: 'primary', label: '垂直拉' },
          { pat: 'incline_push', g: '胸', role: 'secondary', label: '上斜推' },
          { pat: 'horizontal_pull', g: '背', role: 'secondary', label: '水平拉' },
          { pat: 'lateral', g: '肩', role: 'iso', label: '中束' },
          { pat: 'tricep', g: '手臂', role: 'iso', label: '三头' },
          { pat: 'bicep', g: '手臂', role: 'iso', label: '二头' }
        ]
      },
      {
        title: '下肢 A', focus: ['深蹲', '髋铰链', '单腿'],
        slots: [
          { pat: 'squat', g: '腿', role: 'primary', label: '深蹲类' },
          { pat: 'hinge', g: '腿', role: 'primary', label: '髋铰链' },
          { pat: 'single_leg', g: '腿', role: 'secondary', label: '单腿' },
          { pat: 'calf', g: '腿', role: 'iso', label: '小腿' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      },
      {
        title: '上肢 B', focus: ['垂直推', '水平拉', '手臂'],
        slots: [
          { pat: 'vertical_push', g: '肩', role: 'primary', label: '垂直推' },
          { pat: 'horizontal_pull', g: '背', role: 'primary', label: '水平拉' },
          { pat: 'vertical_pull', g: '背', role: 'secondary', label: '垂直拉' },
          { pat: 'chest_iso', g: '胸', role: 'iso', label: '胸部孤立' },
          { pat: 'bicep', g: '手臂', role: 'iso', label: '二头' },
          { pat: 'rear_delt', g: '肩', role: 'iso', label: '后束' },
          { pat: 'tricep', g: '手臂', role: 'iso', label: '三头' }
        ]
      },
      {
        title: '下肢 B', focus: ['腿举', '臀部', '腿弯举'],
        slots: [
          { pat: 'squat', g: '腿', role: 'secondary', label: '深蹲类' },
          { pat: 'glute', g: '臀', role: 'primary', label: '臀部' },
          { pat: 'leg_curl', g: '腿', role: 'iso', label: '腿弯举' },
          { pat: 'calf', g: '腿', role: 'iso', label: '小腿' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      }
    ],
    5: [
      {
        title: '推 · 上肢', focus: ['胸', '肩', '三头'],
        slots: [
          { pat: 'horizontal_push', g: '胸', role: 'primary', label: '水平推' },
          { pat: 'incline_push', g: '胸', role: 'secondary', label: '上斜推' },
          { pat: 'vertical_push', g: '肩', role: 'secondary', label: '垂直推' },
          { pat: 'lateral', g: '肩', role: 'iso', label: '中束' },
          { pat: 'tricep', g: '手臂', role: 'iso', label: '三头' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      },
      {
        title: '拉 · 上肢', focus: ['背', '后束', '二头'],
        slots: [
          { pat: 'vertical_pull', g: '背', role: 'primary', label: '垂直拉' },
          { pat: 'horizontal_pull', g: '背', role: 'primary', label: '水平拉' },
          { pat: 'rear_delt', g: '肩', role: 'iso', label: '后束' },
          { pat: 'bicep', g: '手臂', role: 'iso', label: '二头' },
          { pat: 'shrug', g: '背', role: 'iso', label: '斜方肌' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      },
      {
        title: '腿 · 下肢', focus: ['股四头', '后链', '小腿'],
        slots: [
          { pat: 'squat', g: '腿', role: 'primary', label: '深蹲类' },
          { pat: 'hinge', g: '腿', role: 'primary', label: '髋铰链' },
          { pat: 'squat', g: '腿', role: 'secondary', label: '腿举类' },
          { pat: 'leg_curl', g: '腿', role: 'iso', label: '腿弯举' },
          { pat: 'calf', g: '腿', role: 'iso', label: '小腿' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      },
      {
        title: '上肢 · 综合', focus: ['上斜推', '水平拉', '肩'],
        slots: [
          { pat: 'incline_push', g: '胸', role: 'primary', label: '上斜推' },
          { pat: 'horizontal_pull', g: '背', role: 'primary', label: '水平拉' },
          { pat: 'vertical_pull', g: '背', role: 'secondary', label: '垂直拉' },
          { pat: 'lateral', g: '肩', role: 'iso', label: '中束' },
          { pat: 'bicep', g: '手臂', role: 'iso', label: '二头' },
          { pat: 'tricep', g: '手臂', role: 'iso', label: '三头' }
        ]
      },
      {
        title: '下肢 · 综合', focus: ['单腿', '臀部', '腿屈伸'],
        slots: [
          { pat: 'hinge', g: '腿', role: 'primary', label: '髋铰链' },
          { pat: 'single_leg', g: '腿', role: 'secondary', label: '单腿' },
          { pat: 'glute', g: '臀', role: 'secondary', label: '臀部' },
          { pat: 'leg_ext', g: '腿', role: 'iso', label: '腿屈伸' },
          { pat: 'leg_curl', g: '腿', role: 'iso', label: '腿弯举' },
          { pat: 'calf', g: '腿', role: 'iso', label: '小腿' }
        ]
      }
    ],
    6: [
      {
        title: '推 A', focus: ['胸', '肩', '三头'],
        slots: [
          { pat: 'horizontal_push', g: '胸', role: 'primary', label: '水平推' },
          { pat: 'incline_push', g: '胸', role: 'secondary', label: '上斜推' },
          { pat: 'vertical_push', g: '肩', role: 'secondary', label: '垂直推' },
          { pat: 'lateral', g: '肩', role: 'iso', label: '中束' },
          { pat: 'tricep', g: '手臂', role: 'iso', label: '三头' }
        ]
      },
      {
        title: '拉 A', focus: ['背', '后束', '二头'],
        slots: [
          { pat: 'vertical_pull', g: '背', role: 'primary', label: '垂直拉' },
          { pat: 'horizontal_pull', g: '背', role: 'primary', label: '水平拉' },
          { pat: 'rear_delt', g: '肩', role: 'iso', label: '后束' },
          { pat: 'bicep', g: '手臂', role: 'iso', label: '二头' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      },
      {
        title: '腿 A', focus: ['深蹲', '后链', '小腿'],
        slots: [
          { pat: 'squat', g: '腿', role: 'primary', label: '深蹲类' },
          { pat: 'hinge', g: '腿', role: 'primary', label: '髋铰链' },
          { pat: 'leg_curl', g: '腿', role: 'iso', label: '腿弯举' },
          { pat: 'calf', g: '腿', role: 'iso', label: '小腿' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      },
      {
        title: '推 B', focus: ['上斜', '胸部孤立', '肩'],
        slots: [
          { pat: 'incline_push', g: '胸', role: 'primary', label: '上斜推' },
          { pat: 'chest_iso', g: '胸', role: 'iso', label: '胸部孤立' },
          { pat: 'lateral', g: '肩', role: 'iso', label: '中束' },
          { pat: 'tricep', g: '手臂', role: 'iso', label: '三头' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      },
      {
        title: '拉 B', focus: ['水平拉', '垂直拉', '后束'],
        slots: [
          { pat: 'horizontal_pull', g: '背', role: 'primary', label: '水平拉' },
          { pat: 'vertical_pull', g: '背', role: 'secondary', label: '垂直拉' },
          { pat: 'rear_delt', g: '肩', role: 'iso', label: '后束' },
          { pat: 'bicep', g: '手臂', role: 'iso', label: '二头' },
          { pat: 'shrug', g: '背', role: 'iso', label: '斜方肌' }
        ]
      },
      {
        title: '腿 B', focus: ['单腿', '臀部', '腿屈伸'],
        slots: [
          { pat: 'single_leg', g: '腿', role: 'primary', label: '单腿' },
          { pat: 'glute', g: '臀', role: 'primary', label: '臀部' },
          { pat: 'leg_ext', g: '腿', role: 'iso', label: '腿屈伸' },
          { pat: 'leg_curl', g: '腿', role: 'iso', label: '腿弯举' },
          { pat: 'calf', g: '腿', role: 'iso', label: '小腿' },
          { pat: 'core', g: '核心', role: 'iso', label: '核心' }
        ]
      }
    ]
  };

  function prescription(slot, p) {
    let sets = slot.role === 'primary' ? 4 : slot.role === 'secondary' ? 3 : 3;
    if (p.experience === 'beginner') sets -= 1;
    if (p.experience === 'advanced' && slot.role === 'primary') sets += 1;
    if (p.goal === 'cut' && slot.role === 'iso' && !['bicep', 'tricep', 'lateral', 'rear_delt', 'chest_iso'].includes(slot.pat)) sets -= 1;
    if (p.goal === 'strength' && slot.role === 'primary') sets = Math.max(4, sets);
    sets = clamp(sets, 2, 5);

    let reps;
    let rir;
    let rest;
    if (p.goal === 'strength') {
      reps = slot.role === 'primary' ? '3–5' : slot.role === 'secondary' ? '5–6' : '8–10';
      rir = '2–3';
      rest = slot.role === 'primary' ? 180 : 120;
    } else if (p.goal === 'hypertrophy') {
      reps = slot.role === 'primary' ? '6–8' : slot.role === 'secondary' ? '8–10' : '10–15';
      rir = p.experience === 'beginner' ? '3' : '1–2';
      rest = slot.role === 'primary' ? 150 : 90;
    } else if (p.goal === 'cut') {
      reps = slot.role === 'primary' ? '8–10' : slot.role === 'secondary' ? '10–12' : '12–15';
      rir = '1–2';
      rest = slot.role === 'primary' ? 120 : 60;
    } else if (p.goal === 'recomp') {
      reps = slot.role === 'primary' ? '6–10' : '10–15';
      rir = '1–2';
      rest = 120;
    } else {
      reps = slot.role === 'primary' ? '8–12' : '10–15';
      rir = '2–3';
      rest = 90;
    }

    if (slot.pat === 'calf' || slot.pat === 'core' || slot.pat === 'lateral') {
      reps = p.goal === 'strength' ? '8–10' : '12–20';
    }

    if (p.minutes <= 45) {
      sets = Math.min(sets, 3);
      if (p.goal === 'strength') rest = 180;
      else if (p.goal === 'cut') rest = Math.min(rest, 90);
      else rest = Math.min(rest, 120);
    }
    if (p.minutes <= 30) {
      sets = Math.min(sets, 3);
      rest = p.goal === 'strength' ? 180 : 90;
    }
    return { sets, reps, rir, rest };
  }

  function maxExercises(p) {
    const m = Number(p.minutes);
    if (p.goal === 'strength') {
      if (m <= 45) return 3;
      if (m <= 60) return 4;
      if (m <= 75) return 5;
      return 6;
    }
    if (p.goal === 'hypertrophy') {
      if (m <= 45) return 4;
      if (m <= 60) return 5;
      if (m <= 75) return 6;
      return 7;
    }
    if (m <= 30) return 3;
    if (m <= 45) return 5;
    if (m <= 60) return 6;
    if (m <= 75) return 7;
    return 8;
  }

  function generatePlan(profile, seed = Date.now()) {
    const p = { ...DEFAULT_PROFILE, ...profile };
    const template = SPLITS[p.days] || SPLITS[4];
    const used = {};
    const limit = Math.min(maxExercises(p), p.experience === 'beginner' ? 6 : 8);
    const days = template.map((tpl, dayIndex) => {
      const slots = [];
      tpl.slots.slice(0, limit).forEach((slot, slotIndex) => {
        const rng = mulberry32(seed + dayIndex * 101 + slotIndex * 17 + 7);
        const ex = pickExercise(slot, p, used, rng);
        if (!ex) return;
        used[ex.id] = (used[ex.id] || 0) + 1;
        const rx = prescription(slot, p);
        slots.push({
          exId: ex.id,
          sets: rx.sets,
          reps: rx.reps,
          rir: rx.rir,
          rest: rx.rest,
          role: slot.role,
          pat: slot.pat,
          g: slot.g
        });
      });
      return { title: tpl.title, focus: [...tpl.focus], slots };
    });
    return {
      id: `plan-${seed}`,
      createdAt: Date.now(),
      seed,
      goal: p.goal,
      days
    };
  }

  function regeneratePlan() {
    S.plan = generatePlan(S.profile, Date.now());
    S.plan.createdAt = Date.now();
    UI.planDay = 0;
    save();
    toast('已按当前资料重新生成计划', 'ok');
    render();
  }

  function ensureInitialLog() {
    if (!S.logs.length) {
      S.logs.push({
        id: `log-${Date.now()}`,
        date: isoDate(),
        weight: Number(S.profile.weight) || 0,
        bodyFat: S.profile.bodyFat || null,
        waist: S.profile.waist || null
      });
    }
  }

  function completeOnboarding() {
    const limitButtons = [...onboardRoot.querySelectorAll('[data-action="ob-limit"]')];
    const focusButtons = [...onboardRoot.querySelectorAll('[data-action="ob-focus"]')];
    if (limitButtons.length) {
      UI.draft.limitations = limitButtons.filter((el) => el.classList.contains('checked')).map((el) => el.dataset.value);
    }
    if (focusButtons.length) {
      UI.draft.focus = focusButtons.filter((el) => el.classList.contains('checked')).map((el) => el.dataset.value);
    }
    S.profile = { ...S.profile, ...UI.draft };
    S.plan = generatePlan(S.profile, Date.now());
    S.onboarded = true;
    ensureInitialLog();
    save();
    onboardRoot.innerHTML = '';
    document.body.classList.remove('is-locked');
    UI.draft = null;
    toast('计划已生成，先从今天开始', 'ok');
    render();
  }

  function loadDemo() {
    const demoProfile = {
      ...DEFAULT_PROFILE,
      name: '示例用户',
      sex: 'male',
      age: 29,
      height: 178,
      weight: 76,
      bodyFat: 18,
      waist: 84,
      experience: 'intermediate',
      goal: 'cut',
      days: 4,
      minutes: 60,
      equipment: 'gym',
      activity: 'moderate',
      limitations: [],
      focus: ['胸', '背', '腿'],
      diet: 'omnivore',
      targetWeight: 72,
      weeklyRate: 0.5
    };
    S.profile = demoProfile;
    S.onboarded = true;
    S.plan = generatePlan(demoProfile, 20261019);
    const start = new Date();
    start.setDate(start.getDate() - 39);
    const weights = [78.4, 78.1, 77.9, 77.6, 77.4, 77.5, 77.0, 76.8, 76.9, 76.6, 76.4, 76.2, 76.0, 76.0];
    S.logs = weights.map((w, i) => {
      const d = new Date(start);
      d.setDate(d.getDate() + i * 3);
      return {
        id: `demo-log-${i}`,
        date: isoDate(d),
        weight: w,
        bodyFat: i === 0 ? 19.2 : null,
        waist: i === 0 ? 86 : null
      };
    });
    S.sessions = [
      { id: 'demo-s1', date: daysAgoISO(1), dayTitle: '上肢 A', sets: 18, duration: 58 },
      { id: 'demo-s2', date: daysAgoISO(3), dayTitle: '下肢 A', sets: 17, duration: 62 },
      { id: 'demo-s3', date: daysAgoISO(5), dayTitle: '上肢 B', sets: 16, duration: 55 }
    ];
    const today = isoDate();
    S.intake = {
      [today]: [
        { id: 'i1', name: '燕麦 40g', kcal: 156, p: 5.2, c: 26.4, f: 2.8 },
        { id: 'i2', name: '鸡蛋 2 个', kcal: 144, p: 12.6, c: 0.8, f: 9.6 },
        { id: 'i3', name: '鸡胸肉 150g', kcal: 248, p: 46.5, c: 0, f: 5.4 }
      ]
    };
    save();
    onboardRoot.innerHTML = '';
    document.body.classList.remove('is-locked');
    UI.draft = null;
    UI.view = 'home';
    location.hash = '#home';
    toast('示例数据已加载，可以随意探索', 'ok');
    render();
  }

  /* ---------- SVG helpers ---------- */

  function bodyMap(mp = [], ms = []) {
    const cls = (r) => (mp.includes(r) ? 'primary' : ms.includes(r) ? 'secondary' : '');
    const m = (r, shape) => shape.replaceAll('{{C}}', cls(r));
    return `
      <div class="body-map" aria-label="主要与次要肌群示意图">
        <svg viewBox="0 0 120 240" role="img" aria-label="正面肌群">
          <circle class="silhouette" cx="60" cy="20" r="13"/>
          <rect class="silhouette" x="53" y="32" width="14" height="10" rx="5"/>
          <path class="silhouette" d="M39 47 Q60 40 81 47 L86 82 Q83 103 78 112 L80 130 Q60 139 40 130 L42 112 Q37 103 34 82 Z"/>
          <path class="silhouette" d="M38 51 Q29 63 27 83 L23 118 Q22 128 27 130 Q32 131 34 122 L37 96 Q40 75 45 60 Z"/>
          <path class="silhouette" d="M82 51 Q91 63 93 83 L97 118 Q98 128 93 130 Q88 131 86 122 L83 96 Q80 75 75 60 Z"/>
          <path class="silhouette" d="M44 129 Q52 136 51 146 L49 177 L51 219 Q51 229 45 229 Q39 229 39 219 L40 178 L40 148 Q38 137 44 129 Z"/>
          <path class="silhouette" d="M76 129 Q68 136 69 146 L71 177 L69 219 Q69 229 75 229 Q81 229 81 219 L80 178 L80 148 Q82 137 76 129 Z"/>
          ${m('traps', '<path class="muscle {{C}}" d="M50 42 Q60 38 70 42 L74 48 Q60 45 46 48 Z"/>')}
          ${m('front_delts', '<ellipse class="muscle {{C}}" cx="40" cy="55" rx="8" ry="9"/>')}
          ${m('front_delts', '<ellipse class="muscle {{C}}" cx="80" cy="55" rx="8" ry="9"/>')}
          ${m('side_delts', '<ellipse class="muscle {{C}}" cx="33" cy="59" rx="5" ry="8"/>')}
          ${m('side_delts', '<ellipse class="muscle {{C}}" cx="87" cy="59" rx="5" ry="8"/>')}
          ${m('chest', '<path class="muscle {{C}}" d="M45 60 Q55 57 59 62 L59 75 Q50 79 43 73 Z"/>')}
          ${m('chest', '<path class="muscle {{C}}" d="M75 60 Q65 57 61 62 L61 75 Q70 79 77 73 Z"/>')}
          ${m('biceps', '<ellipse class="muscle {{C}}" cx="29" cy="76" rx="5" ry="12"/>')}
          ${m('biceps', '<ellipse class="muscle {{C}}" cx="91" cy="76" rx="5" ry="12"/>')}
          ${m('forearms', '<ellipse class="muscle {{C}}" cx="25" cy="103" rx="4" ry="13"/>')}
          ${m('forearms', '<ellipse class="muscle {{C}}" cx="95" cy="103" rx="4" ry="13"/>')}
          ${m('abs', '<rect class="muscle {{C}}" x="54" y="82" width="5" height="7" rx="2"/><rect class="muscle {{C}}" x="61" y="82" width="5" height="7" rx="2"/><rect class="muscle {{C}}" x="54" y="91" width="5" height="7" rx="2"/><rect class="muscle {{C}}" x="61" y="91" width="5" height="7" rx="2"/><rect class="muscle {{C}}" x="55" y="100" width="4" height="7" rx="2"/><rect class="muscle {{C}}" x="61" y="100" width="4" height="7" rx="2"/>')}
          ${m('obliques', '<path class="muscle {{C}}" d="M47 82 Q50 83 50 90 L49 107 Q46 104 45 96 Z"/>')}
          ${m('obliques', '<path class="muscle {{C}}" d="M73 82 Q70 83 70 90 L71 107 Q74 104 75 96 Z"/>')}
          ${m('quads', '<ellipse class="muscle {{C}}" cx="49" cy="154" rx="8" ry="20"/>')}
          ${m('quads', '<ellipse class="muscle {{C}}" cx="71" cy="154" rx="8" ry="20"/>')}
          ${m('calves', '<ellipse class="muscle {{C}}" cx="45" cy="204" rx="5" ry="14"/>')}
          ${m('calves', '<ellipse class="muscle {{C}}" cx="75" cy="204" rx="5" ry="14"/>')}
        </svg>
        <svg viewBox="0 0 120 240" role="img" aria-label="背面肌群">
          <circle class="silhouette" cx="60" cy="20" r="13"/>
          <rect class="silhouette" x="53" y="32" width="14" height="10" rx="5"/>
          <path class="silhouette" d="M39 47 Q60 40 81 47 L86 82 Q83 103 78 112 L80 130 Q60 139 40 130 L42 112 Q37 103 34 82 Z"/>
          <path class="silhouette" d="M38 51 Q29 63 27 83 L23 118 Q22 128 27 130 Q32 131 34 122 L37 96 Q40 75 45 60 Z"/>
          <path class="silhouette" d="M82 51 Q91 63 93 83 L97 118 Q98 128 93 130 Q88 131 86 122 L83 96 Q80 75 75 60 Z"/>
          <path class="silhouette" d="M44 129 Q52 136 51 146 L49 177 L51 219 Q51 229 45 229 Q39 229 39 219 L40 178 L40 148 Q38 137 44 129 Z"/>
          <path class="silhouette" d="M76 129 Q68 136 69 146 L71 177 L69 219 Q69 229 75 229 Q81 229 81 219 L80 178 L80 148 Q82 137 76 129 Z"/>
          ${m('traps', '<path class="muscle {{C}}" d="M50 42 L60 38 L70 42 L75 55 L60 62 L45 55 Z"/>')}
          ${m('rear_delts', '<ellipse class="muscle {{C}}" cx="40" cy="56" rx="8" ry="8"/>')}
          ${m('rear_delts', '<ellipse class="muscle {{C}}" cx="80" cy="56" rx="8" ry="8"/>')}
          ${m('upper_back', '<path class="muscle {{C}}" d="M46 60 Q60 52 74 60 L70 78 Q60 84 50 78 Z"/>')}
          ${m('lats', '<path class="muscle {{C}}" d="M45 68 Q54 66 58 75 L57 96 Q50 99 43 91 Z"/>')}
          ${m('lats', '<path class="muscle {{C}}" d="M75 68 Q66 66 62 75 L63 96 Q70 99 77 91 Z"/>')}
          ${m('triceps', '<ellipse class="muscle {{C}}" cx="29" cy="77" rx="5" ry="13"/>')}
          ${m('triceps', '<ellipse class="muscle {{C}}" cx="91" cy="77" rx="5" ry="13"/>')}
          ${m('forearms', '<ellipse class="muscle {{C}}" cx="25" cy="104" rx="4" ry="13"/>')}
          ${m('forearms', '<ellipse class="muscle {{C}}" cx="95" cy="104" rx="4" ry="13"/>')}
          ${m('lower_back', '<path class="muscle {{C}}" d="M53 94 Q60 90 67 94 L68 112 Q60 120 52 112 Z"/>')}
          ${m('glutes', '<ellipse class="muscle {{C}}" cx="52" cy="128" rx="9" ry="9"/>')}
          ${m('glutes', '<ellipse class="muscle {{C}}" cx="68" cy="128" rx="9" ry="9"/>')}
          ${m('hamstrings', '<ellipse class="muscle {{C}}" cx="49" cy="158" rx="7" ry="18"/>')}
          ${m('hamstrings', '<ellipse class="muscle {{C}}" cx="71" cy="158" rx="7" ry="18"/>')}
          ${m('calves', '<ellipse class="muscle {{C}}" cx="45" cy="204" rx="5" ry="14"/>')}
          ${m('calves', '<ellipse class="muscle {{C}}" cx="75" cy="204" rx="5" ry="14"/>')}
        </svg>
        <div class="map-legend">
          <span><i class="p"></i>主要</span>
          <span><i class="s"></i>次要</span>
        </div>
      </div>`;
  }

  function circumference(radius) {
    return 2 * Math.PI * radius;
  }

  function ringSVG(pct) {
    const r = 38;
    const c = circumference(r);
    const offset = c * (1 - clamp(pct, 0, 100) / 100);
    return `
      <svg viewBox="0 0 88 88" aria-hidden="true">
        <circle class="ring-bg" cx="44" cy="44" r="${r}"/>
        <circle class="ring-fg" cx="44" cy="44" r="${r}" stroke-dasharray="${c}" stroke-dashoffset="${offset}"/>
      </svg>`;
  }

  function sparklineSVG() {
    const logs = sortedLogs().slice(-14);
    if (logs.length < 2) {
      return '<div class="empty-mini">再记录一次体重，就能看到趋势</div>';
    }
    const W = 320;
    const H = 58;
    const pad = 5;
    const xs = logs.map((l) => parseDate(l.date).getTime());
    const ys = logs.map((l) => Number(l.weight));
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys) - 0.6;
    const maxY = Math.max(...ys) + 0.6;
    const x = (v) => pad + ((v - minX) / (maxX - minX || 1)) * (W - pad * 2);
    const y = (v) => pad + ((maxY - v) / (maxY - minY || 1)) * (H - pad * 2);
    const pts = logs.map((l, i) => ({ x: x(xs[i]), y: y(Number(l.weight)) }));
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const area = `${line} L${pts[pts.length - 1].x.toFixed(1)},${H - 1} L${pts[0].x.toFixed(1)},${H - 1} Z`;
    const last = pts[pts.length - 1];
    return `
      <svg class="sparkline" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-label="最近体重趋势">
        <defs>
          <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c9ff3f" stop-opacity=".45"/>
            <stop offset="100%" stop-color="#c9ff3f" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <path class="spark-area" d="${area}"/>
        <path class="spark-line" d="${line}"/>
        <circle class="spark-dot" cx="${last.x}" cy="${last.y}" r="3"/>
      </svg>`;
  }

  function weightTrend() {
    const logs = sortedLogs().slice(-21);
    if (logs.length < 3) return null;
    const first = parseDate(logs[0].date).getTime();
    const points = logs.map((l) => ({
      x: (parseDate(l.date).getTime() - first) / 86400000,
      y: Number(l.weight)
    }));
    const span = points[points.length - 1].x;
    if (span < 7) return null;
    const { slope } = linreg(points);
    const w = currentWeight() || 1;
    return {
      weeklyKg: slope * 7,
      weeklyPct: (slope * 7) / w * 100,
      span,
      logs
    };
  }

  function weightDelta(days) {
    const logs = sortedLogs();
    if (!logs.length) return null;
    const latest = logs[logs.length - 1];
    const cutoff = new Date(parseDate(latest.date));
    cutoff.setDate(cutoff.getDate() - days);
    const cutoffISO = isoDate(cutoff);
    const prior = [...logs].reverse().find((l) => l.date <= cutoffISO);
    if (!prior) return null;
    return Number(latest.weight) - Number(prior.weight);
  }

  function trendClass(n) {
    if (n == null || Math.abs(n) < 0.05) return 'trend-flat';
    return n > 0 ? 'trend-up' : 'trend-down';
  }

  function signed(n, digits = 1) {
    if (n == null) return '—';
    const v = Number(n);
    return `${v > 0 ? '+' : ''}${v.toFixed(digits)}`;
  }

  /* ---------- Shell ---------- */

  function brandMarkup(compact = false) {
    return `
      <div class="brand">
        <div class="brand-mark">${ICONS.dumbbell}</div>
        <div>
          <div class="brand-name">炼 FORGE</div>
          ${compact ? '' : '<div class="brand-sub">TRAIN · EAT · PROGRESS</div>'}
        </div>
      </div>`;
  }

  function navMarkup(active, rail = false) {
    if (rail) {
      return NAV.map((n) => `
        <a class="rail-link ${active === n.id ? 'active' : ''}" href="#${n.id}" data-action="nav" data-view="${n.id}">
          ${ICONS[n.icon]}<span>${n.label}</span>
        </a>`).join('') + `
        <a class="rail-link ${active === 'research' ? 'active' : ''}" href="#research" data-action="nav" data-view="research">
          ${ICONS.book}<span>研究依据</span>
        </a>`;
    }
    return NAV.map((n) => `
      <a class="tab ${active === n.id ? 'active' : ''}" href="#${n.id}" data-action="nav" data-view="${n.id}">
        ${ICONS[n.icon]}<span>${n.label}</span>
      </a>`).join('');
  }

  function shell(content, view) {
    const name = S.profile.name || '训练者';
    const initial = name.trim().slice(0, 1) || '炼';
    const dateText = new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' }).format(new Date());
    return `
      <div class="app-shell">
        <aside class="rail">
          ${brandMarkup()}
          <nav class="rail-nav" aria-label="主导航">${navMarkup(view, true)}</nav>
          <div class="rail-foot">
            <h4>证据优先</h4>
            <p>计划基于训练量、接近力竭程度和蛋白质摄入等研究；个体差异需要用记录来校准。</p>
          </div>
        </aside>
        <div class="main-col">
          <header class="topbar">
            ${brandMarkup()}
            <div class="topbar-date"><span>${dateText}</span><b>· 今天练什么？</b></div>
            <div class="top-actions">
              <button class="icon-btn" data-action="open-research" aria-label="打开研究依据">${ICONS.book}</button>
              <button class="avatar" data-action="open-profile" aria-label="打开个人资料">${esc(initial)}</button>
            </div>
          </header>
          <main class="view" id="view">${content}</main>
        </div>
        <nav class="tabbar" aria-label="主导航">${navMarkup(view)}</nav>
      </div>`;
  }

  /* ---------- Home ---------- */

  function nextPlanDay() {
    if (!S.plan || !S.plan.days.length) return null;
    const idx = S.sessions.length % S.plan.days.length;
    return { day: S.plan.days[idx], index: idx };
  }

  function goalHref() {
    return S.plan ? '#plan' : '#plan';
  }

  function homeInsight() {
    const trend = weightTrend();
    const t = nutritionTargets();
    if (!trend) {
      return {
        title: '先把趋势建立起来',
        body: `体重每天会因水分、盐分和糖原波动。连续记录 2–3 周，再看周平均变化，才能判断 ${t.kcal} kcal 是否适合你。`
      };
    }
    const rate = trend.weeklyPct;
    const goalRate = Number(S.profile.weeklyRate) || 0.5;
    if (S.profile.goal === 'cut') {
      if (rate > -goalRate * 0.45) {
        return { title: '减脂速度偏慢', body: `过去约 ${Math.round(trend.span)} 天，周均变化 ${signed(rate, 2)}%。可以先检查记录误差和日常步数，再把热量下调 100–150 kcal。` };
      }
      if (rate < -goalRate * 1.6) {
        return { title: '减得有点快', body: `周均变化 ${signed(rate, 2)}%，超过目标。建议增加 100–150 kcal 碳水，优先保住训练表现和瘦体重。` };
      }
      return { title: '节奏正好', body: `周均变化 ${signed(rate, 2)}%，在可持续范围内。保持蛋白质 ${t.protein}g 和力量训练，不用天天盯体重。` };
    }
    if (S.profile.goal === 'gain') {
      if (rate < goalRate * 0.4) {
        return { title: '增重速度偏慢', body: `周均变化 ${signed(rate, 2)}%。如果训练量和恢复都到位，可以增加 100–150 kcal，优先补碳水。` };
      }
      if (rate > goalRate * 1.6) {
        return { title: '增重速度偏快', body: `周均变化 ${signed(rate, 2)}%，脂肪增长可能偏多。建议减少 100–150 kcal，观察 2 周。` };
      }
      return { title: '增重节奏合适', body: `周均变化 ${signed(rate, 2)}%。继续保持渐进超负荷，用围度和力量判断肌肉增长。` };
    }
    return {
      title: '看趋势，不被单日数字带跑',
      body: `最近周均变化 ${signed(rate, 2)}%。你的目标更看重力量和身体成分，建议同时记录训练重量、腰围和照片。`
    };
  }

  function homeView() {
    const p = S.profile;
    const next = nextPlanDay();
    const goal = GOALS[p.goal] || GOALS.hypertrophy;
    const trend = weightTrend();
    const t = nutritionTargets();
    const weekly = weeklySessions();
    const completedPct = clamp((weekly.length / Math.max(1, p.days)) * 100, 0, 100);
    const insight = homeInsight();
    const latest = latestLog();
    const delta7 = weightDelta(7);
    const vol = planVolume(S.plan);
    const totalSets = planTotalSets(S.plan);
    const recent = [...S.sessions].sort((a, b) => String(b.date).localeCompare(String(a.date))).slice(0, 3);
    const intake = S.intake[isoDate()] || [];
    const kcalIn = sum(intake.map((i) => i.kcal));
    const proteinIn = sum(intake.map((i) => i.p));
    const heroTitle = next
      ? `今天，练<em>${esc(next.day.title)}</em>`
      : `先建立你的<br><em>训练系统</em>`;
    const heroDesc = next
      ? `${next.day.focus.join(' · ')}。按计划完成，比临场决定更省心。`
      : goal.desc;

    return `
      <div class="home-grid">
        <div class="home-main">
          <section class="hero">
            <div class="hero-content">
              <div class="hero-top">
                <div class="hero-kicker"><span class="live-dot"></span>${new Intl.DateTimeFormat('zh-CN', { weekday: 'long' }).format(new Date())} · ${GOALS[p.goal] ? GOALS[p.goal].label : '训练'}</div>
                <div class="hero-tag">${esc(p.name || '你的计划')}</div>
              </div>
              <h1>${heroTitle}</h1>
              <p class="hero-desc">${heroDesc}</p>
              ${next ? `
                <div class="hero-meta">
                  <span class="meta-pill">${ICONS.layers}${next.day.slots.length} 个动作</span>
                  <span class="meta-pill">${ICONS.clock}约 ${dayMinutes(next.day)} 分钟</span>
                  <span class="meta-pill">${ICONS.bolt}SFR ${planAvgSfr(S.plan)}</span>
                </div>
                <div class="hero-actions">
                  <button class="btn" data-action="start-session" data-day="${next.index}">${ICONS.play}开始训练</button>
                  <a class="btn btn-ghost" href="#plan" data-action="nav" data-view="plan">查看计划</a>
                </div>` : `
                <div class="hero-actions">
                  <button class="btn" data-action="open-onboarding">${ICONS.spark}生成我的计划</button>
                  <a class="btn btn-ghost" href="#library" data-action="nav" data-view="library">先看动作库</a>
                </div>`}
            </div>
          </section>

          <div class="stat-grid">
            <div class="stat">
              <div class="stat-label">${ICONS.scale}当前体重</div>
              <div class="stat-value num">${currentWeight().toFixed(1)}<small>kg</small></div>
              <div class="stat-sub ${trendClass(delta7)}">${delta7 == null ? '记录 7 天以上看变化' : `${signed(delta7)} kg / 近 7 天`}</div>
            </div>
            <div class="stat">
              <div class="stat-label">${ICONS.calendar}本周训练</div>
              <div class="stat-value num">${weekly.length}<small>/ ${p.days} 次</small></div>
              <div class="stat-sub">${weekly.length >= p.days ? '本周目标已完成' : `还差 ${Math.max(0, p.days - weekly.length)} 次`}</div>
            </div>
            <div class="stat">
              <div class="stat-label">${ICONS.apple}蛋白质目标</div>
              <div class="stat-value num">${t.protein}<small>g</small></div>
              <div class="stat-sub">今天已摄入 ${Math.round(proteinIn)}g</div>
            </div>
            <div class="stat">
              <div class="stat-label">${ICONS.layers}每周组数</div>
              <div class="stat-value num">${totalSets}<small>组</small></div>
              <div class="stat-sub">${planAvgSfr(S.plan) ? `平均效率 ${planAvgSfr(S.plan)} / 10` : '生成计划后计算'}</div>
            </div>
          </div>

          <section class="section">
            <div class="card">
              <div class="progress-ring-wrap">
                <div class="progress-ring">
                  ${ringSVG(completedPct)}
                  <div class="ring-center"><div><strong class="num">${Math.round(completedPct)}%</strong><span>本周</span></div></div>
                </div>
                <div class="ring-copy">
                  <h3>${weekly.length >= p.days ? '这周的节奏已经稳了' : '把训练分散到这一周'}</h3>
                  <p>${weekly.length >= p.days ? '完成比完美重要。剩下几天可以安排低强度有氧或恢复。' : `已完成 ${weekly.length} 次，计划 ${p.days} 次。每个大肌群每周至少被刺激 2 次，通常更容易累积训练量。`}</p>
                </div>
              </div>
            </div>
          </section>

          <section class="section">
            <div class="insight">
              <div class="insight-icon">${ICONS.spark}</div>
              <div>
                <h3>${insight.title}</h3>
                <p>${insight.body}</p>
              </div>
            </div>
          </section>

          <section class="section">
            <div class="section-head"><h2 class="section-title">快速操作</h2></div>
            <div class="quick-row">
              <button class="quick-action" data-action="focus-weight">
                <span class="quick-icon">${ICONS.scale}</span>
                <span class="quick-label">记录<br>体重</span>
              </button>
              <a class="quick-action" href="#library" data-action="nav" data-view="library">
                <span class="quick-icon">${ICONS.dumbbell}</span>
                <span class="quick-label">浏览<br>动作库</span>
              </a>
              <a class="quick-action" href="#nutrition" data-action="nav" data-view="nutrition">
                <span class="quick-icon">${ICONS.apple}</span>
                <span class="quick-label">今天<br>怎么吃</span>
              </a>
            </div>
          </section>

          <section class="section">
            <div class="section-head">
              <h2 class="section-title">体重趋势</h2>
              <a class="section-link" href="#log" data-action="nav" data-view="log">详细记录 ${ICONS.right}</a>
            </div>
            <div class="card card-flat">
              <div style="display:flex;align-items:baseline;justify-content:space-between;gap:10px">
                <div><span class="num" style="font-size:27px;font-weight:800">${currentWeight().toFixed(1)}</span> <span style="color:var(--muted);font-size:11px">kg</span></div>
                <div style="color:var(--muted);font-size:10px">${trend ? `周均 ${signed(trend.weeklyKg)} kg` : `${sortedLogs().length} 次记录`}</div>
              </div>
              ${sparklineSVG()}
              <div style="display:flex;justify-content:space-between;color:var(--muted-2);font-size:9px;margin-top:5px">
                <span>${sortedLogs().length ? fmtShortDate(sortedLogs()[0].date) : '尚无记录'}</span>
                <span>${latest ? fmtShortDate(latest.date) : ''}</span>
              </div>
            </div>
          </section>

          <section class="section">
            <div class="research-teaser">
              <div>
                <h3>为什么这样安排？</h3>
                <p>16 篇研究摘要、9 位运动员公开案例和 8 位教练视频索引，解释训练量、力竭、蛋白质和减脂速度背后的依据。</p>
              </div>
              <div class="research-mini-avatars">
                <span class="mini-avatar a-lime">施</span>
                <span class="mini-avatar a-orange">耶</span>
                <span class="mini-avatar a-blue">基</span>
              </div>
            </div>
          </section>
        </div>

        <div class="home-side">
          <section class="section">
            <div class="section-head"><h2 class="section-title">今日营养</h2><a class="section-link" href="#nutrition" data-action="nav" data-view="nutrition">打开 ${ICONS.right}</a></div>
            <div class="card card-flat">
              <div class="intake-summary">
                <strong class="num">${Math.round(kcalIn)} <small style="font-size:11px;color:var(--muted)">/ ${t.kcal} kcal</small></strong>
                <span>${Math.max(0, t.kcal - Math.round(kcalIn))} 剩余</span>
              </div>
              <div class="bar"><i style="width:${clamp((kcalIn / t.kcal) * 100, 0, 100)}%"></i></div>
              <div class="intake-macros">
                <div class="intake-macro"><b class="num">${Math.round(proteinIn)} / ${t.protein}g</b><span>蛋白质</span></div>
                <div class="intake-macro"><b class="num">${t.carbs}g</b><span>碳水目标</span></div>
                <div class="intake-macro"><b class="num">${t.fat}g</b><span>脂肪目标</span></div>
              </div>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:13px">
                <button class="btn btn-sm" data-action="quick-add" data-index="1">${ICONS.plus}鸡胸 100g</button>
                <button class="btn btn-sm btn-ghost" data-action="quick-add" data-index="3">${ICONS.plus}乳清 1 勺</button>
              </div>
            </div>
          </section>

          <section class="section">
            <div class="section-head"><h2 class="section-title">最近训练</h2><a class="section-link" href="#plan" data-action="nav" data-view="plan">计划 ${ICONS.right}</a></div>
            ${recent.length ? `<div class="log-list">${recent.map((s) => `
              <div class="log-row">
                <div><div class="log-date">${fmtRelative(s.date)}</div><div style="font-size:10px;color:var(--muted-2);margin-top:2px">${esc(s.dayTitle || '训练')}</div></div>
                <div class="log-weight">${s.sets} <span style="font-size:8px;color:var(--muted)">组</span></div>
                <div class="log-extra">${s.duration || 0} 分</div>
              </div>`).join('')}</div>` : '<div class="empty-mini">完成第一次训练后，这里会记录你的进度</div>'}
          </section>

          <section class="section">
            <div class="card card-flat">
              <div class="stat-label">${ICONS.target}目标进度</div>
              <div class="goal-progress">
                <div class="goal-progress-head"><span>${fmtShortDate(sortedLogs()[0] ? sortedLogs()[0].date : isoDate())}</span><span>目标 ${p.targetWeight} kg</span></div>
                <div class="goal-track"><div class="goal-fill" style="width:${goalProgressPct()}%"></div></div>
              </div>
              <p style="margin-top:9px;color:var(--muted-2);font-size:9.5px;line-height:1.55">按每周 ${p.weeklyRate}% 体重的速度，目标大约需要 ${weeksToGoal()} 周。实际进度会随依从性和代谢适应变化。</p>
            </div>
          </section>
        </div>
      </div>`;
  }

  function goalProgressPct() {
    const logs = sortedLogs();
    if (!logs.length) return 0;
    const start = Number(logs[0].weight);
    const now = currentWeight();
    const goal = Number(S.profile.targetWeight);
    if (start === goal) return 100;
    return clamp(((start - now) / (start - goal)) * 100, 0, 100);
  }

  function weeksToGoal() {
    const diff = Math.abs(currentWeight() - Number(S.profile.targetWeight));
    const weekly = Math.max(0.1, (Number(S.profile.weeklyRate) / 100) * currentWeight());
    return Math.max(1, Math.round(diff / weekly));
  }

  /* ---------- Library ---------- */

  function equipmentIcon(eq) {
    if (eq === '自重' || eq === '弹力带') return ICONS.user;
    if (eq === '器械' || eq === '绳索') return ICONS.layers;
    return ICONS.dumbbell;
  }

  function difficultyLabel(lv) {
    return lv === 1 ? '入门' : lv === 2 ? '进阶' : '高阶';
  }

  function filteredExercises() {
    const q = UI.lib.q.trim().toLowerCase();
    let list = EX.filter((e) => {
      if (UI.lib.group !== '全部' && e.g !== UI.lib.group) return false;
      if (UI.lib.equip !== '全部' && e.eq !== UI.lib.equip) return false;
      if (!q) return true;
      return [e.n, e.en, e.p, e.g, e.eq, ...(e.tags || [])].join(' ').toLowerCase().includes(q);
    });
    if (UI.lib.sort === 'level') list = [...list].sort((a, b) => a.lv - b.lv || b.sfr - a.sfr);
    else if (UI.lib.sort === 'name') list = [...list].sort((a, b) => a.n.localeCompare(b.n, 'zh-CN'));
    else list = [...list].sort((a, b) => b.sfr - a.sfr || a.lv - b.lv);
    return list;
  }

  function exerciseCard(e) {
    return `
      <button class="ex-card" data-action="open-ex" data-id="${e.id}" aria-label="查看 ${esc(e.n)} 详情">
        <span class="ex-icon">${equipmentIcon(e.eq)}</span>
        <span class="ex-main">
          <span class="ex-name">${esc(e.n)}</span>
          <span class="ex-en">${esc(e.en)}</span>
          <span class="ex-meta">
            <span class="mini-tag">${esc(e.g)}</span>
            <span class="mini-tag">${esc(e.eq)}</span>
            <span class="mini-tag ${e.sfr >= 8 ? 'hot' : ''}">${difficultyLabel(e.lv)}</span>
          </span>
        </span>
        <span class="sfr-badge"><b>${e.sfr}</b><span>SFR</span></span>
      </button>`;
  }

  function libraryListHTML() {
    return filteredExercises().map(exerciseCard).join('');
  }

  function libraryView() {
    const groups = ['全部', ...new Set(EX.map((e) => e.g))];
    const equipments = ['全部', ...new Set(EX.map((e) => e.eq))];
    const list = filteredExercises();
    return `
      <div class="page-head">
        <div>
          <div class="eyebrow">Exercise Library</div>
          <h1 class="page-title">动作库</h1>
          <p class="page-sub">${EX.length} 个动作，按肌群、器械和难度筛选。每个动作都标注了刺激/疲劳比、动作要点和替代方案。</p>
        </div>
      </div>
      <div class="search-wrap">
        ${ICONS.search}
        <input class="search-input" id="lib-search" type="search" placeholder="搜索动作、肌群或英文名…" value="${esc(UI.lib.q)}" autocomplete="off">
        <button class="search-clear" data-action="lib-clear" aria-label="清空搜索" style="${UI.lib.q ? '' : 'display:none'}">${ICONS.close}</button>
      </div>
      <div class="chip-scroll" aria-label="按肌群筛选">
        ${groups.map((g) => `<button class="chip ${UI.lib.group === g ? 'active' : ''}" data-action="lib-group" data-value="${g}">${g} <span class="chip-count">${g === '全部' ? EX.length : EX.filter((e) => e.g === g).length}</span></button>`).join('')}
      </div>
      <div class="filter-row">
        <span class="result-count" id="result-count">${list.length} 个动作 · 点击查看细节</span>
        <div style="display:flex;gap:6px">
          <select class="sort-select" id="lib-equip" aria-label="器械筛选">
            ${equipments.map((eq) => `<option value="${eq}" ${UI.lib.equip === eq ? 'selected' : ''}>${eq === '全部' ? '全部器械' : eq}</option>`).join('')}
          </select>
          <select class="sort-select" id="lib-sort" aria-label="排序方式">
            <option value="sfr" ${UI.lib.sort === 'sfr' ? 'selected' : ''}>效率优先</option>
            <option value="level" ${UI.lib.sort === 'level' ? 'selected' : ''}>难度从低到高</option>
            <option value="name" ${UI.lib.sort === 'name' ? 'selected' : ''}>按名称</option>
          </select>
        </div>
      </div>
      <div class="exercise-list" id="ex-list">${libraryListHTML() || '<div class="empty-state">' + ICONS.search + '<p>没有找到匹配动作，试试更短的关键词或切换肌群。</p></div>'}</div>
      <div style="height:14px"></div>
      <div class="disclaimer"><b>关于 SFR：</b>SFR 是“刺激 / 疲劳比”的训练实践评分（1–10），用于比较动作在单位疲劳下能提供的有效刺激，不是实验室测量值。它不能替代动作质量、关节舒适度和个人经验。</div>`;
  }

  function refreshLibraryList() {
    const list = filteredExercises();
    const listEl = document.getElementById('ex-list');
    const countEl = document.getElementById('result-count');
    if (listEl) {
      listEl.innerHTML = list.length
        ? list.map(exerciseCard).join('')
        : `<div class="empty-state">${ICONS.search}<p>没有找到匹配动作，试试更短的关键词或切换肌群。</p></div>`;
    }
    if (countEl) countEl.textContent = `${list.length} 个动作 · 点击查看细节`;
  }

  /* ---------- Animated movement demo ---------- */

  const DEMO_FAMILY = {
    horizontal_push: 'push', incline_push: 'push', vertical_push: 'push',
    vertical_pull: 'pull', horizontal_pull: 'pull', chest_iso: 'push', lat_iso: 'pull',
    squat: 'squat', single_leg: 'squat', hinge: 'hinge', glute: 'hinge',
    bicep: 'arms', tricep: 'arms', lateral: 'shoulders', front_delt: 'shoulders', rear_delt: 'shoulders',
    core: 'core', leg_ext: 'legs', leg_curl: 'legs', calf: 'legs', shrug: 'pull', carry: 'pull',
    cardio: 'cardio', mobility: 'mobility'
  };

  const DEMO_POSES = {
    squat: [
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 8, elbow: 0, bar: 'shoulder' },
      { hipY: 24, torso: 14, thigh: 38, shin: -30, arm: 78, elbow: 0, bar: 'shoulder' }
    ],
    hinge: [
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 0, elbow: 0, bar: 'hand' },
      { hipY: 6, torso: 56, thigh: 12, shin: -12, arm: 0, elbow: 0, bar: 'hand' }
    ],
    push: [
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 68, elbow: -78, bar: 'hand' },
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 168, elbow: 0, bar: 'hand' }
    ],
    pull: [
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 168, elbow: 0, bar: 'hand' },
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 48, elbow: -82, bar: 'hand' }
    ],
    arms: [
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 8, elbow: 0, dumbbell: true },
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 18, elbow: -122, dumbbell: true }
    ],
    shoulders: [
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 8, elbow: 0, dumbbell: true },
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 92, elbow: 0, dumbbell: true }
    ],
    legs: [
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 8, elbow: 0, dumbbell: false },
      { hipY: 0, torso: 0, thigh: 0, shin: 58, arm: 8, elbow: 0, dumbbell: false }
    ],
    cardio: [
      { hipY: 0, torso: 6, thigh: 32, shin: -28, arm: -36, elbow: -46, dumbbell: false },
      { hipY: 0, torso: 6, thigh: -24, shin: 24, arm: 36, elbow: 46, dumbbell: false }
    ],
    mobility: [
      { hipY: 0, torso: 0, thigh: 0, shin: 0, arm: 8, elbow: 0, dumbbell: false },
      { hipY: 4, torso: 22, thigh: 10, shin: -10, arm: 30, elbow: -20, dumbbell: false }
    ],
    core: [
      { phase: 0 },
      { phase: 1 }
    ]
  };

  function lerp(a, b, t) {
    return (Number(a) || 0) + ((Number(b) || 0) - (Number(a) || 0)) * t;
  }

  function demoPose(family, phase) {
    const pair = DEMO_POSES[family] || DEMO_POSES.push;
    const a = pair[0];
    const b = pair[1];
    const s = (1 - Math.cos(phase * Math.PI * 2)) / 2;
    return {
      hipY: lerp(a.hipY, b.hipY, s),
      torso: lerp(a.torso, b.torso, s),
      thigh: lerp(a.thigh, b.thigh, s),
      shin: lerp(a.shin, b.shin, s),
      arm: lerp(a.arm, b.arm, s),
      elbow: lerp(a.elbow, b.elbow, s),
      bar: a.bar || b.bar || '',
      dumbbell: !!(a.dumbbell || b.dumbbell),
      phase: s
    };
  }

  function drawLimb(ctx, x1, y1, x2, y2, width, color) {
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  function drawDemoFigure(ctx, family, phase) {
    const W = 480;
    const H = 300;
    ctx.clearRect(0, 0, W, H);
    const bg = ctx.createRadialGradient(W / 2, H / 2, 20, W / 2, H / 2, 240);
    bg.addColorStop(0, 'rgba(201,255,63,0.07)');
    bg.addColorStop(1, 'rgba(7,8,10,0)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.055)';
    ctx.lineWidth = 1;
    for (let x = 40; x < W; x += 40) {
      ctx.beginPath(); ctx.moveTo(x, 20); ctx.lineTo(x, 275); ctx.stroke();
    }
    for (let y = 40; y < 280; y += 40) {
      ctx.beginPath(); ctx.moveTo(20, y); ctx.lineTo(460, y); ctx.stroke();
    }
    const lime = '#c9ff3f';
    const muted = 'rgba(255,255,255,0.42)';
    const soft = 'rgba(201,255,63,0.28)';
    if (family === 'push') {
      const raise = (1 - Math.cos(phase * Math.PI * 2)) / 2;
      const barY = 132 - 46 * raise;
      const shoulder = { x: 284, y: 194 };
      const hip = { x: 176, y: 204 };
      const head = { x: 312, y: 184 };
      ctx.strokeStyle = 'rgba(255,255,255,0.14)';
      ctx.lineWidth = 8;
      ctx.beginPath(); ctx.moveTo(84, 226); ctx.lineTo(366, 226); ctx.stroke();
      drawLimb(ctx, hip.x, hip.y, shoulder.x, shoulder.y, 12, lime);
      drawLimb(ctx, hip.x, hip.y, 128, 222, 9, soft);
      drawLimb(ctx, 128, 222, 102, 256, 8, lime);
      drawLimb(ctx, hip.x, hip.y, 142, 235, 9, soft);
      drawLimb(ctx, 142, 235, 120, 265, 8, soft);
      drawLimb(ctx, shoulder.x - 10, shoulder.y + 4, shoulder.x - 34, 160, 8, soft);
      drawLimb(ctx, shoulder.x - 34, 160, shoulder.x - 12, barY + 3, 7, soft);
      drawLimb(ctx, shoulder.x + 8, shoulder.y + 2, shoulder.x + 42, 156, 9, lime);
      drawLimb(ctx, shoulder.x + 42, 156, shoulder.x + 14, barY + 3, 8, lime);
      ctx.fillStyle = lime;
      ctx.beginPath(); ctx.arc(head.x, head.y, 15, 0, Math.PI * 2); ctx.fill();
      drawLimb(ctx, 224, barY, 344, barY, 6, '#0b0d10');
      ctx.fillStyle = lime;
      ctx.beginPath(); ctx.arc(220, barY, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(348, barY, 8, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(201,255,63,0.1)';
      ctx.beginPath(); ctx.ellipse(280, 248, 105, 18, 0, 0, Math.PI * 2); ctx.fill();
      return;
    }
    if (family === 'core') {
      const lift = Math.sin(phase * Math.PI * 2) * 4;
      const hip = { x: 190, y: 190 - lift };
      const shoulder = { x: 292, y: 176 - lift };
      const head = { x: 316, y: 168 - lift };
      const elbow = { x: 302, y: 226 };
      const hand = { x: 306, y: 258 };
      drawLimb(ctx, hip.x, hip.y, shoulder.x, shoulder.y, 10, lime);
      drawLimb(ctx, shoulder.x, shoulder.y, elbow.x, elbow.y, 8, soft);
      drawLimb(ctx, elbow.x, elbow.y, hand.x, hand.y, 8, lime);
      drawLimb(ctx, hip.x, hip.y, 128, 204 - lift, 9, soft);
      drawLimb(ctx, 128, 204 - lift, 82, 250, 8, lime);
      ctx.fillStyle = lime;
      ctx.beginPath(); ctx.arc(head.x, head.y, 15, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.2)';
      ctx.beginPath(); ctx.moveTo(40, 260); ctx.lineTo(440, 260); ctx.stroke();
      ctx.fillStyle = 'rgba(201,255,63,0.12)';
      ctx.beginPath(); ctx.ellipse(245, 233, 115, 26, 0, 0, Math.PI * 2); ctx.fill();
      return;
    }
    const p = demoPose(family, phase);
    const hip = { x: 235, y: 196 + p.hipY };
    const rad = (deg) => (deg * Math.PI) / 180;
    const shoulder = { x: hip.x + Math.sin(rad(p.torso)) * 82, y: hip.y - Math.cos(rad(p.torso)) * 82 };
    const head = { x: shoulder.x + Math.sin(rad(p.torso)) * 24, y: shoulder.y - Math.cos(rad(p.torso)) * 24 };
    const arm = (side) => {
      const baseX = shoulder.x + side * 4;
      const elbow = { x: baseX + Math.sin(rad(p.arm)) * 44, y: shoulder.y + Math.cos(rad(p.arm)) * 44 };
      const fa = p.arm + p.elbow;
      const hand = { x: elbow.x + Math.sin(rad(fa)) * 42, y: elbow.y + Math.cos(rad(fa)) * 42 };
      return { elbow, hand };
    };
    const leg = (side) => {
      const baseX = hip.x + side * 5;
      const knee = { x: baseX + Math.sin(rad(p.thigh)) * 54, y: hip.y + Math.cos(rad(p.thigh)) * 54 };
      const sa = p.thigh + p.shin;
      const ankle = { x: knee.x + Math.sin(rad(sa)) * 54, y: knee.y + Math.cos(rad(sa)) * 54 };
      return { knee, ankle };
    };
    const armL = arm(-1);
    const armR = arm(1);
    const legL = leg(-1);
    const legR = leg(1);
    drawLimb(ctx, hip.x - 6, hip.y, legL.knee.x - 8, legL.knee.y, 9, soft);
    drawLimb(ctx, legL.knee.x - 8, legL.knee.y, legL.ankle.x - 8, legL.ankle.y, 8, soft);
    drawLimb(ctx, hip.x + 6, hip.y, legR.knee.x + 8, legR.knee.y, 10, lime);
    drawLimb(ctx, legR.knee.x + 8, legR.knee.y, legR.ankle.x + 8, legR.ankle.y, 9, lime);
    drawLimb(ctx, hip.x, hip.y, shoulder.x, shoulder.y, 12, lime);
    drawLimb(ctx, shoulder.x - 5, shoulder.y, armL.elbow.x - 4, armL.elbow.y, 8, soft);
    drawLimb(ctx, armL.elbow.x - 4, armL.elbow.y, armL.hand.x - 4, armL.hand.y, 7, soft);
    drawLimb(ctx, shoulder.x + 5, shoulder.y, armR.elbow.x + 4, armR.elbow.y, 9, lime);
    drawLimb(ctx, armR.elbow.x + 4, armR.elbow.y, armR.hand.x + 4, armR.hand.y, 8, lime);
    ctx.fillStyle = lime;
    ctx.beginPath(); ctx.arc(head.x, head.y, 15, 0, Math.PI * 2); ctx.fill();
    if (p.bar === 'shoulder') {
      drawLimb(ctx, shoulder.x - 70, shoulder.y - 8, shoulder.x + 70, shoulder.y - 8, 6, '#0b0d10');
      ctx.fillStyle = lime;
      ctx.beginPath(); ctx.arc(shoulder.x - 74, shoulder.y - 8, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(shoulder.x + 74, shoulder.y - 8, 8, 0, Math.PI * 2); ctx.fill();
    } else if (p.bar === 'hand') {
      const y = (armL.hand.y + armR.hand.y) / 2;
      drawLimb(ctx, armR.hand.x - 62, y, armR.hand.x + 62, y, 6, '#0b0d10');
      ctx.fillStyle = lime;
      ctx.beginPath(); ctx.arc(armR.hand.x - 66, y, 8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(armR.hand.x + 66, y, 8, 0, Math.PI * 2); ctx.fill();
    } else if (p.dumbbell) {
      ctx.fillStyle = lime;
      [armL.hand, armR.hand].forEach((h, i) => {
        ctx.beginPath(); ctx.roundRect ? ctx.roundRect(h.x - 7, h.y - 9, 14, 18, 4) : ctx.rect(h.x - 7, h.y - 9, 14, 18);
        ctx.fill();
      });
    }
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.beginPath(); ctx.moveTo(40, 268); ctx.lineTo(440, 268); ctx.stroke();
    ctx.fillStyle = 'rgba(201,255,63,0.1)';
    ctx.beginPath(); ctx.ellipse(235, 250, 95, 18, 0, 0, Math.PI * 2); ctx.fill();
  }

  function stopExerciseDemo() {
    if (UI.demo && UI.demo.raf) cancelAnimationFrame(UI.demo.raf);
    UI.demo = null;
  }

  function startExerciseDemo(pattern) {
    stopExerciseDemo();
    const canvas = document.getElementById('demo-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const family = DEMO_FAMILY[pattern] || 'push';
    const duration = 2200;
    UI.demo = { family, duration, playing: true, phase: 0, start: performance.now(), raf: 0 };
    const loop = (now) => {
      if (!UI.demo) return;
      const phase = ((now - UI.demo.start) % duration) / duration;
      UI.demo.phase = phase;
      drawDemoFigure(ctx, UI.demo.family, phase);
      if (UI.demo.playing) UI.demo.raf = requestAnimationFrame(loop);
    };
    UI.demo.raf = requestAnimationFrame(loop);
    const btn = document.querySelector('[data-action="toggle-demo"]');
    if (btn) btn.textContent = '暂停';
  }

  function toggleExerciseDemo() {
    if (!UI.demo) return;
    if (UI.demo.playing) {
      UI.demo.playing = false;
      if (UI.demo.raf) cancelAnimationFrame(UI.demo.raf);
      const canvas = document.getElementById('demo-canvas');
      if (canvas) drawDemoFigure(canvas.getContext('2d'), UI.demo.family, UI.demo.phase);
      const btn = document.querySelector('[data-action="toggle-demo"]');
      if (btn) btn.textContent = '继续';
      return;
    }
    UI.demo.playing = true;
    UI.demo.start = performance.now() - UI.demo.phase * UI.demo.duration;
    const canvas = document.getElementById('demo-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const duration = UI.demo.duration;
    const loop = (now) => {
      if (!UI.demo || !UI.demo.playing) return;
      const phase = ((now - UI.demo.start) % duration) / duration;
      UI.demo.phase = phase;
      drawDemoFigure(ctx, UI.demo.family, phase);
      UI.demo.raf = requestAnimationFrame(loop);
    };
    UI.demo.raf = requestAnimationFrame(loop);
    const btn = document.querySelector('[data-action="toggle-demo"]');
    if (btn) btn.textContent = '暂停';
  }

  function stopExerciseMedia() {
    UI.demo = null;
  }

  function startExerciseMedia(id) {
    stopExerciseMedia();
    if (!MEDIA[id]) return;
    UI.demo = { id, playing: true };
    const media = document.querySelector('.demo-media');
    if (media) media.classList.remove('paused');
    const btn = media && media.querySelector('[data-action="toggle-demo"]');
    if (btn) btn.textContent = '暂停';
  }

  function toggleExerciseMedia() {
    const media = document.querySelector('.demo-media');
    if (!media) return;
    const paused = media.classList.toggle('paused');
    if (UI.demo) UI.demo.playing = !paused;
    const btn = media.querySelector('[data-action="toggle-demo"]');
    if (btn) btn.textContent = paused ? '继续' : '暂停';
  }

  function videoLinks(ex) {
    return {
      youtube: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${ex.en} exercise form`)}`,
      bilibili: `https://search.bilibili.com/all?keyword=${encodeURIComponent(`${ex.n} 动作教学`)}`
    };
  }

  const TRAJECTORY = {
    bench: { d: 'M252 218 C240 176 234 118 240 76', start: [252, 218], end: [240, 76], track: '杠铃 / 哑铃', label: '胸部 → 推起锁定', note: '器械从胸骨下缘上方推到肩关节正上方，路径略向头部方向。' },
    incline: { d: 'M250 214 C272 174 292 126 304 88', start: [250, 214], end: [304, 88], track: '杠铃 / 哑铃', label: '上胸 → 斜上方锁定', note: '沿上斜凳角度推起，器械回到肩关节上方。' },
    pushup: { d: 'M240 170 C240 200 240 222 240 240', start: [240, 170], end: [240, 240], track: '胸口', label: '胸口下降 → 推起', note: '双手固定，胸口垂直下降再推回，身体保持一条直线。' },
    fly: { d: 'M145 156 C185 112 295 112 335 156', start: [145, 156], end: [335, 156], track: '双手', label: '两侧 → 胸前合拢', note: '手肘角度固定，双手沿弧线在胸前合拢。' },
    overhead: { d: 'M240 188 C234 136 234 88 240 48', start: [240, 188], end: [240, 48], track: '杠铃 / 哑铃', label: '肩部 → 头顶锁定', note: '器械从锁骨上方推到头顶正上方，头部略后让出路径。' },
    pike: { d: 'M240 172 C240 198 240 220 240 244', start: [240, 172], end: [240, 244], track: '头部', label: '头部下降 → 推起', note: '臀部保持高位，头部向双手之间下降再推回。' },
    pulldown: { d: 'M240 54 C244 104 248 146 244 184', start: [240, 54], end: [244, 184], track: '横杆', label: '头顶 → 上胸', note: '横杆从头顶上方拉到上胸，肘部向下后方。' },
    pullup: { d: 'M240 216 C240 166 240 112 240 66', start: [240, 216], end: [240, 66], track: '胸口', label: '悬垂 → 胸口接近单杠', note: '双手固定，身体整体向上，胸口靠近单杠。' },
    row: { d: 'M148 190 C210 184 270 166 318 148', start: [148, 190], end: [318, 148], track: '手肘 / 器械', label: '前方伸展 → 拉向腹部', note: '手肘沿身体侧面拉向髋部，肩胛先后缩。' },
    deadlift: { d: 'M236 238 C236 196 236 148 236 102', start: [236, 238], end: [236, 102], track: '杠铃', label: '地面 → 髋部锁定', note: '杠铃贴近小腿垂直上升，伸髋站直，不要绕开身体。' },
    squat: { d: 'M240 82 C204 144 204 212 240 236', start: [240, 82], end: [240, 236], track: '髋部', label: '站姿 → 下蹲 → 起身', note: '髋部向下后方移动，再沿相近路径起身；膝盖沿脚尖方向。' },
    lunge: { d: 'M240 104 C204 162 210 216 252 236', start: [240, 104], end: [252, 236], track: '髋部', label: '站姿 → 下沉 → 回位', note: '髋部垂直下沉，前膝沿脚尖方向，后膝接近地面。' },
    legpress: { d: 'M150 188 C222 188 300 168 354 142', start: [150, 188], end: [354, 142], track: '踏板', label: '屈膝 → 蹬起', note: '踏板沿器械轨道向前上方移动，膝盖不锁死。' },
    legext: { d: 'M226 222 C286 220 326 186 302 138', start: [226, 222], end: [302, 138], track: '脚踝', label: '屈膝 → 伸膝', note: '小腿绕膝关节伸展，脚踝沿弧线抬起。' },
    legcurl: { d: 'M250 222 C300 204 306 164 264 136', start: [250, 222], end: [264, 136], track: '脚跟', label: '伸膝 → 屈膝', note: '脚跟绕膝关节向臀部方向卷起。' },
    calf: { d: 'M240 228 C240 204 240 182 240 160', start: [240, 228], end: [240, 160], track: '脚跟', label: '下沉 → 提踵', note: '脚跟垂直上提，前脚掌固定，顶端停1秒。' },
    hipthrust: { d: 'M240 224 C240 184 240 152 240 128', start: [240, 224], end: [240, 128], track: '髋部', label: '臀部下沉 → 伸髋锁定', note: '骨盆向上移动到躯干水平，肋骨保持下沉。' },
    abduction: { d: 'M236 196 C274 188 306 180 334 174', start: [236, 196], end: [334, 174], track: '膝盖', label: '并拢 → 向外打开', note: '膝盖沿器械轨道向外打开，骨盆保持中立。' },
    kickback: { d: 'M218 200 C266 204 310 208 346 198', start: [218, 200], end: [346, 198], track: '脚踝', label: '屈髋 → 向后伸髋', note: '工作腿向后伸展，腰椎保持中立。' },
    curl: { d: 'M188 222 C146 190 146 128 188 102', start: [188, 222], end: [188, 102], track: '手腕', label: '手臂伸直 → 弯举', note: '手腕绕肘关节向上画弧，手肘固定在体侧。' },
    pushdown: { d: 'M240 90 C240 138 240 188 240 224', start: [240, 90], end: [240, 224], track: '手柄', label: '屈肘 → 伸直下压', note: '手肘固定，手柄垂直向下到手臂伸直。' },
    skull: { d: 'M240 96 C198 112 186 154 216 186', start: [240, 96], end: [216, 186], track: '手腕', label: '屈肘 → 头后伸展', note: '上臂固定，前臂绕肘关节向头后下放再伸直。' },
    lateral: { d: 'M188 212 C130 186 112 146 140 116', start: [188, 212], end: [140, 116], track: '手腕', label: '体侧 → 肩高', note: '手腕沿身体侧面弧线抬到肩高，手肘领先。' },
    frontraise: { d: 'M190 212 C190 170 204 132 244 116', start: [190, 212], end: [244, 116], track: '手腕', label: '体前 → 肩高', note: '手腕从体前向上抬到肩高，避免腰部后仰。' },
    rearfly: { d: 'M188 174 C142 160 122 136 136 108', start: [188, 174], end: [136, 108], track: '手腕', label: '胸前 → 两侧打开', note: '手臂向两侧打开，肩胛保持稳定。' },
    uprightrow: { d: 'M190 220 C196 178 204 146 216 120', start: [190, 220], end: [216, 120], track: '手肘', label: '手臂下垂 → 提至胸口', note: '手肘沿身体向上提，手腕保持在肘部下方。' },
    shrug: { d: 'M240 172 C240 154 240 142 240 132', start: [240, 172], end: [240, 132], track: '肩峰', label: '下沉 → 耸肩', note: '肩膀垂直向上提，不滚动肩关节。' },
    crunch: { d: 'M154 202 C198 166 258 160 306 182', start: [154, 202], end: [306, 182], track: '胸骨', label: '仰卧 → 卷腹', note: '胸骨向骨盆方向卷曲，腰椎保持贴地。' },
    legraise: { d: 'M206 222 C238 174 272 142 306 120', start: [206, 222], end: [306, 120], track: '脚踝', label: '腿伸直 → 抬起', note: '骨盆后倾，双腿沿弧线抬向胸口。' },
    rotation: { d: 'M154 160 C214 128 300 128 354 160', start: [154, 160], end: [354, 160], track: '胸骨', label: '一侧 → 旋转到另一侧', note: '胸口带动躯干旋转，骨盆尽量稳定。' },
    deadbug: { d: 'M188 184 C150 166 126 154 104 144', start: [188, 184], end: [104, 144], track: '对侧手脚', label: '起始 → 伸展', note: '对侧手脚缓慢伸展，腰部保持贴地。' },
    abwheel: { d: 'M240 188 C190 202 148 218 112 236', start: [240, 188], end: [112, 236], track: '健腹轮', label: '跪姿 → 向前滚动 → 拉回', note: '轮子沿地面向前，骨盆后倾，腰部不塌。' },
    carry: { d: 'M168 160 C226 160 292 160 352 160', start: [168, 160], end: [352, 160], track: '身体重心', label: '起点 → 向前行走', note: '躯干保持直立，重心沿行进方向平移。' },
    walk: { d: 'M218 224 C258 164 300 164 342 224', start: [218, 224], end: [342, 224], track: '脚踝', label: '支撑 → 摆动 → 落地', note: '脚踝沿椭圆轨迹交替摆动，落地在重心附近。' },
    rower: { d: 'M150 188 C220 180 300 166 352 146', start: [150, 188], end: [352, 146], track: '手柄', label: '前伸 → 拉向腹部', note: '腿蹬、身体后倾、手臂拉，回程反向。' },
    bike: { d: 'M180 210 C240 150 300 210 240 240 C200 250 170 230 180 210', start: [180, 210], end: [240, 240], track: '脚踏', label: '踩踏圆周', note: '脚踏沿圆周运动，膝盖保持与脚尖同向。' },
    jump: { d: 'M240 234 C240 210 240 190 240 170', start: [240, 234], end: [240, 170], track: '脚踝', label: '落地 → 轻跳', note: '前脚掌轻落地，跳跃高度保持很小。' },
    pullover: { d: 'M240 118 C194 104 174 128 184 166', start: [240, 118], end: [184, 166], track: '双手', label: '头后拉伸 → 拉回', note: '手臂沿头后弧线移动，肩胛保持稳定。' },
    backext: { d: 'M240 172 C208 150 198 128 210 106', start: [240, 172], end: [210, 106], track: '胸骨', label: '屈髋 → 伸髋起身', note: '躯干以髋部为轴抬起，腰椎不过伸。' },
    facepull: { d: 'M320 150 C278 142 242 138 214 136', start: [320, 150], end: [214, 136], track: '绳端', label: '前方 → 拉向面部', note: '绳端拉向额头两侧，同时外旋肩关节。' },
    mobility: { d: 'M188 222 C224 154 266 154 302 222', start: [188, 222], end: [302, 222], track: '活动关节', label: '无痛活动范围', note: '沿关节允许的活动范围缓慢移动，不追求疼痛幅度。' },
    plank: { d: 'M190 205 C230 198 270 198 310 205', start: [190, 205], end: [310, 205], track: '躯干', label: '等长支撑（无位移）', note: '等长动作没有明显行程，保持身体一条直线并均匀呼吸。' }
  };

  function trajectoryKeyFor(ex) {
    const id = ex.id;
    const pat = ex.pat;
    if (pat === 'horizontal_push') return id.includes('pushup') || id.includes('dips') ? 'pushup' : id.includes('fly') ? 'fly' : 'bench';
    if (pat === 'incline_push') return 'incline';
    if (pat === 'vertical_push') return id.includes('pike') || id.includes('handstand') ? 'pike' : 'overhead';
    if (pat === 'vertical_pull') return ex.eq === '自重' ? 'pullup' : 'pulldown';
    if (pat === 'horizontal_pull') return 'row';
    if (pat === 'chest_iso') return id.includes('fly') ? 'fly' : 'pullover';
    if (pat === 'lat_iso') return 'pullover';
    if (pat === 'squat') return id.includes('legpress') ? 'legpress' : 'squat';
    if (pat === 'single_leg') return 'lunge';
    if (pat === 'hinge') return id.includes('goodmorning') || id.includes('backext') ? 'backext' : 'deadlift';
    if (pat === 'glute') {
      if (id.includes('abduction')) return 'abduction';
      if (id.includes('kick')) return 'kickback';
      return 'hipthrust';
    }
    if (pat === 'leg_ext') return 'legext';
    if (pat === 'leg_curl') return 'legcurl';
    if (pat === 'calf') return 'calf';
    if (pat === 'bicep') return 'curl';
    if (pat === 'tricep') return id.includes('skull') || id.includes('overhead') ? 'skull' : 'pushdown';
    if (pat === 'lateral') return 'lateral';
    if (pat === 'front_delt') return 'frontraise';
    if (pat === 'rear_delt') return 'rearfly';
    if (pat === 'shrug') return 'shrug';
    if (pat === 'core') {
      if (id.includes('plank')) return 'plank';
      if (id.includes('crunch')) return 'crunch';
      if (id.includes('legraise') || id.includes('hanging')) return 'legraise';
      if (id.includes('rotation') || id.includes('russian') || id.includes('woodchop') || id.includes('pallof')) return 'rotation';
      if (id.includes('deadbug') || id.includes('birddog')) return 'deadbug';
      if (id.includes('abwheel') || id.includes('rollout')) return 'abwheel';
      if (id.includes('carry') || id.includes('farmer')) return 'carry';
      return 'crunch';
    }
    if (pat === 'carry') return 'carry';
    if (pat === 'cardio') {
      if (id.includes('rower')) return 'rower';
      if (id.includes('bike')) return 'bike';
      if (id.includes('jumprope')) return 'jump';
      return 'walk';
    }
    if (pat === 'mobility') return 'mobility';
    return null;
  }

  function trajectoryHTML(ex) {
    const key = trajectoryKeyFor(ex);
    const t = key ? TRAJECTORY[key] : null;
    if (!t) {
      return `<div class="trajectory-card trajectory-pending"><div class="trajectory-head"><div><span class="eyebrow">Full Range Path</span><b>完整行程轨迹</b></div><span>待核对</span></div><p class="trajectory-note">该动作的逐条轨迹尚未核对，暂不显示通用曲线，避免误导。</p></div>`;
    }
    const id = `traj-${String(ex.id).replace(/[^a-zA-Z0-9_-]/g, '')}`;
    return `<div class="trajectory-card">
      <div class="trajectory-head"><div><span class="eyebrow">Full Range Path</span><b>完整行程轨迹 · ${esc(t.track)}</b></div><span>${esc(t.label)}</span></div>
      <div class="trajectory-stage">
        <svg viewBox="0 0 480 280" aria-label="${esc(ex.n)} 主要移动轨迹">
          <defs>
            <marker id="arrow-${id}" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="#c9ff3f"/></marker>
          </defs>
          <path d="${t.d}" fill="none" stroke="rgba(201,255,63,.18)" stroke-width="20" stroke-linecap="round"/>
          <path id="${id}" d="${t.d}" fill="none" stroke="#c9ff3f" stroke-width="2.5" stroke-dasharray="6 7" stroke-linecap="round" marker-end="url(#arrow-${id})"/>
          <circle cx="${t.start[0]}" cy="${t.start[1]}" r="7" fill="#ff9a4a"/>
          <circle cx="${t.end[0]}" cy="${t.end[1]}" r="7" fill="#c9ff3f"/>
          <circle r="4.5" fill="#f2f4ee">
            <animateMotion dur="2.4s" repeatCount="indefinite" rotate="auto">
              <mpath href="#${id}"/>
            </animateMotion>
          </circle>
          <text x="${t.start[0] + 12}" y="${t.start[1] + 4}" fill="#ff9a4a" font-size="9" font-family="sans-serif">起点</text>
          <text x="${t.end[0] + 12}" y="${t.end[1] + 4}" fill="#c9ff3f" font-size="9" font-family="sans-serif">终点</text>
        </svg>
      </div>
      <p class="trajectory-note">${esc(t.note)} 轨迹为标准化动作路径，不是从个人视频逐帧提取；关节角度、握距和幅度以动作要领为准。</p>
    </div>`;
  }

  function resetAnalysis() {
    if (UI.analysis.videoUrl) URL.revokeObjectURL(UI.analysis.videoUrl);
    UI.analysis = {
      exId: null,
      videoUrl: '',
      fileName: '',
      analyzing: false,
      progress: 0,
      result: null,
      error: '',
      saved: false
    };
  }

  function refreshExerciseSheet(scrollToResult = false) {
    const ex = BY_ID.get(UI.analysis.exId);
    if (!ex) return;
    openSheet(exerciseSheetHTML(ex));
    startExerciseMedia(ex.id);
    if (scrollToResult) {
      requestAnimationFrame(() => {
        const result = document.querySelector('.analysis-result');
        if (result) result.scrollIntoView({ block: 'start', behavior: 'smooth' });
      });
    }
  }

  function analysisResultHTML(ex) {
    const r = UI.analysis.result;
    if (!r) return '';
    const pts = (r.path || []).map((p, i) => `${i ? 'L' : 'M'}${(50 + p.x * 120).toFixed(1)},${(120 - p.y * 120).toFixed(1)}`).join(' ');
    const scoreTone = r.score >= 75 ? 'high' : r.score >= 55 ? 'mid' : 'low';
    return `<div class="analysis-result">
      <div class="analysis-result-head">
        <div><div class="eyebrow">Personal Motion Check</div><h3>${esc(ex.n)} · 个人轨迹</h3></div>
        <div class="analysis-score ${scoreTone}"><b>${r.score}</b><span>/100 参考分</span></div>
      </div>
      <div class="analysis-metrics">
        <div><b>${r.reps}</b><span>检测次数</span></div>
        <div><b>${r.rom}°</b><span>${esc(r.label)}幅度</span></div>
        <div><b>${r.symmetry ? `${r.symmetry}°` : '—'}</b><span>左右差异</span></div>
        <div><b>${r.quality}%</b><span>姿态质量</span></div>
      </div>
      <div class="personal-path">
        <div class="personal-path-head"><span>个人轨迹</span><span>绿色实线 · 标准方向见上方轨迹栏</span></div>
        <svg viewBox="0 0 220 140" aria-label="个人动作轨迹">
          <path d="M110 124 L110 18" stroke="rgba(255,154,74,.5)" stroke-width="1.5" stroke-dasharray="4 5" fill="none"/>
          <path d="${pts}" stroke="#c9ff3f" stroke-width="2.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
          ${(r.path || []).filter((p, i) => i === 0 || i === r.path.length - 1).map((p) => `<circle cx="${(50 + p.x * 120).toFixed(1)}" cy="${(120 - p.y * 120).toFixed(1)}" r="3" fill="#c9ff3f"/>`).join('')}
        </svg>
        <p>${r.pathRange.x < r.pathRange.y ? '主要沿纵向移动' : '主要沿横向/弧线移动'} · 视频帧 ${r.frames} · 平均每次 ${r.avgRepTime}s</p>
      </div>
      <div class="analysis-advice">
        ${r.advice.map((a) => `<p>${esc(a)}</p>`).join('')}
      </div>
      <div class="analysis-result-actions">
        <button class="btn btn-sm" data-action="save-analysis">${UI.analysis.saved ? '已保存分析摘要' : '保存分析摘要'}</button>
        <button class="btn btn-sm btn-ghost" data-action="analyze-form-video">重新分析</button>
      </div>
      <p class="analysis-note">视频只在当前浏览器本地分析，不上传、不保存；保存的只是动作摘要和分数。</p>
    </div>`;
  }

  function personalVideoHTML(ex) {
    const a = UI.analysis;
    return `<div class="analysis-card">
      <div class="analysis-card-head"><div><span class="eyebrow">Personal Video · Local Pose</span><b>个人视频轨迹分析</b></div><span>本地处理</span></div>
      <p class="analysis-intro">拍摄侧面全身、手机固定、光线充足。系统会逐帧提取肩、肘、髋、膝、踝，比较活动范围、左右差异、节奏和主要移动点。</p>
      <input type="file" id="form-video" accept="video/*" capture="environment" hidden>
      ${a.videoUrl ? `<video id="form-video-preview" class="form-video-preview" src="${a.videoUrl}" controls playsinline preload="metadata"></video>` : `<button class="analysis-drop" data-action="pick-form-video">${ICONS.camera}<b>拍摄 / 上传训练视频</b><span>建议 5–20 秒，包含完整一次动作</span></button>`}
      <div class="analysis-actions">
        <button class="btn btn-sm" data-action="analyze-form-video" ${!a.videoUrl || a.analyzing ? 'disabled' : ''}>${a.analyzing ? '<span class="spinner"></span>分析中…' : `${ICONS.play}分析动作`}</button>
        ${a.videoUrl ? `<button class="btn btn-sm btn-ghost" data-action="reset-form-video" ${a.analyzing ? 'disabled' : ''}>重选视频</button>` : ''}
      </div>
      ${a.analyzing ? `<div class="analysis-progress" id="analysis-progress"><div class="bar"><i style="width:${Math.round(a.progress * 100)}%"></i></div><span>${Math.round(a.progress * 100)}% · 正在提取关节点</span></div>` : ''}
      ${a.error ? `<div class="photo-error">${ICONS.alert}<div>${esc(a.error)}</div></div>` : ''}
      ${analysisResultHTML(ex)}
    </div>`;
  }

  function waitForVideoMetadata(video) {
    if (video.readyState >= 1 && Number.isFinite(video.duration) && video.duration > 0) return Promise.resolve();
    return new Promise((resolve, reject) => {
      let done = false;
      const finish = () => {
        if (done) return;
        done = true;
        clearTimeout(timer);
        video.removeEventListener('loadedmetadata', finish);
        resolve();
      };
      const timer = setTimeout(() => {
        if (!done) {
          done = true;
          reject(new Error('视频加载超时，请换一个 MP4/MOV 文件'));
        }
      }, 12000);
      video.addEventListener('loadedmetadata', finish, { once: true });
    });
  }

  function handleFormVideo(file) {
    if (!file) return;
    if (!String(file.type || '').startsWith('video/')) {
      UI.analysis.error = '请选择视频文件';
      refreshExerciseSheet();
      return;
    }
    if (file.size > 300 * 1024 * 1024) {
      UI.analysis.error = '视频超过 300MB，请截取更短的一段';
      refreshExerciseSheet();
      return;
    }
    if (UI.analysis.videoUrl) URL.revokeObjectURL(UI.analysis.videoUrl);
    UI.analysis.videoUrl = URL.createObjectURL(file);
    UI.analysis.fileName = file.name || 'training-video';
    UI.analysis.result = null;
    UI.analysis.error = '';
    UI.analysis.progress = 0;
    UI.analysis.saved = false;
    refreshExerciseSheet();
  }

  async function analyzePersonalVideo() {
    const ex = BY_ID.get(UI.analysis.exId);
    if (!ex || !UI.analysis.videoUrl || UI.analysis.analyzing) return;
    UI.analysis.analyzing = true;
    UI.analysis.progress = 0;
    UI.analysis.error = '';
    UI.analysis.result = null;
    UI.analysis.saved = false;
    refreshExerciseSheet();
    const video = document.getElementById('form-video-preview');
    if (!video) {
      UI.analysis.analyzing = false;
      UI.analysis.error = '视频预览未准备好，请重选视频';
      refreshExerciseSheet();
      return;
    }
    try {
      await waitForVideoMetadata(video);
      const pose = await import(new URL('assets/pose.js?v=22', location.href).href);
      const result = await pose.analyzeVideo(video, ex, (p) => {
        UI.analysis.progress = p;
        const bar = document.querySelector('#analysis-progress .bar i');
        const text = document.querySelector('#analysis-progress span');
        if (bar) bar.style.width = `${Math.round(p * 100)}%`;
        if (text) text.textContent = `${Math.round(p * 100)}% · 正在提取关节点`;
      });
      UI.analysis.result = result;
    } catch (error) {
      UI.analysis.error = error && error.message ? error.message : '视频分析失败，请换一个视频重试';
    } finally {
      UI.analysis.analyzing = false;
      refreshExerciseSheet(true);
    }
  }

  function saveAnalysis() {
    const ex = BY_ID.get(UI.analysis.exId);
    const r = UI.analysis.result;
    if (!ex || !r || UI.analysis.saved) return;
    if (!Array.isArray(S.analyses)) S.analyses = [];
    S.analyses.push({
      id: `analysis-${Date.now()}`,
      date: isoDate(),
      exerciseId: ex.id,
      exercise: ex.n,
      score: r.score,
      reps: r.reps,
      rom: r.rom,
      symmetry: r.symmetry,
      label: r.label
    });
    save();
    UI.analysis.saved = true;
    toast('动作分析摘要已保存', 'ok');
    refreshExerciseSheet(true);
  }

  function exerciseSheetHTML(e) {
    const limited = e.avoid.filter((a) => S.profile.limitations.includes(a));
    const alts = (e.alt || []).map((id) => BY_ID.get(id)).filter(Boolean);
    return `
      <div class="sheet-backdrop">
        <div class="sheet" role="dialog" aria-modal="true" aria-label="${esc(e.n)} 详情" data-stop="1">
          <div class="sheet-grab"></div>
          <div class="sheet-head">
            <div>
              <div class="eyebrow">${esc(e.g)} · ${esc(e.eq)}</div>
              <div class="sheet-title">动作详情</div>
            </div>
            <button class="sheet-close" data-action="close-sheet" aria-label="关闭">${ICONS.close}</button>
          </div>
          <div class="sheet-body">
            <div class="detail-top">
              ${bodyMap(e.mp, e.ms)}
              <div>
                <div class="detail-title">${esc(e.n)}</div>
                <div class="detail-en">${esc(e.en)}</div>
                <div class="detail-tags">
                  <span class="mini-tag hot">${esc(e.p)}</span>
                  ${(e.tags || []).map((t) => `<span class="mini-tag">${esc(t)}</span>`).join('')}
                </div>
              </div>
            </div>
            <div class="detail-stats">
              <div class="detail-stat"><b>${e.sfr}<span style="font-size:8px;color:var(--muted)">/10</span></b><span>刺激 / 疲劳比</span></div>
              <div class="detail-stat"><b>${difficultyLabel(e.lv)}</b><span>动作难度</span></div>
              <div class="detail-stat"><b>${esc(e.t)}</b><span>动作类型</span></div>
            </div>
            <div class="video-panel">
              <div class="video-panel-copy"><b>视频示范检索</b><span>在视频平台搜索“${esc(e.en)} / ${esc(e.n)}”的标准示范。外链，版权归原作者。</span></div>
              <div class="video-panel-actions">
                <a class="btn btn-sm btn-ghost" href="${videoLinks(e).youtube}" target="_blank" rel="noopener noreferrer">${ICONS.play}YouTube</a>
                <a class="btn btn-sm btn-ghost" href="${videoLinks(e).bilibili}" target="_blank" rel="noopener noreferrer">${ICONS.external}B 站</a>
              </div>
            </div>
            ${MEDIA[e.id] ? `<div class="demo-media">
              <div class="demo-frame-wrap">
                <img class="demo-frame" src="${MEDIA[e.id].images[0]}" alt="${esc(e.n)} 开始位" loading="lazy">
                <img class="demo-frame" src="${MEDIA[e.id].images[1]}" alt="${esc(e.n)} 结束位" loading="lazy">
              </div>
              <div class="demo-media-bar"><span>标准动作图 · 开始位 / 结束位</span><button class="demo-toggle" data-action="toggle-demo">暂停</button></div>
              <p class="demo-media-source">素材：${esc(MEDIA[e.id].source)} · Public Domain / Unlicense · <a href="${MEDIA[e.id].sourceUrl}" target="_blank" rel="noopener noreferrer">查看原始库</a></p>
            </div>` : `<div class="demo-unavailable">${ICONS.info}<div><b>暂无经过核对的标准演示</b><span>不显示通用动画，避免误导。请以动作要领、替代动作或教练视频为准。</span></div></div>`}
            ${trajectoryHTML(e)}
            ${personalVideoHTML(e)}
            ${limited.length ? `<div class="warn-box" style="margin-top:12px">${ICONS.alert}<div>你的资料中标记了「${limited.join('、')}」限制。这个动作可能不适合，建议先选择替代动作，或让康复/医疗专业人员评估。</div></div>` : ''}

            <div class="detail-section">
              <div class="detail-section-title">${ICONS.check}动作要领</div>
              <ol class="cue-list">${e.cues.map((c) => `<li>${esc(c)}</li>`).join('')}</ol>
            </div>
            <div class="detail-section">
              <div class="detail-section-title" style="color:var(--red)">${ICONS.alert}常见错误</div>
              <ul class="error-list">${e.err.map((c) => `<li>${esc(c)}</li>`).join('')}</ul>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">${ICONS.swap}替代动作</div>
              <div class="alt-chips">
                ${alts.map((a) => `<button class="alt-chip" data-action="open-ex" data-id="${a.id}">${esc(a.n)} · ${esc(a.eq)}</button>`).join('') || '<span class="alt-chip">暂无同器械替代</span>'}
              </div>
            </div>
            <div class="detail-section">
              <div class="detail-section-title">${ICONS.info}推荐组次</div>
              <div class="card card-flat" style="padding:12px;font-size:10.5px;color:var(--muted);line-height:1.7">
                增肌：${e.t === '复合' ? '3–4 组 × 6–10 次' : '2–3 组 × 10–15 次'}，RIR 1–2；力量：3–5 组 × 3–6 次，RIR 2–3；减脂：2–3 组 × 10–15 次，RIR 1–2。具体组次会按你的计划自动调整。
              </div>
            </div>
            <div class="detail-actions">
              <button class="btn" data-action="add-to-plan" data-id="${e.id}">${ICONS.plus}加入当前训练日</button>
              <button class="btn btn-ghost" data-action="close-sheet">关闭</button>
            </div>
          </div>
        </div>
      </div>`;
  }

  function openExercise(id) {
    const e = BY_ID.get(id);
    if (!e) return;
    resetAnalysis();
    UI.analysis.exId = id;
    openSheet(exerciseSheetHTML(e));
    startExerciseMedia(e.id);
  }

  function openSheet(html) {
    UI.sheet = html;
    sheetRoot.innerHTML = html;
    document.body.classList.add('is-locked');
    const sheet = sheetRoot.querySelector('.sheet');
    if (sheet) sheet.scrollTop = 0;
  }

  function closeSheet() {
    stopExerciseMedia();
    resetAnalysis();
    UI.sheet = null;
    sheetRoot.innerHTML = '';
    if (!UI.session && !onboardRoot.innerHTML) document.body.classList.remove('is-locked');
  }

  function addToPlan(exId) {
    if (!S.plan) {
      toast('请先在「计划」生成训练方案');
      return;
    }
    const day = S.plan.days[UI.planDay] || S.plan.days[0];
    if (!day) return;
    const ex = BY_ID.get(exId);
    if (!ex) return;
    day.slots.push({
      exId,
      sets: 3,
      reps: ex.t === '复合' ? '8–10' : '10–15',
      rir: '1–2',
      rest: ex.t === '复合' ? 120 : 75,
      role: 'iso',
      pat: ex.pat,
      g: ex.g
    });
    save();
    closeSheet();
    toast(`已加入「${day.title}」`, 'ok');
    render();
  }

  /* ---------- Plan ---------- */

  function planView() {
    const p = S.profile;
    const goal = GOALS[p.goal] || GOALS.hypertrophy;
    if (!S.plan) {
      return `
        <div class="page-head">
          <div><div class="eyebrow">Your Program</div><h1 class="page-title">训练计划</h1><p class="page-sub">根据目标、经验、器械和恢复条件，生成一周可执行的力量训练安排。</p></div>
        </div>
        <div class="plan-empty">
          <div class="plan-empty-icon">${ICONS.calendar}</div>
          <h2>还没有训练方案</h2>
          <p>花 60 秒填写身体数据和训练条件，系统会为你安排动作、组数、次数、RIR 和组间休息。</p>
          <button class="btn" data-action="open-onboarding">${ICONS.spark}开始定制</button>
        </div>`;
    }

    const plan = S.plan;
    if (UI.planDay >= plan.days.length) UI.planDay = 0;
    const day = plan.days[UI.planDay];
    const vol = planVolume(plan);
    const weeklySets = planTotalSets(plan);
    const weeklyMinutes = planTotalMinutes(plan);
    const avgSfr = planAvgSfr(plan);

    return `
      <div class="page-head">
        <div><div class="eyebrow">Your Program</div><h1 class="page-title">训练计划</h1><p class="page-sub">${esc(EQUIPMENT[p.equipment].label)} · 每周 ${p.days} 天 · 每次约 ${p.minutes} 分钟</p></div>
        <button class="icon-btn" data-action="regen-plan" aria-label="重新生成计划">${ICONS.refresh}</button>
      </div>
      <div class="plan-hero">
        <div class="plan-hero-top">
          <div>
            <div class="plan-name">${esc(goal.label)} · ${p.days} 日计划</div>
            <div class="plan-sub">${esc(EXPERIENCE[p.experience].label)} · 目标每周 ${p.weeklyRate}% 体重变化 · ${esc(DIETS[p.diet].label)}</div>
          </div>
          <span class="goal-badge">${ICONS.target}${esc(goal.label)}</span>
        </div>
        <div class="plan-kpis">
          <div class="plan-kpi"><b class="num">${weeklySets}</b><span>每周总组数</span></div>
          <div class="plan-kpi"><b class="num">${Math.round(weeklyMinutes / plan.days.length)}<small style="font-size:9px;color:var(--muted)"> 分</small></b><span>平均单次</span></div>
          <div class="plan-kpi"><b class="num">${avgSfr}</b><span>平均效率</span></div>
        </div>
      </div>

      ${p.limitations.length ? `<div class="warn-box" style="margin-top:12px">${ICONS.alert}<div>已按你的限制（${p.limitations.map(esc).join('、')}）筛掉高风险动作。筛选不等于康复诊断；如果动作引起疼痛，请停止并咨询医生或康复师，不要为了凑容量硬练。</div></div>` : ''}

      <div class="section">
        <div class="day-tabs" role="tablist" aria-label="训练日">
          ${plan.days.map((d, i) => `<button class="day-tab ${i === UI.planDay ? 'active' : ''}" data-action="day-tab" data-day="${i}" role="tab" aria-selected="${i === UI.planDay}"><b>D${i + 1}</b><span>${esc(d.title)}</span></button>`).join('')}
        </div>
        <div class="day-card">
          <div class="day-card-head">
            <div>
              <h2>${esc(day.title)}</h2>
              <p>${day.slots.length} 个动作 · 约 ${dayMinutes(day)} 分钟 · 练完记得记录</p>
              <div class="day-focus">${day.focus.map((f) => `<span class="mini-tag">${esc(f)}</span>`).join('')}</div>
            </div>
            <button class="btn btn-sm" data-action="start-session" data-day="${UI.planDay}">${ICONS.play}开始</button>
          </div>
          <div>
            ${day.slots.map((slot, i) => {
              const ex = BY_ID.get(slot.exId);
              if (!ex) return '';
              return `
                <div class="plan-ex">
                  <div class="pe-index">${pad(i + 1)}</div>
                  <div class="pe-main" data-action="open-ex" data-id="${ex.id}">
                    <div class="pe-name">${esc(ex.n)}</div>
                    <div class="pe-meta"><b>${slot.sets} 组 × ${slot.reps}</b><span>RIR ${slot.rir}</span><span>休息 ${slot.rest}s</span><span>SFR ${ex.sfr}</span></div>
                  </div>
                  <div class="pe-actions">
                    <div class="stepper" aria-label="${esc(ex.n)} 组数">
                      <button data-action="set-minus" data-day="${UI.planDay}" data-idx="${i}" aria-label="减少组数">−</button>
                      <b>${slot.sets}</b>
                      <button data-action="set-plus" data-day="${UI.planDay}" data-idx="${i}" aria-label="增加组数">+</button>
                    </div>
                    <button class="swap-btn" data-action="swap-ex" data-day="${UI.planDay}" data-idx="${i}">${ICONS.swap}换一个</button>
                  </div>
                </div>`;
            }).join('')}
          </div>
        </div>
      </div>

      <div class="section">
        <div class="section-head"><h2 class="section-title">每周肌群容量</h2><span class="section-link">有效组 / 周</span></div>
        <div class="volume-card">
          <div class="volume-legend">
            <span class="legend-dot">推荐区间</span>
            <span class="legend-dot low">偏低</span>
            <span class="legend-dot high">偏高</span>
          </div>
          ${Object.entries(VOLUME_TARGET).map(([key, range]) => {
            const value = vol[key] || 0;
            const state = value < range[0] ? 'low' : value > range[1] ? 'high' : '';
            return `
              <div class="vol-row">
                <span class="vol-label">${key}</span>
                <div class="vol-track">
                  <div class="vol-target" style="left:${(range[0] / 25) * 100}%;width:${((range[1] - range[0]) / 25) * 100}%"></div>
                  <div class="vol-fill ${state}" style="width:${clamp((value / 25) * 100, 0, 100)}%"></div>
                </div>
                <span class="vol-val">${value}</span>
              </div>`;
          }).join('')}
          <p style="margin-top:13px;color:var(--muted-2);font-size:9.5px;line-height:1.6">仅统计直接训练组；卧推、划船等复合动作对手臂和核心的间接刺激未计入。推荐区间来自训练量剂量—反应研究与实践共识，不是硬性处方。若恢复、睡眠或关节状态不佳，优先降低组数或接近力竭的程度。时间紧时，某部位显示 0 可在训练末尾补 1–2 个孤立动作。</p>
        </div>
      </div>

      <div class="section">
        <div class="progression-card">
          <div class="prog-icon">${ICONS.bolt}</div>
          <div>
            <h3>渐进超负荷：用双重渐进</h3>
            <p>先在目标次数区间内把次数做满，且最后 1–2 组仍保留 1–2 次余力；达到区间上限后，下次增加 2.5–5% 重量，再把次数从区间下限重新开始。记录每一组，才看得见进步。</p>
          </div>
        </div>
      </div>

      <div class="plan-actions">
        <button class="btn" data-action="start-session" data-day="${UI.planDay}">${ICONS.play}开始 D${UI.planDay + 1}</button>
        <button class="btn btn-ghost" data-action="open-profile">${ICONS.user}调整资料</button>
      </div>
      <div style="height:12px"></div>
      <a class="research-teaser" href="#research" data-action="nav" data-view="research">
        <div><h3>这套计划的研究依据</h3><p>训练量 10–20 组/周、RIR 1–2、复合动作 2–3 分钟休息，以及蛋白质 1.6–2.2 g/kg。</p></div>
        <span class="btn btn-sm btn-ghost">查看</span>
      </a>`;
  }

  function swapExercise(dayIndex, slotIndex) {
    const day = S.plan && S.plan.days[dayIndex];
    const slot = day && day.slots[slotIndex];
    if (!slot) return;
    const current = BY_ID.get(slot.exId);
    if (!current) return;
    const available = EX.filter((e) => e.id !== current.id && e.g === current.g && equipmentAvailable(e.eq, S.profile) && !e.avoid.some((a) => S.profile.limitations.includes(a)));
    const samePattern = available.filter((e) => e.pat === current.pat);
    const pool = samePattern.length ? samePattern : available;
    if (!pool.length) {
      toast('同肌群暂无可替换动作');
      return;
    }
    const usedIds = new Set(day.slots.map((s) => s.exId));
    const fresh = pool.filter((e) => !usedIds.has(e.id));
    const next = (fresh.length ? fresh : pool)[Math.floor(Math.random() * (fresh.length ? fresh.length : pool.length))];
    slot.exId = next.id;
    slot.pat = next.pat;
    slot.g = next.g;
    save();
    toast(`已换成 ${next.n}`, 'ok');
    render();
  }

  /* ---------- Weight log ---------- */

  function chartLogs(range = UI.chartRange) {
    let logs = sortedLogs();
    if (range !== 'all') {
      const cutoff = daysAgoISO(Number(range) || 30);
      logs = logs.filter((l) => l.date >= cutoff);
    }
    return logs;
  }

  function weightChartSVG() {
    const logs = chartLogs();
    if (!logs.length) {
      return '<div class="empty-state" style="margin-top:14px">' + ICONS.chart + '<p>还没有体重记录。每天起床后、进食前称重，连续记录几周就能看到真实趋势。</p></div>';
    }
    const W = 360;
    const H = 180;
    const pad = { l: 30, r: 14, t: 18, b: 24 };
    const xs = logs.map((l) => parseDate(l.date).getTime());
    const ys = logs.map((l) => Number(l.weight));
    const goal = Number(S.profile.targetWeight);
    const showGoal = Number.isFinite(goal) && goal >= Math.min(...ys) - 5 && goal <= Math.max(...ys) + 5;
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const rawMin = Math.min(...ys, showGoal ? goal : Infinity);
    const rawMax = Math.max(...ys, showGoal ? goal : -Infinity);
    const padY = Math.max(0.7, (rawMax - rawMin) * 0.18);
    const minY = rawMin - padY;
    const maxY = rawMax + padY;
    const x = (v) => pad.l + ((v - minX) / (maxX - minX || 86400000)) * (W - pad.l - pad.r);
    const y = (v) => pad.t + ((maxY - v) / (maxY - minY || 1)) * (H - pad.t - pad.b);
    const pts = logs.map((l, i) => ({ x: x(xs[i]), y: y(Number(l.weight)), log: l }));
    const line = pts.map((p, i) => `${i ? 'L' : 'M'}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ');
    const area = `${line} L${pts[pts.length - 1].x.toFixed(1)},${H - pad.b} L${pts[0].x.toFixed(1)},${H - pad.b} Z`;
    const first = parseDate(logs[0].date).getTime();
    const regression = linreg(pts.map((p) => ({ x: (parseDate(p.log.date).getTime() - first) / 86400000, y: Number(p.log.weight) })));
    const trendY1 = y(regression.intercept);
    const trendY2 = y(regression.intercept + regression.slope * ((parseDate(logs[logs.length - 1].date).getTime() - first) / 86400000));
    const last = pts[pts.length - 1];
    const grid = [0, 1, 2, 3].map((i) => {
      const gy = pad.t + ((H - pad.t - pad.b) / 3) * i;
      const val = maxY - ((maxY - minY) / 3) * i;
      return `<line class="chart-gridline" x1="${pad.l}" y1="${gy}" x2="${W - pad.r}" y2="${gy}"/><text class="chart-label" x="2" y="${gy + 3}">${val.toFixed(1)}</text>`;
    }).join('');
    return `
      <svg class="weight-chart" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-label="体重变化曲线">
        <defs>
          <linearGradient id="weightFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#c9ff3f" stop-opacity=".22"/>
            <stop offset="100%" stop-color="#c9ff3f" stop-opacity="0"/>
          </linearGradient>
        </defs>
        ${grid}
        ${showGoal ? `<line class="chart-goal" x1="${pad.l}" y1="${y(goal)}" x2="${W - pad.r}" y2="${y(goal)}"/><text class="chart-label" x="${W - pad.r - 28}" y="${y(goal) - 4}" style="fill:var(--orange)">目标 ${goal}</text>` : ''}
        <path class="chart-area" d="${area}"/>
        <path class="chart-trend" d="M${pts[0].x},${trendY1} L${last.x},${trendY2}"/>
        <path class="chart-line" d="${line}"/>
        ${pts.map((p, i) => i === pts.length - 1 ? '' : `<circle class="chart-dot" cx="${p.x}" cy="${p.y}" r="2.1"/>`).join('')}
        <circle class="chart-dot-last" cx="${last.x}" cy="${last.y}" r="4"/>
        <circle class="chart-dot" cx="${last.x}" cy="${last.y}" r="2.4"/>
        <text class="chart-value-label" x="${Math.min(W - 32, last.x + 6)}" y="${Math.max(11, last.y - 7)}">${Number(last.log.weight).toFixed(1)}</text>
        <text class="chart-label" x="${pad.l}" y="${H - 6}">${fmtShortDate(logs[0].date)}</text>
        <text class="chart-label" x="${W - pad.r}" y="${H - 6}" text-anchor="end">${fmtShortDate(logs[logs.length - 1].date)}</text>
      </svg>`;
  }

  function bmiCategory(b) {
    if (b < 18.5) return '偏低';
    if (b < 24) return '正常';
    if (b < 28) return '偏高';
    return '较高';
  }

  function adaptiveAdvice() {
    const t = nutritionTargets();
    const trend = weightTrend();
    if (!trend) {
      return {
        title: '需要更多数据',
        body: `目前只有 ${sortedLogs().length} 次体重记录。连续记录 2–3 周、每周 3–7 次，用周平均变化判断 ${t.kcal} kcal 是否合适。`,
        tone: 'neutral'
      };
    }
    const rate = trend.weeklyPct;
    const target = Number(S.profile.weeklyRate) || 0.5;
    if (S.profile.goal === 'cut') {
      if (rate > -target * 0.4) return { title: '可以再收一点', body: `周均变化 ${signed(rate, 2)}%，低于目标减脂速度。建议在确认记录准确后，把每日热量下调 100–150 kcal。`, tone: 'orange' };
      if (rate < -target * 1.6) return { title: '别减得太急', body: `周均变化 ${signed(rate, 2)}%，速度偏快。建议增加 100–150 kcal，优先补碳水，观察训练表现和饥饿感。`, tone: 'orange' };
      return { title: '速度在合理区间', body: `周均变化 ${signed(rate, 2)}%，保持当前热量和蛋白质，继续观察 2 周。`, tone: 'lime' };
    }
    if (S.profile.goal === 'gain') {
      if (rate < target * 0.4) return { title: '增重偏慢', body: `周均变化 ${signed(rate, 2)}%。训练量到位、恢复正常时，可增加 100–150 kcal。`, tone: 'orange' };
      if (rate > target * 1.6) return { title: '增重偏快', body: `周均变化 ${signed(rate, 2)}%，可能脂肪增长偏多。建议减少 100–150 kcal，继续看力量趋势。`, tone: 'orange' };
      return { title: '增重节奏合适', body: `周均变化 ${signed(rate, 2)}%。保持渐进超负荷，用围度和力量判断质量。`, tone: 'lime' };
    }
    return { title: '用趋势校准', body: `周均变化 ${signed(rate, 2)}%。身体重组期不必追求体重快速变化，优先看训练重量、腰围和照片。`, tone: 'neutral' };
  }

  function logView() {
    const p = S.profile;
    const logs = sortedLogs();
    const latest = latestLog();
    const delta7 = weightDelta(7);
    const delta30 = weightDelta(30);
    const b = bmiValue();
    const advice = adaptiveAdvice();
    const trend = weightTrend();
    const bodyFat = latest && latest.bodyFat ? latest.bodyFat : p.bodyFat;
    const waist = latest && latest.waist ? latest.waist : p.waist;
    const history = [...logs].reverse();
    return `
      <div class="page-head">
        <div><div class="eyebrow">Body Data</div><h1 class="page-title">身体记录</h1><p class="page-sub">体重只是反馈，不是评判。看 7 日均值和 2–4 周趋势，再决定是否调整热量。</p></div>
      </div>
      <div class="weight-hero">
        <div class="weight-top">
          <div>
            <div class="stat-label">${ICONS.scale}当前体重</div>
            <div class="weight-now"><strong class="num">${currentWeight().toFixed(1)}</strong><span>kg</span></div>
            <div class="weight-delta ${trendClass(delta7)}">${delta7 == null ? '记录 7 天以上看变化' : `${signed(delta7)} kg · 近 7 天`}${delta30 != null ? ` · ${signed(delta30)} kg / 30 天` : ''}</div>
          </div>
          <div class="chart-tabs" role="tablist" aria-label="图表时间范围">
            ${[30, 90, 'all'].map((r) => `<button class="chart-tab ${String(UI.chartRange) === String(r) ? 'active' : ''}" data-action="log-range" data-range="${r}">${r === 'all' ? '全部' : r + '天'}</button>`).join('')}
          </div>
        </div>
        <div class="chart-wrap">${weightChartSVG()}</div>
        <div class="goal-progress">
          <div class="goal-progress-head"><span>起点 ${logs.length ? Number(logs[0].weight).toFixed(1) : '—'} kg</span><span>目标 ${p.targetWeight} kg · ${Math.round(goalProgressPct())}%</span></div>
          <div class="goal-track"><div class="goal-fill" style="width:${goalProgressPct()}%"></div></div>
        </div>
      </div>

      <div class="stat-grid" style="margin-top:10px">
        <div class="stat"><div class="stat-label">${ICONS.target}BMI</div><div class="stat-value num">${b.toFixed(1)}</div><div class="stat-sub">${bmiCategory(b)} · BMI 不区分肌肉与脂肪</div></div>
        <div class="stat"><div class="stat-label">${ICONS.chart}周均趋势</div><div class="stat-value num">${trend ? signed(trend.weeklyKg) : '—'}<small>kg</small></div><div class="stat-sub">${trend ? `${signed(trend.weeklyPct, 2)}% / 周` : '需要至少 3 次记录'}</div></div>
        <div class="stat"><div class="stat-label">${ICONS.user}体脂</div><div class="stat-value num">${bodyFat ? Number(bodyFat).toFixed(1) : '—'}<small>${bodyFat ? '%' : ''}</small></div><div class="stat-sub">可选，建议用同一方法与条件测量</div></div>
        <div class="stat"><div class="stat-label">${ICONS.layers}腰围</div><div class="stat-value num">${waist ? Number(waist).toFixed(1) : '—'}<small>${waist ? 'cm' : ''}</small></div><div class="stat-sub">${waist ? `腰高比 ${(Number(waist) / Number(p.height)).toFixed(2)}` : '每周同一时间测量'}</div></div>
      </div>

      <section class="section">
        <div class="section-head"><h2 class="section-title">记录今天</h2><span class="section-link">${new Intl.DateTimeFormat('zh-CN', { month: 'long', day: 'numeric' }).format(new Date())}</span></div>
        <form class="card" id="weight-form">
          <div class="form-grid">
            <div class="field"><label for="w-date">日期</label><input class="input" id="w-date" name="date" type="date" value="${isoDate()}" required></div>
            <div class="field"><label for="w-weight">体重（kg）</label><input class="input" id="w-weight" name="weight" type="number" inputmode="decimal" step="0.1" min="30" max="250" placeholder="例如 72.4" required></div>
            <div class="field"><label for="w-fat">体脂（%，可选）</label><input class="input" id="w-fat" name="bodyFat" type="number" inputmode="decimal" step="0.1" min="3" max="60" value="${bodyFat || ''}"></div>
            <div class="field"><label for="w-waist">腰围（cm，可选）</label><input class="input" id="w-waist" name="waist" type="number" inputmode="decimal" step="0.1" min="40" max="200" value="${waist || ''}"></div>
          </div>
          <button class="btn btn-block" style="margin-top:12px" type="submit">${ICONS.plus}保存记录</button>
        </form>
      </section>

      <section class="section">
        <div class="insight" style="${advice.tone === 'orange' ? 'background:var(--orange-soft);border-color:rgba(255,154,74,.18)' : ''}">
          <div class="insight-icon" style="${advice.tone === 'orange' ? 'background:var(--orange)' : ''}">${ICONS.spark}</div>
          <div><h3 style="${advice.tone === 'orange' ? 'color:var(--orange)' : ''}">${advice.title}</h3><p>${advice.body}</p></div>
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2 class="section-title">历史记录</h2><span class="section-link">${logs.length} 条</span></div>
        ${history.length ? `<div class="log-list">${history.map((l) => `
          <div class="log-row">
            <div><div class="log-date">${logDateLabel(l.date)}</div><div class="log-extra">${l.bodyFat ? `体脂 ${l.bodyFat}%` : ''}${l.bodyFat && l.waist ? ' · ' : ''}${l.waist ? `腰围 ${l.waist}cm` : ''}</div></div>
            <div class="log-weight">${Number(l.weight).toFixed(1)} <span style="font-size:8px;color:var(--muted)">kg</span></div>
            <button class="log-del" data-action="del-log" data-id="${l.id}" aria-label="删除这条记录">${ICONS.trash}</button>
          </div>`).join('')}</div>` : '<div class="empty-mini">还没有记录，从今天开始就好</div>'}
      </section>

      ${S.analyses && S.analyses.length ? `<section class="section">
        <div class="section-head"><h2 class="section-title">动作分析记录</h2><span class="section-link">${S.analyses.length} 条</span></div>
        <div class="log-list">${[...S.analyses].reverse().slice(0, 8).map((a) => `<div class="log-row">
          <div><div class="log-date">${logDateLabel(a.date)}</div><div class="log-extra">${esc(a.exercise)} · ${esc(a.label)} · ${a.reps} 次</div></div>
          <div class="log-weight">${a.score}<span style="font-size:8px;color:var(--muted)"> 分</span></div>
          <div class="log-extra">${a.rom}°</div>
        </div>`).join('')}</div>
      </section>` : ''}

      <div class="disclaimer" style="margin-top:18px"><b>说明：</b>体重受水分、盐分、糖原、排便和月经周期影响，单日上下 1–2 kg 很常见。BMI 不区分肌肉和脂肪；体脂测量也受设备和条件影响。不要用单次数字否定长期进步。</div>`;
  }

  /* ---------- Nutrition ---------- */

  const MEAL_TEMPLATES = {
    omnivore: [
      { name: '早餐', time: '07:00–09:00', p: 'yogurt', c: 'oats', f: 'almond', v: null, carbLabel: '燕麦' },
      { name: '午餐', time: '12:00–13:30', p: 'chicken', c: 'rice', f: 'oil', v: 'broccoli', carbLabel: '米饭' },
      { name: '加餐', time: '15:30–17:00', p: 'whey', c: 'banana', f: 'almond', v: null, carbLabel: '香蕉' },
      { name: '晚餐', time: '18:30–20:00', p: 'salmon', c: 'sweetpotato', f: 'oil', v: 'spinach', carbLabel: '红薯' }
    ],
    vegetarian: [
      { name: '早餐', time: '07:00–09:00', p: 'yogurt', c: 'oats', f: 'almond', v: null, carbLabel: '燕麦' },
      { name: '午餐', time: '12:00–13:30', p: 'tofu', c: 'rice', f: 'oil', v: 'broccoli', carbLabel: '米饭' },
      { name: '加餐', time: '15:30–17:00', p: 'edamame', c: 'banana', f: 'almond', v: null, carbLabel: '香蕉' },
      { name: '晚餐', time: '18:30–20:00', p: 'egg', c: 'sweetpotato', f: 'oil', v: 'spinach', carbLabel: '红薯' }
    ],
    lactoseFree: [
      { name: '早餐', time: '07:00–09:00', p: 'egg', c: 'oats', f: 'almond', v: null, carbLabel: '燕麦' },
      { name: '午餐', time: '12:00–13:30', p: 'chicken', c: 'rice', f: 'oil', v: 'broccoli', carbLabel: '米饭' },
      { name: '加餐', time: '15:30–17:00', p: 'edamame', c: 'banana', f: 'almond', v: null, carbLabel: '香蕉' },
      { name: '晚餐', time: '18:30–20:00', p: 'shrimp', c: 'sweetpotato', f: 'oil', v: 'spinach', carbLabel: '红薯' }
    ]
  };

  function foodById(list, id) {
    return list.find((f) => f.id === id) || list[0];
  }

  function foodAmount(food, amount) {
    const a = Math.round(amount);
    if (food.id === 'egg') return `${a}g（约 ${Math.max(1, Math.round(a / 50))} 个）`;
    if (food.id === 'whey') return `${a}g（约 ${Math.max(1, Math.round(a / 30))} 勺）`;
    return `${a}g`;
  }

  function buildMeals(t) {
    const templates = MEAL_TEMPLATES[S.profile.diet] || MEAL_TEMPLATES.omnivore;
    const sharesP = [0.28, 0.32, 0.15, 0.25];
    const sharesC = [0.25, 0.35, 0.15, 0.25];
    const sharesF = [0.25, 0.35, 0.15, 0.25];
    return templates.map((tpl, i) => {
      const pf = foodById(FOODS.proteins, tpl.p);
      const cf = foodById(FOODS.carbs, tpl.c);
      const ff = foodById(FOODS.fats, tpl.f);
      const vf = tpl.v ? foodById(FOODS.veg, tpl.v) : null;
      const targetP = t.protein * sharesP[i];
      const targetC = t.carbs * sharesC[i];
      const targetF = t.fat * sharesF[i];
      const vAmt = vf ? 150 : 0;
      const pFromVeg = vf ? (vf.p * vAmt) / 100 : 0;
      const cFromVeg = vf ? (vf.c * vAmt) / 100 : 0;
      const fFromVeg = vf ? (vf.f * vAmt) / 100 : 0;
      const mealP = Math.max(0, targetP - pFromVeg);
      const mealC = Math.max(0, targetC - cFromVeg);
      const mealF = Math.max(0, targetF - fFromVeg);
      let pAmt = (mealP / (pf.p || 1)) * 100;
      let cAmt = 0;
      let fAmt = 0;
      // Iterate because carb/fat foods also contribute protein and cross-macros.
      for (let k = 0; k < 6; k += 1) {
        cAmt = Math.max(0, (mealC - (pAmt * pf.c) / 100 - (fAmt * ff.c) / 100) / ((cf.c || 1) / 100));
        fAmt = Math.max(0, (mealF - (pAmt * pf.f) / 100 - (cAmt * cf.f) / 100) / ((ff.f || 1) / 100));
        const currentP = (pAmt * pf.p) / 100 + (cAmt * cf.p) / 100 + (fAmt * ff.p) / 100;
        pAmt = Math.max(0, pAmt - (currentP - mealP) / ((pf.p || 1) / 100));
      }
      pAmt = Math.max(5, round(pAmt, 5));
      cAmt = Math.max(5, round(cAmt, 5));
      fAmt = fAmt < 3 ? 0 : round(fAmt, 5);
      const items = [
        { food: pf, amt: pAmt },
        { food: cf, amt: cAmt },
        fAmt ? { food: ff, amt: fAmt } : null,
        vf ? { food: vf, amt: vAmt } : null
      ].filter(Boolean);
      const macros = items.reduce((acc, item) => {
        acc.kcal += (item.food.kcal * item.amt) / 100;
        acc.p += (item.food.p * item.amt) / 100;
        acc.c += (item.food.c * item.amt) / 100;
        acc.f += (item.food.f * item.amt) / 100;
        return acc;
      }, { kcal: 0, p: 0, c: 0, f: 0 });
      return { ...tpl, items, macros, note: tpl.p === 'whey' ? '训练后或两餐之间补充；也可以换成同等蛋白质的酸奶或鸡胸。' : '' };
    });
  }

  function macroDonut(t) {
    const pCal = t.protein * 4;
    const cCal = t.carbs * 4;
    const fCal = t.fat * 9;
    const total = pCal + cCal + fCal || 1;
    const r = 48;
    const c = circumference(r);
    const segs = [
      { len: (pCal / total) * c, color: '#c9ff3f', offset: 0 },
      { len: (cCal / total) * c, color: '#ff9a4a', offset: (pCal / total) * c },
      { len: (fCal / total) * c, color: '#76a9ff', offset: ((pCal + cCal) / total) * c }
    ];
    return `
      <div class="macro-donut">
        <svg viewBox="0 0 116 116" aria-hidden="true">
          <circle class="donut-bg" cx="58" cy="58" r="${r}"/>
          ${segs.map((s) => `<circle class="donut-seg" cx="58" cy="58" r="${r}" stroke="${s.color}" stroke-dasharray="${s.len} ${c - s.len}" stroke-dashoffset="${-s.offset}"/>`).join('')}
        </svg>
        <div class="donut-center"><div><strong class="num">${t.kcal}</strong><span>KCAL / DAY</span></div></div>
      </div>`;
  }

  function mealPlanHTML(t) {
    const meals = buildMeals(t);
    return meals.map((m) => `
      <div class="meal-card">
        <div class="meal-head">
          <div>
            <div class="meal-name">${m.name}<span class="meal-time">${m.time}</span></div>
            <div class="meal-foods">
              ${m.items.map((item) => `<span class="food-pill">${item.food.n} <b>${foodAmount(item.food, item.amt)}</b></span>`).join('')}
            </div>
          </div>
          <div class="meal-kcal">${Math.round(m.macros.kcal)} kcal<span>蛋白 ${Math.round(m.macros.p)}g</span></div>
        </div>
        ${m.note ? `<div class="meal-note">${m.note}</div>` : ''}
      </div>`).join('');
  }

  /* ---------- Photo calorie estimate ---------- */

  function ensurePhotoHealth() {
    if (UI.photo.health !== 'unknown') return;
    UI.photo.health = 'checking';
    fetch('/api/health', { cache: 'no-store' })
      .then((r) => r.json())
      .then((data) => {
        UI.photo.health = data && data.configured ? 'ready' : 'missing';
        if (data && data.model) UI.photo.model = data.model;
        UI.photo.mock = !!(data && data.mock);
        render();
      })
      .catch(() => {
        UI.photo.health = 'offline';
        render();
      });
  }

  function photoHealthLabel() {
    if (UI.photo.health === 'ready') return `视觉服务已连接${UI.photo.mock ? ' · Mock' : ''}`;
    if (UI.photo.health === 'missing') return '未配置 API Key';
    if (UI.photo.health === 'offline') return '需通过本地服务启动';
    if (UI.photo.health === 'checking') return '检查视觉服务…';
    return '本地视觉识别';
  }

  function resizeFoodPhoto(file) {
    return new Promise((resolve, reject) => {
      if (!file) {
        reject(new Error('没有选择照片'));
        return;
      }
      if (file.size > 20 * 1024 * 1024) {
        reject(new Error('照片超过 20MB，请压缩后再试'));
        return;
      }
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const max = 1600;
          const scale = Math.min(1, max / Math.max(img.width, img.height));
          const w = Math.max(1, Math.round(img.width * scale));
          const h = Math.max(1, Math.round(img.height * scale));
          const canvas = document.createElement('canvas');
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, w, h);
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', 0.84));
        };
        img.onerror = () => reject(new Error('无法读取这张照片，请换一张 JPEG/PNG'));
        img.src = reader.result;
      };
      reader.onerror = () => reject(new Error('读取照片失败'));
      reader.readAsDataURL(file);
    });
  }

  async function handlePhotoFile(file) {
    if (!file) return;
    UI.photo.error = '';
    UI.photo.result = null;
    UI.photo.baseItems = null;
    UI.photo.fileName = file.name || 'food-photo';
    try {
      UI.photo.dataUrl = await resizeFoodPhoto(file);
    } catch (e) {
      UI.photo.dataUrl = '';
      UI.photo.error = e.message || '照片读取失败';
    }
    render();
  }

  function photoTotals() {
    const items = (UI.photo.result && UI.photo.result.items) || [];
    const total = items.reduce((acc, item) => {
      acc.kcal += Number(item.kcal) || 0;
      acc.p += Number(item.protein_g) || 0;
      acc.c += Number(item.carbs_g) || 0;
      acc.f += Number(item.fat_g) || 0;
      return acc;
    }, { kcal: 0, p: 0, c: 0, f: 0 });
    return {
      kcal: Math.round(total.kcal),
      p: Math.round(total.p * 10) / 10,
      c: Math.round(total.c * 10) / 10,
      f: Math.round(total.f * 10) / 10
    };
  }

  function confidencePct(value) {
    return Math.round(clamp(Number(value) || 0, 0, 1) * 100);
  }

  function confidenceClass(value) {
    const v = Number(value) || 0;
    if (v >= 0.75) return 'high';
    if (v >= 0.5) return 'mid';
    return 'low';
  }

  function photoSetupHTML() {
    if (UI.photo.health !== 'missing' && UI.photo.health !== 'offline') return '';
    return `<div class="photo-setup">
      <div class="photo-setup-title">${ICONS.info}启用拍照识别</div>
      <p>识别需要视觉模型。API Key 只放在本机服务端，不进入手机浏览器。把 Key 写入本目录的 <code>.env</code>，然后用 <code>./start.command</code> 重启。</p>
      <code class="photo-cmd">OPENAI_API_KEY=sk-... ./start.command</code>
      <span>当前状态：${photoHealthLabel()}${UI.photo.model ? ` · ${esc(UI.photo.model)}` : ''}</span>
    </div>`;
  }

  function photoResultHTML() {
    const result = UI.photo.result;
    if (!result) return '';
    const total = photoTotals();
    const conf = result.total && result.total.confidence != null
      ? result.total.confidence
      : avg((result.items || []).map((i) => Number(i.confidence) || 0));
    const baseKcal = Number(result.total && result.total.kcal) || total.kcal || 1;
    const rangeRatio = total.kcal / baseKcal;
    const low = result.total && result.total.kcal_low ? Math.round(result.total.kcal_low * rangeRatio) : Math.round(total.kcal * 0.8);
    const high = result.total && result.total.kcal_high ? Math.round(result.total.kcal_high * rangeRatio) : Math.round(total.kcal * 1.2);
    return `<div class="photo-result" id="photo-result">
      <div class="photo-result-head">
        <div><div class="eyebrow">识别结果 · 请确认份量</div><h3>${esc(result.dish_name || '这一餐')}</h3></div>
        <span class="confidence-badge ${confidenceClass(conf)}">${confidencePct(conf)}% 置信度</span>
      </div>
      <div class="photo-total">
        <strong class="num">${total.kcal}</strong><span>kcal</span>
        <em>范围约 ${low}–${high} kcal</em>
      </div>
      <div class="photo-macros">
        <span><b>${total.p}g</b>蛋白</span><span><b>${total.c}g</b>碳水</span><span><b>${total.f}g</b>脂肪</span>
      </div>
      <div class="photo-items">
        ${(result.items || []).map((item, i) => `<div class="photo-item">
          <div class="photo-item-main"><b>${esc(item.name)}</b><span>${confidencePct(item.confidence)}% · ${esc(item.assumptions || '按可见份量估算')}</span></div>
          <label class="photo-grams">克数<input type="number" min="10" max="2000" step="5" value="${Math.round(Number(item.estimated_grams) || 0)}" data-photo-grams="${i}" inputmode="decimal"></label>
          <div class="photo-item-kcal">${Math.round(Number(item.kcal) || 0)} <span>kcal</span></div>
        </div>`).join('')}
      </div>
      ${result.portion_notes ? `<p class="photo-notes">${ICONS.info}${esc(result.portion_notes)}</p>` : ''}
      <div class="photo-result-actions">
        <button class="btn" data-action="add-photo-intake">${ICONS.check}确认并记录</button>
        <button class="btn btn-ghost" data-action="analyze-photo">${ICONS.refresh}重新识别</button>
      </div>
      <p class="photo-disclaimer">识别会受遮挡、油量、酱汁和烹饪方式影响。克数是估算值，不是称重结果；建议用食品秤或包装营养标签校准，尤其是减脂期。</p>
    </div>`;
  }

  function photoCardHTML() {
    const ph = UI.photo;
    return `<section class="section" id="photo-section">
      <div class="section-head"><h2 class="section-title">拍照估热量</h2><span class="section-link">${photoHealthLabel()}</span></div>
      <div class="card photo-card">
        <div class="photo-intro">
          <div class="photo-icon">${ICONS.camera}</div>
          <div><h3>拍一张，先估算再确认</h3><p>建议画面里放一个参照物（手、筷子、硬币），并补充“碗直径 15cm / 米饭约 200g / 这是半份”。识别结果不会自动记账。</p></div>
        </div>
        <input type="file" id="food-photo" accept="image/*" capture="environment" hidden>
        ${ph.dataUrl ? `<div class="photo-preview"><img src="${ph.dataUrl}" alt="待识别的食物照片"><button class="photo-remove" data-action="photo-clear" aria-label="移除照片">${ICONS.close}</button><span>${esc(ph.fileName)}</span></div>` : `<button class="photo-drop" data-action="pick-photo">${ICONS.camera}<b>拍照 / 选择照片</b><span>支持相机与相册，单张即可</span></button>`}
        <label class="photo-note-label" for="food-note">补充信息（可选，越具体越准）</label>
        <input class="input" id="food-note" value="${esc(ph.note)}" placeholder="例如：碗直径15cm，米饭约200g，酱汁吃了一半" maxlength="300" ${ph.analyzing ? 'disabled' : ''}>
        <div class="photo-actions">
          <button class="btn" data-action="analyze-photo" ${!ph.dataUrl || ph.analyzing ? 'disabled' : ''}>${ph.analyzing ? '<span class="spinner"></span>识别中…' : `${ICONS.spark}开始识别`}</button>
          ${ph.dataUrl ? `<button class="btn btn-ghost" data-action="photo-clear" ${ph.analyzing ? 'disabled' : ''}>重选</button>` : ''}
        </div>
        ${ph.error ? `<div class="photo-error">${ICONS.alert}<div>${esc(ph.error)}</div></div>` : ''}
        ${photoSetupHTML()}
        ${ph.analyzing ? `<div class="photo-loading"><span class="spinner"></span><div><b>正在分析食物与份量</b><span>通常需要 5–20 秒，请不要重复提交</span></div></div>` : ''}
        ${photoResultHTML()}
        ${!ph.result && !ph.analyzing ? `<p class="photo-disclaimer">拍照估热量是辅助工具，准确度取决于光线、遮挡、烹饪油和份量参照。需要称重级准确时，请使用食品秤。</p>` : ''}
      </div>
    </section>`;
  }

  async function analyzeFoodPhoto() {
    if (!UI.photo.dataUrl || UI.photo.analyzing) return;
    UI.photo.analyzing = true;
    UI.photo.error = '';
    UI.photo.result = null;
    UI.photo.baseItems = null;
    render();
    try {
      const resp = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_data_url: UI.photo.dataUrl, note: UI.photo.note })
      });
      let data = null;
      try {
        data = await resp.json();
      } catch (e) {}
      if (!resp.ok || !data || !data.ok) {
        const code = data && data.error;
        let msg = (data && data.message) || `识别服务返回 ${resp.status}`;
        if (code === 'missing_api_key') msg = '识别服务未配置 OPENAI_API_KEY。请在本目录创建 .env 后重启 start.command。';
        if (resp.status === 404) msg = '当前是静态文件模式，拍照识别需要通过 ./start.command 启动本地服务。';
        throw new Error(msg);
      }
      if (!data.result || !Array.isArray(data.result.items) || !data.result.items.length) {
        throw new Error('没有识别到食物，请换一张更清晰、包含完整餐盘的照片');
      }
      UI.photo.result = data.result;
      UI.photo.baseItems = JSON.parse(JSON.stringify(data.result.items));
      UI.photo.model = data.model || UI.photo.model;
      UI.photo.health = 'ready';
    } catch (e) {
      UI.photo.error = e.message || '识别失败，请稍后重试';
    } finally {
      UI.photo.analyzing = false;
      render();
    }
  }

  function updatePhotoGrams(index, value) {
    const base = UI.photo.baseItems && UI.photo.baseItems[index];
    const item = UI.photo.result && UI.photo.result.items && UI.photo.result.items[index];
    if (!base || !item) return;
    const grams = clamp(Number(value) || Number(base.estimated_grams) || 10, 10, 2000);
    const ratio = grams / (Number(base.estimated_grams) || 1);
    item.estimated_grams = grams;
    item.kcal = Math.round((Number(base.kcal) || 0) * ratio);
    item.protein_g = Math.round((Number(base.protein_g) || 0) * ratio * 10) / 10;
    item.carbs_g = Math.round((Number(base.carbs_g) || 0) * ratio * 10) / 10;
    item.fat_g = Math.round((Number(base.fat_g) || 0) * ratio * 10) / 10;
    item.gram_range_low = Math.round((Number(base.gram_range_low) || grams) * ratio);
    item.gram_range_high = Math.round((Number(base.gram_range_high) || grams) * ratio);
  }

  function refreshPhotoResultDOM() {
    const result = UI.photo.result;
    if (!result) return;
    const total = photoTotals();
    const baseKcal = Number(result.total && result.total.kcal) || total.kcal || 1;
    const ratio = total.kcal / baseKcal;
    const low = result.total && result.total.kcal_low ? Math.round(result.total.kcal_low * ratio) : Math.round(total.kcal * 0.8);
    const high = result.total && result.total.kcal_high ? Math.round(result.total.kcal_high * ratio) : Math.round(total.kcal * 1.2);
    const totalEl = document.querySelector('.photo-total strong');
    if (totalEl) totalEl.textContent = String(total.kcal);
    const rangeEl = document.querySelector('.photo-total em');
    if (rangeEl) rangeEl.textContent = `范围约 ${low}–${high} kcal`;
    const macroEls = document.querySelectorAll('.photo-macros b');
    if (macroEls[0]) macroEls[0].textContent = `${total.p}g`;
    if (macroEls[1]) macroEls[1].textContent = `${total.c}g`;
    if (macroEls[2]) macroEls[2].textContent = `${total.f}g`;
    document.querySelectorAll('.photo-item').forEach((row, i) => {
      const item = result.items[i];
      const kcalEl = row.querySelector('.photo-item-kcal');
      if (item && kcalEl) kcalEl.innerHTML = `${Math.round(Number(item.kcal) || 0)} <span>kcal</span>`;
    });
  }

  function addPhotoToIntake() {
    const result = UI.photo.result;
    if (!result || !Array.isArray(result.items) || !result.items.length) return;
    const dish = result.dish_name || '拍照识别';
    result.items.forEach((item) => {
      addIntake({
        name: `${dish} · ${item.name}`,
        kcal: Math.round(Number(item.kcal) || 0),
        p: Math.round((Number(item.protein_g) || 0) * 10) / 10,
        c: Math.round((Number(item.carbs_g) || 0) * 10) / 10,
        f: Math.round((Number(item.fat_g) || 0) * 10) / 10
      });
    });
    clearPhotoState();
    toast('拍照估算已加入今日摄入', 'ok');
    render();
  }

  function clearPhotoState() {
    UI.photo.dataUrl = '';
    UI.photo.note = '';
    UI.photo.fileName = '';
    UI.photo.result = null;
    UI.photo.baseItems = null;
    UI.photo.error = '';
    UI.photo.analyzing = false;
  }

  function nutritionView() {
    ensurePhotoHealth();
    const p = S.profile;
    const t = nutritionTargets();
    const intake = S.intake[isoDate()] || [];
    const kcalIn = sum(intake.map((i) => i.kcal));
    const pIn = sum(intake.map((i) => i.p));
    const cIn = sum(intake.map((i) => i.c));
    const fIn = sum(intake.map((i) => i.f));
    return `
      <div class="page-head">
        <div><div class="eyebrow">Fuel & Recovery</div><h1 class="page-title">营养</h1><p class="page-sub">先保证总热量和蛋白质，再谈补剂与细节。目标是可执行，不是完美。</p></div>
      </div>
      <div class="nutrition-hero">
        ${macroDonut(t)}
        <div>
          <div class="eyebrow" style="color:var(--lime)">${goalDeltaLabel(p.goal)}</div>
          <div style="margin-top:5px;font-size:13px;font-weight:750">${esc(GOALS[p.goal].label)} · ${esc(DIETS[p.diet].label)}</div>
          <div class="macro-list" style="margin-top:12px">
            <div class="macro-row"><i class="macro-dot" style="background:var(--lime)"></i><span class="macro-name">蛋白质</span><span class="macro-val">${t.protein} g</span></div>
            <div class="macro-row"><i class="macro-dot" style="background:var(--orange)"></i><span class="macro-name">碳水</span><span class="macro-val">${t.carbs} g</span></div>
            <div class="macro-row"><i class="macro-dot" style="background:var(--blue)"></i><span class="macro-name">脂肪</span><span class="macro-val">${t.fat} g</span></div>
          </div>
        </div>
      </div>
      <div class="nutrition-stats">
        <div class="n-stat"><b class="num">${t.maintenance}</b><span>估算维持热量</span></div>
        <div class="n-stat"><b class="num">${t.fiber}g</b><span>膳食纤维</span></div>
        <div class="n-stat"><b class="num">${t.water}L</b><span>饮水参考</span></div>
      </div>
      <div class="nutrition-note" style="margin-top:11px">${ICONS.info}<div>维持热量用 Mifflin-St Jeor 公式 × 活动系数估算，个体误差常见。连续记录 2–4 周体重后，以趋势为准调整，不要被公式绑架。</div></div>

      ${photoCardHTML()}

      <div class="nutrition-layout" style="margin-top:24px">
        <section>
          <div class="section-head"><h2 class="section-title">一日餐单</h2><span class="section-link">按 ${t.kcal} kcal 估算</span></div>
          <div class="meal-list">${mealPlanHTML(t)}</div>
          <div class="disclaimer" style="margin-top:10px"><b>替换原则：</b>同类食物等量替换。鸡胸可换瘦牛肉/虾/鱼；米饭可换同碳水量的红薯、意面或藜麦；乳制品不耐受可换豆浆、豆腐或毛豆。以 3–5 天平均达标为准，不必每一餐都精确。</div>
        </section>

        <section>
          <div class="section-head"><h2 class="section-title">今日摄入</h2><span class="section-link">${intake.length} 项</span></div>
          <div class="intake-card">
            <div class="intake-summary"><strong class="num">${Math.round(kcalIn)} <small style="font-size:10px;color:var(--muted)">/ ${t.kcal}</small></strong><span>${Math.max(0, t.kcal - Math.round(kcalIn))} kcal 剩余</span></div>
            <div class="bar"><i style="width:${clamp((kcalIn / t.kcal) * 100, 0, 100)}%"></i></div>
            <div class="intake-macros">
              <div class="intake-macro"><b class="num">${Math.round(pIn)} / ${t.protein}g</b><span>蛋白质</span></div>
              <div class="intake-macro"><b class="num">${Math.round(cIn)} / ${t.carbs}g</b><span>碳水</span></div>
              <div class="intake-macro"><b class="num">${Math.round(fIn)} / ${t.fat}g</b><span>脂肪</span></div>
            </div>
            <div class="quick-foods">
              ${FOODS.quick.map((f, i) => `<button class="quick-food" data-action="quick-add" data-index="${i}">+ ${esc(f.n)}</button>`).join('')}
            </div>
            ${intake.length ? `<div class="intake-log">${intake.map((item) => `
              <div class="intake-row"><span>${esc(item.name)}</span><b>${Math.round(item.kcal)} kcal</b><button class="log-del" data-action="del-intake" data-id="${item.id}" aria-label="删除">${ICONS.close}</button></div>`).join('')}</div>` : '<div class="empty-mini" style="margin-top:12px">今天还没有记录，点上面的食物快速添加</div>'}
            <form id="intake-form" style="margin-top:10px">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:6px">
                <input class="input" name="name" placeholder="自定义食物" style="height:38px;font-size:10px;grid-column:span 2" required>
                <input class="input" name="kcal" type="number" inputmode="numeric" placeholder="热量 kcal" style="height:38px;font-size:10px" required>
                <input class="input" name="protein" type="number" inputmode="decimal" placeholder="蛋白 g" style="height:38px;font-size:10px">
                <input class="input" name="carbs" type="number" inputmode="decimal" placeholder="碳水 g" style="height:38px;font-size:10px">
                <input class="input" name="fat" type="number" inputmode="decimal" placeholder="脂肪 g" style="height:38px;font-size:10px">
              </div>
              <button class="btn btn-sm btn-ghost btn-block" style="margin-top:6px" type="submit">${ICONS.plus}添加</button>
            </form>
            ${intake.length ? `<button class="btn btn-sm btn-danger btn-block" style="margin-top:8px" data-action="reset-intake">${ICONS.trash}清空今天</button>` : ''}
          </div>
        </section>
      </div>

      <section class="section">
        <div class="section-head"><h2 class="section-title">调整规则</h2></div>
        <div class="card card-flat" style="font-size:11px;color:var(--muted);line-height:1.75">
          <p><b style="color:var(--text)">1. 先看 2 周趋势。</b> 每周固定 3–7 次称重，取周平均，避免单日波动。</p>
          <p style="margin-top:7px"><b style="color:var(--text)">2. 每次只调 100–200 kcal。</b> 减脂速度低于每周 0.25% 体重时再下调；超过 1% 时适当上调。</p>
          <p style="margin-top:7px"><b style="color:var(--text)">3. 蛋白质优先。</b> 增肌 1.6–2.2 g/kg，减脂可到 2.0–2.4 g/kg；肾功能异常等特殊情况需医生或营养师个体化评估。</p>
        </div>
      </section>
      <div class="disclaimer" style="margin-top:18px"><b>重要提示：</b>本工具提供一般健身与营养教育信息，不构成医疗诊断或治疗建议。孕期、哺乳期、进食障碍史、糖尿病、肾病、心血管疾病或正在服药者，请先咨询医生或注册营养师。</div>`;
  }

  /* ---------- Research ---------- */

  function researchView() {
    const tags = ['全部', ...new Set(STUDIES.map((s) => s.tag))];
    const studies = UI.studyTag === '全部' ? STUDIES : STUDIES.filter((s) => s.tag === UI.studyTag);
    return `
      <div class="page-head">
        <div><div class="eyebrow">Evidence & Coaches</div><h1 class="page-title">研究与教练</h1><p class="page-sub">把研究结论翻译成可执行的决策，并索引教练视频与运动员案例；保留个体差异和不确定性。</p></div>
      </div>
      <div class="insight">
        <div class="insight-icon">${ICONS.book}</div>
        <div><h3>证据不是保证</h3><p>研究描述的是群体平均效应；你的恢复、动作基础、饮食依从性和偏好同样重要。先执行 4–8 周，再用记录判断是否适合你。</p></div>
      </div>
      <section class="section coach-section">
        <div class="section-head"><h2 class="section-title">教练计划视频</h2><span class="section-link">外链 · 版权归原作者</span></div>
        <p class="coach-intro">下面链接到教练的官方频道与 B 站搜索页，方便继续看完整视频。计划摘要为训练原则解读，不是付费计划原文；应用不下载、不重新托管视频。</p>
        <div class="coach-list">
          ${COACHES.map((c) => `<article class="coach-card">
            <div class="coach-head">
              <div class="coach-mark">${esc(c.name.slice(0, 1))}</div>
              <div><h3>${esc(c.name)}</h3><span>${esc(c.sport)}</span></div>
            </div>
            <div class="coach-focus">${esc(c.focus)}</div>
            <p class="coach-plan">${esc(c.plan)}</p>
            <div class="coach-points">${c.points.map((p) => `<span>${esc(p)}</span>`).join('')}</div>
            <div class="coach-actions">
              <a class="btn btn-sm" href="${c.video}" target="_blank" rel="noopener noreferrer">${ICONS.play}官方播放列表</a>
              <a class="btn btn-sm btn-ghost" href="${c.search}" target="_blank" rel="noopener noreferrer">${ICONS.external}B 站搜索</a>
            </div>
            <p class="coach-caution">${ICONS.alert}${esc(c.caution)}</p>
          </article>`).join('')}
        </div>
      </section>
      <div class="chip-scroll" style="margin-top:14px">
        ${tags.map((tag) => `<button class="chip ${UI.studyTag === tag ? 'active' : ''}" data-action="study-tag" data-value="${tag}">${tag}</button>`).join('')}
      </div>
      <div class="study-list" style="margin-top:10px">
        ${studies.map((s) => `
          <article class="study-card">
            <div class="study-top"><span class="study-level">${esc(s.level)}</span><span class="study-tag">${esc(s.tag)}</span></div>
            <h3>${esc(s.title)}</h3>
            <p class="study-finding">${esc(s.finding)}</p>
            <div class="study-apply"><b>怎么用：</b>${esc(s.apply)}</div>
            <div class="study-cite"><span>${esc(s.cite)}</span><a href="${s.url}" target="_blank" rel="noopener">PubMed ${ICONS.external}</a></div>
          </article>`).join('')}
      </div>

      <section class="section" style="margin-top:28px">
        <div class="section-head"><h2 class="section-title">运动员公开案例</h2><span class="section-link">左右滑动 ${ICONS.right}</span></div>
        <p style="margin:0 2px 10px;color:var(--muted);font-size:11px;line-height:1.6">以下为公开报道和访谈中可核实的比赛成绩、身体数据与训练原则，不包含未经证实的“精确计划”。案例用于理解不同目标下的取舍，不是照搬模板。</p>
        <div class="athlete-scroll">
          ${ATHLETES.map((a, i) => `
            <article class="athlete-card">
              <div class="athlete-head">
                <div class="athlete-monogram a-${a.accent}">${esc(a.name.slice(0, 1))}</div>
                <div><div class="athlete-name">${esc(a.name)}</div><div class="athlete-sport">${esc(a.sport)} · ${esc(a.en)}</div></div>
                <div class="athlete-stat"><b>${esc(a.stat)}</b><span>${esc(a.statLabel)}</span></div>
              </div>
              <ul class="athlete-facts">${a.facts.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
              <div class="athlete-block"><h4>训练原则</h4><p>${a.principles.map((x) => esc(x)).join('；')}。</p></div>
              <div class="athlete-block"><h4>可以学什么</h4><p>${esc(a.learn)}</p></div>
              <div class="athlete-block caution"><h4>不要照搬</h4><p>${esc(a.caution)}</p></div>
            </article>`).join('')}
        </div>
      </section>

      <section class="section">
        <div class="section-head"><h2 class="section-title">怎么读这些证据</h2></div>
        <div class="card card-flat" style="font-size:10.5px;color:var(--muted);line-height:1.75">
          <p><b style="color:var(--lime)">系统综述 / 元分析：</b>汇总多项研究，证据权重较高，但仍受原始研究质量、人群和训练差异影响。</p>
          <p style="margin-top:6px"><b style="color:var(--lime)">随机对照试验：</b>能较好判断因果，但样本量、周期和依从性决定外推价值。</p>
          <p style="margin-top:6px"><b style="color:var(--lime)">立场声明 / 叙述性综述：</b>来自专业组织的综合建议，适合作为实践框架，不等同于单一实验结论。</p>
          <p style="margin-top:6px"><b style="color:var(--lime)">机制假说：</b>用于解释“可能为什么”，不能单独证明效果。睡眠、恢复等领域常见。</p>
        </div>
      </section>

      <div class="disclaimer" style="margin-top:18px"><b>免责声明：</b>本应用是教育与训练辅助工具，不构成医疗建议、康复处方或比赛备赛指导。运动员数据来自公开资料，比赛体重、体脂和训练量可能随赛季变化；媒体数据可能存在误差。若有疼痛、伤病、心血管或代谢疾病，请先咨询医生或合格教练。</div>`;
  }

  /* ---------- Profile ---------- */

  function profileSheetHTML() {
    const p = S.profile;
    const limits = LIMITS.map((l) => `<label class="check-pill"><input type="checkbox" name="limitations" value="${l}" ${p.limitations.includes(l) ? 'checked' : ''}><span>${l}部不适</span></label>`).join('');
    const focus = FOCUS_GROUPS.map((g) => `<label class="check-pill"><input type="checkbox" name="focus" value="${g}" ${p.focus.includes(g) ? 'checked' : ''}><span>${g}</span></label>`).join('');
    return `
      <div class="sheet-backdrop">
        <div class="sheet" role="dialog" aria-modal="true" aria-label="个人资料" data-stop="1">
          <div class="sheet-grab"></div>
          <div class="sheet-head">
            <div><div class="eyebrow">Profile</div><div class="sheet-title">个人资料</div></div>
            <button class="sheet-close" data-action="close-sheet" aria-label="关闭">${ICONS.close}</button>
          </div>
          <div class="sheet-body">
            <div class="profile-head">
              <div class="profile-avatar">${esc((p.name || '训练者').slice(0, 1))}</div>
              <div><div class="profile-name">${esc(p.name || '训练者')}</div><div class="profile-meta">${esc(GOALS[p.goal].label)} · ${esc(EXPERIENCE[p.experience].label)} · 每周 ${p.days} 天</div></div>
            </div>
            <form id="profile-form" style="margin-top:14px">
              <div class="field"><label for="pf-name">昵称</label><input class="input" id="pf-name" name="name" value="${esc(p.name)}" placeholder="怎么称呼你"></div>
              <div class="form-grid" style="margin-top:10px">
                <div class="field"><label for="pf-sex">性别（用于代谢估算）</label><select class="select" id="pf-sex" name="sex"><option value="male" ${p.sex === 'male' ? 'selected' : ''}>男</option><option value="female" ${p.sex === 'female' ? 'selected' : ''}>女</option></select></div>
                <div class="field"><label for="pf-age">年龄</label><input class="input" id="pf-age" name="age" type="number" min="14" max="90" value="${p.age}" required></div>
                <div class="field"><label for="pf-height">身高（cm）</label><input class="input" id="pf-height" name="height" type="number" min="120" max="230" value="${p.height}" required></div>
                <div class="field"><label for="pf-weight">体重（kg）</label><input class="input" id="pf-weight" name="weight" type="number" step="0.1" min="30" max="250" value="${p.weight}" required></div>
                <div class="field"><label for="pf-target">目标体重（kg）</label><input class="input" id="pf-target" name="targetWeight" type="number" step="0.1" min="30" max="250" value="${p.targetWeight}" required></div>
                <div class="field"><label for="pf-rate">每周变化目标（%体重）</label><input class="input" id="pf-rate" name="weeklyRate" type="number" step="0.1" min="0.2" max="1" value="${p.weeklyRate}" required></div>
              </div>
              <div class="form-grid" style="margin-top:10px">
                <div class="field"><label for="pf-goal">目标</label><select class="select" id="pf-goal" name="goal">${Object.entries(GOALS).map(([k, v]) => `<option value="${k}" ${p.goal === k ? 'selected' : ''}>${v.label}</option>`).join('')}</select></div>
                <div class="field"><label for="pf-exp">训练经验</label><select class="select" id="pf-exp" name="experience">${Object.entries(EXPERIENCE).map(([k, v]) => `<option value="${k}" ${p.experience === k ? 'selected' : ''}>${v.label} · ${v.desc}</option>`).join('')}</select></div>
                <div class="field"><label for="pf-days">每周训练天数</label><select class="select" id="pf-days" name="days">${[2, 3, 4, 5, 6].map((d) => `<option value="${d}" ${Number(p.days) === d ? 'selected' : ''}>${d} 天</option>`).join('')}</select></div>
                <div class="field"><label for="pf-min">每次时长</label><select class="select" id="pf-min" name="minutes">${[30, 45, 60, 75, 90].map((m) => `<option value="${m}" ${Number(p.minutes) === m ? 'selected' : ''}>${m} 分钟</option>`).join('')}</select></div>
                <div class="field"><label for="pf-equip">器械条件</label><select class="select" id="pf-equip" name="equipment">${Object.entries(EQUIPMENT).map(([k, v]) => `<option value="${k}" ${p.equipment === k ? 'selected' : ''}>${v.label}</option>`).join('')}</select></div>
                <div class="field"><label for="pf-activity">日常活动量</label><select class="select" id="pf-activity" name="activity">${Object.entries(ACTIVITY).map(([k, v]) => `<option value="${k}" ${p.activity === k ? 'selected' : ''}>${v.label}</option>`).join('')}</select></div>
                <div class="field"><label for="pf-diet">饮食类型</label><select class="select" id="pf-diet" name="diet">${Object.entries(DIETS).map(([k, v]) => `<option value="${k}" ${p.diet === k ? 'selected' : ''}>${v.label}</option>`).join('')}</select></div>
                <div class="field"><label for="pf-fat">体脂（%，可选）</label><input class="input" id="pf-fat" name="bodyFat" type="number" step="0.1" min="3" max="60" value="${p.bodyFat || ''}"></div>
              </div>
              <div class="field" style="margin-top:12px"><label>需要避开的部位（会筛选高风险动作）</label><div class="check-grid">${limits}</div></div>
              <div class="field" style="margin-top:12px"><label>重点部位（排序会略微优先）</label><div class="check-grid">${focus}</div></div>
              <button class="btn btn-block" style="margin-top:18px" type="submit">${ICONS.check}保存并重新生成计划</button>
            </form>

            <div class="section" style="margin-top:22px">
              <div class="section-head"><h2 class="section-title">数据与设置</h2></div>
              <div class="settings-list">
                <button class="settings-row" data-action="export-data"><span>${ICONS.download}导出数据</span><small>JSON 备份</small></button>
                <button class="settings-row" data-action="import-data"><span>${ICONS.upload}导入数据</span><small>恢复备份</small></button>
                <button class="settings-row" data-action="open-onboarding"><span>${ICONS.spark}重新做引导</span><small>重新定制</small></button>
                <button class="settings-row" data-action="reset-data" style="color:var(--red)"><span style="color:var(--red)">${ICONS.trash}清空所有数据</span><small>不可撤销</small></button>
              </div>
              <input type="file" id="import-file" accept="application/json,.json" hidden>
            </div>
            <div class="disclaimer" style="margin-top:16px"><b>隐私：</b>所有数据只保存在当前浏览器的 localStorage 中，不会上传到服务器。清理浏览器数据前请先导出备份。${memoryOnly ? '当前浏览器禁用了本地存储，刷新后数据会丢失。' : ''}</div>
          </div>
        </div>
      </div>`;
  }

  function openProfile() {
    openSheet(profileSheetHTML());
  }

  function exportData() {
    const blob = new Blob([JSON.stringify(S, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `forge-backup-${isoDate()}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    toast('备份已导出', 'ok');
  }

  function resetData() {
    if (!window.confirm('确定清空所有训练、体重和营养记录吗？这个操作不可撤销。')) return;
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
    location.hash = '#home';
    location.reload();
  }

  /* ---------- Onboarding ---------- */

  function onboardingHTML() {
    const d = UI.draft || DEFAULT_PROFILE;
    const step = UI.onboardStep;
    const bmi = bmiValue(Number(d.weight), Number(d.height));
    const goalCards = [
      { id: 'hypertrophy', icon: 'dumbbell', label: '增肌', sub: '增加肌肉围度与线条' },
      { id: 'cut', icon: 'flame', label: '减脂', sub: '降低体脂，尽量保住肌肉' },
      { id: 'strength', icon: 'bolt', label: '力量', sub: '提高深蹲卧推硬拉表现' },
      { id: 'recomp', icon: 'refresh', label: '身体重组', sub: '体重稳定，改善体成分' },
      { id: 'health', icon: 'target', label: '健康体态', sub: '规律训练，改善精力与体态' }
    ];
    return `
      <div class="onboard">
        <div class="onboard-box">
          <div class="onboard-brand">${brandMarkup()}</div>
          <div class="onboard-progress">${[0, 1, 2, 3].map((i) => `<span class="${step >= i ? 'done' : ''}"></span>`).join('')}</div>

          <section class="onboard-step ${step === 0 ? 'active' : ''}">
            <div class="onboard-kicker">Step 1 / 4 · 目标</div>
            <h1 class="onboard-title">你想先改变什么？</h1>
            <p class="onboard-sub">目标会决定热量、次数区间、训练量和有氧安排。之后随时可以调整。</p>
            <div class="choice-grid">
              ${goalCards.map((g) => `
                <button class="choice ${d.goal === g.id ? 'selected' : ''}" data-action="ob-goal" data-value="${g.id}" ${g.id === 'health' ? 'style="grid-column:span 2"' : ''}>
                  <span class="choice-icon">${ICONS[g.icon]}</span>
                  <b>${g.label}</b><span>${g.sub}</span>
                </button>`).join('')}
            </div>
            <div class="onboard-actions"><button class="btn" data-action="ob-next">继续 ${ICONS.right}</button></div>
            <div class="onboard-skip"><button data-action="load-demo">先看看示例数据 →</button></div>
          </section>

          <section class="onboard-step ${step === 1 ? 'active' : ''}">
            <div class="onboard-kicker">Step 2 / 4 · 身体数据</div>
            <h1 class="onboard-title">先认识你的起点</h1>
            <p class="onboard-sub">这些数据用于估算基础代谢、蛋白质需求和训练负荷。所有数据只保存在本机。</p>
            <div class="onboard-fields">
              <div class="field span-2">
                <label>性别（仅用于代谢公式）</label>
                <div class="segmented">
                  <button class="${d.sex === 'male' ? 'active' : ''}" data-action="ob-sex" data-value="male">男</button>
                  <button class="${d.sex === 'female' ? 'active' : ''}" data-action="ob-sex" data-value="female">女</button>
                </div>
              </div>
              <div class="field"><label for="ob-age">年龄</label><input class="input" id="ob-age" data-ob="age" type="number" inputmode="numeric" min="14" max="90" value="${d.age}"></div>
              <div class="field"><label for="ob-height">身高（cm）</label><input class="input" id="ob-height" data-ob="height" type="number" inputmode="decimal" min="120" max="230" value="${d.height}"></div>
              <div class="field"><label for="ob-weight">体重（kg）</label><input class="input" id="ob-weight" data-ob="weight" type="number" inputmode="decimal" step="0.1" min="30" max="250" value="${d.weight}"></div>
              <div class="field"><label for="ob-target">目标体重（kg）</label><input class="input" id="ob-target" data-ob="targetWeight" type="number" inputmode="decimal" step="0.1" min="30" max="250" value="${d.targetWeight}"></div>
              <div class="field span-2">
                <div class="bmi-hint">${ICONS.info}当前 BMI <b>${bmi ? bmi.toFixed(1) : '—'}</b> · ${bmi ? bmiCategory(bmi) : '填写后估算'}。BMI 不区分肌肉和脂肪，仅作参考。</div>
              </div>
            </div>
            <div class="onboard-actions">
              <button class="btn btn-ghost" data-action="ob-back">${ICONS.left}返回</button>
              <button class="btn" data-action="ob-next">继续 ${ICONS.right}</button>
            </div>
          </section>

          <section class="onboard-step ${step === 2 ? 'active' : ''}">
            <div class="onboard-kicker">Step 3 / 4 · 训练条件</div>
            <h1 class="onboard-title">你能稳定投入多少？</h1>
            <p class="onboard-sub">计划按“能长期做到”的强度设计。少练一天但能坚持，比完美计划练两周更有价值。</p>
            <div class="onboard-fields">
              <div class="field span-2">
                <label>训练经验</label>
                <div class="choice-grid" style="margin-top:0;grid-template-columns:repeat(3,1fr)">
                  ${Object.entries(EXPERIENCE).map(([k, v]) => `<button class="choice ${d.experience === k ? 'selected' : ''}" data-action="ob-exp" data-value="${k}"><b>${v.label}</b><span>${v.desc}</span></button>`).join('')}
                </div>
              </div>
              <div class="field span-2">
                <label>每周训练天数</label>
                <div class="segmented">${[2, 3, 4, 5, 6].map((n) => `<button class="${Number(d.days) === n ? 'active' : ''}" data-action="ob-days" data-value="${n}">${n} 天</button>`).join('')}</div>
              </div>
              <div class="field span-2">
                <label>每次可用时长</label>
                <div class="segmented">${[30, 45, 60, 75, 90].map((n) => `<button class="${Number(d.minutes) === n ? 'active' : ''}" data-action="ob-min" data-value="${n}">${n} 分钟</button>`).join('')}</div>
              </div>
              <div class="field span-2">
                <label>器械条件</label>
                <div class="choice-grid" style="margin-top:0;grid-template-columns:repeat(3,1fr)">
                  ${Object.entries(EQUIPMENT).map(([k, v]) => `<button class="choice ${d.equipment === k ? 'selected' : ''}" data-action="ob-equip" data-value="${k}"><b>${v.label}</b><span>${v.desc}</span></button>`).join('')}
                </div>
              </div>
              <div class="field span-2"><label for="ob-activity">日常活动量</label><select class="select" id="ob-activity" data-ob="activity">${Object.entries(ACTIVITY).map(([k, v]) => `<option value="${k}" ${d.activity === k ? 'selected' : ''}>${v.label}</option>`).join('')}</select></div>
            </div>
            <div class="onboard-actions">
              <button class="btn btn-ghost" data-action="ob-back">${ICONS.left}返回</button>
              <button class="btn" data-action="ob-next">继续 ${ICONS.right}</button>
            </div>
          </section>

          <section class="onboard-step ${step === 3 ? 'active' : ''}">
            <div class="onboard-kicker">Step 4 / 4 · 偏好与限制</div>
            <h1 class="onboard-title">让计划适合你的身体</h1>
            <p class="onboard-sub">如果有明确疼痛或伤病，请先获得医生/康复师许可。这里只用于筛掉高风险动作，不是康复处方。</p>
            <div class="onboard-fields">
              <div class="field span-2">
                <label>需要避开的部位</label>
                <div class="check-grid">${LIMITS.map((l) => `<button class="check-pill ${d.limitations.includes(l) ? 'checked' : ''}" data-action="ob-limit" data-value="${l}"><span>${l}部不适</span></button>`).join('')}</div>
              </div>
              <div class="field span-2">
                <label>重点部位（可多选）</label>
                <div class="check-grid">${FOCUS_GROUPS.map((g) => `<button class="check-pill ${d.focus.includes(g) ? 'checked' : ''}" data-action="ob-focus" data-value="${g}"><span>${g}</span></button>`).join('')}</div>
              </div>
              <div class="field span-2">
                <label>饮食类型</label>
                <div class="choice-grid" style="margin-top:0;grid-template-columns:repeat(3,1fr)">
                  ${Object.entries(DIETS).map(([k, v]) => `<button class="choice ${d.diet === k ? 'selected' : ''}" data-action="ob-diet" data-value="${k}"><b>${v.label}</b><span>${v.desc}</span></button>`).join('')}
                </div>
              </div>
              <div class="field span-2">
                <div class="card card-flat" style="padding:13px">
                  <div class="eyebrow" style="color:var(--lime)">你的方案</div>
                  <div style="margin-top:6px;font-size:12px;line-height:1.7">
                    <b>${GOALS[d.goal].label}</b> · ${EXPERIENCE[d.experience].label} · 每周 ${d.days} 天 · 每次约 ${d.minutes} 分钟<br>
                    <span style="color:var(--muted)">${EQUIPMENT[d.equipment].label} · ${DIETS[d.diet].label} · 目标体重 ${d.targetWeight} kg</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="onboard-actions">
              <button class="btn btn-ghost" data-action="ob-back">${ICONS.left}返回</button>
              <button class="btn" data-action="ob-next">${ICONS.spark}生成我的计划</button>
            </div>
          </section>
        </div>
      </div>`;
  }

  function openOnboarding() {
    closeSheet();
    UI.draft = JSON.parse(JSON.stringify(S.profile));
    UI.onboardStep = 0;
    renderOnboarding();
  }

  function renderOnboarding() {
    if (!UI.draft) UI.draft = JSON.parse(JSON.stringify(S.profile));
    onboardRoot.innerHTML = onboardingHTML();
    document.body.classList.add('is-locked');
    const active = onboardRoot.querySelector('.onboard-step.active');
    if (active) active.scrollIntoView({ block: 'start' });
  }

  function onboardNext() {
    if (UI.onboardStep === 1) {
      const d = UI.draft;
      if (!(Number(d.age) >= 14 && Number(d.age) <= 90) || !(Number(d.height) >= 120 && Number(d.height) <= 230) || !(Number(d.weight) >= 30 && Number(d.weight) <= 250)) {
        toast('请检查年龄、身高和体重是否填写正确');
        return;
      }
    }
    if (UI.onboardStep >= 3) {
      completeOnboarding();
      return;
    }
    UI.onboardStep += 1;
    renderOnboarding();
  }

  function onboardBack() {
    if (UI.onboardStep > 0) {
      UI.onboardStep -= 1;
      renderOnboarding();
    }
  }

  /* ---------- Workout session ---------- */

  function fmtClock(totalSeconds) {
    const s = Math.max(0, Math.round(totalSeconds));
    return `${pad(Math.floor(s / 60))}:${pad(s % 60)}`;
  }

  function startSession(dayIndex) {
    if (!S.plan) return;
    const day = S.plan.days[Number(dayIndex)];
    if (!day) return;
    const completed = {};
    day.slots.forEach((slot, i) => {
      completed[i] = Array.from({ length: Number(slot.sets) || 0 }, () => false);
    });
    UI.session = {
      dayIndex: Number(dayIndex),
      day,
      startedAt: Date.now(),
      completed,
      restEnd: null,
      restTotal: 0,
      finished: null
    };
    document.body.classList.add('is-locked');
    clearInterval(sessionTicker);
    sessionTicker = setInterval(tickSession, 1000);
    renderSession();
  }

  function sessionStats() {
    if (!UI.session) return { total: 0, done: 0 };
    let total = 0;
    let done = 0;
    Object.values(UI.session.completed).forEach((arr) => {
      total += arr.length;
      done += arr.filter(Boolean).length;
    });
    return { total, done };
  }

  function renderSession() {
    if (!UI.session) {
      sessionRoot.innerHTML = '';
      return;
    }
    if (UI.session.finished) {
      const f = UI.session.finished;
      sessionRoot.innerHTML = `
        <div class="session">
          <div class="session-top">
            <div><div class="session-title">训练完成</div><div class="session-sub">${esc(f.dayTitle)}</div></div>
            <button class="sheet-close" data-action="close-session" aria-label="关闭">${ICONS.close}</button>
          </div>
          <div class="session-scroll">
            <div class="finish-summary">
              <div class="big">✓</div>
              <h2>今天的训练已记录</h2>
              <p>渐进超负荷不是每次都要加重量，而是每次都比上次多一点可恢复的刺激。</p>
              <div class="summary-grid">
                <div><b class="num">${f.duration}</b><span>分钟</span></div>
                <div><b class="num">${f.sets}</b><span>完成组数</span></div>
                <div><b class="num">${f.exercises}</b><span>动作数</span></div>
              </div>
              <div style="display:grid;gap:8px;margin-top:24px">
                <button class="btn btn-block" data-action="close-session" data-view="home">${ICONS.check}回到首页</button>
                <button class="btn btn-ghost btn-block" data-action="close-session" data-view="plan">查看训练计划</button>
              </div>
            </div>
          </div>
        </div>`;
      return;
    }
    const day = UI.session.day;
    const stats = sessionStats();
    const pct = stats.total ? (stats.done / stats.total) * 100 : 0;
    const elapsed = Math.floor((Date.now() - UI.session.startedAt) / 1000);
    const restRemaining = UI.session.restEnd ? Math.max(0, Math.ceil((UI.session.restEnd - Date.now()) / 1000)) : 0;
    const restPct = UI.session.restTotal ? (restRemaining / UI.session.restTotal) * 100 : 0;
    sessionRoot.innerHTML = `
      <div class="session">
        <div class="session-top">
          <div>
            <div class="session-title">${esc(day.title)}</div>
            <div class="session-sub">${stats.done} / ${stats.total} 组已完成</div>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <span class="session-timer" id="session-elapsed">${fmtClock(elapsed)}</span>
            <button class="sheet-close" data-action="close-session" aria-label="退出训练">${ICONS.close}</button>
          </div>
        </div>
        <div class="session-progress"><i style="width:${pct}%"></i></div>
        <div class="session-scroll">
          ${day.slots.map((slot, i) => {
            const ex = BY_ID.get(slot.exId);
            if (!ex) return '';
            const arr = UI.session.completed[i] || [];
            const done = arr.filter(Boolean).length;
            return `
              <div class="session-ex ${done === arr.length && arr.length ? 'done' : ''}">
                <div class="session-ex-head">
                  <div>
                    <div class="session-ex-name">${esc(ex.n)}</div>
                    <div class="session-ex-meta">${slot.sets} 组 × ${slot.reps} · RIR ${slot.rir} · 休息 ${slot.rest}s</div>
                  </div>
                  <span class="mini-tag ${done === arr.length && arr.length ? 'hot' : ''}">${done}/${arr.length}</span>
                </div>
                <div class="set-pills">
                  ${arr.map((checked, si) => `<button class="set-pill ${checked ? 'done' : ''}" data-action="toggle-set" data-ex="${i}" data-set="${si}">${checked ? '✓ ' : ''}第 ${si + 1} 组</button>`).join('')}
                </div>
              </div>`;
          }).join('')}
        </div>
        ${UI.session.restEnd ? `
          <div class="session-rest">
            <div class="rest-top">
              <div class="rest-copy"><b>组间休息</b><span>呼吸恢复后，再开始下一组</span></div>
              <div class="rest-time" id="rest-time">${fmtClock(restRemaining)}</div>
            </div>
            <div class="rest-bar"><i id="rest-bar" style="width:${restPct}%"></i></div>
            <div class="rest-actions">
              <button class="btn btn-ghost" data-action="skip-rest">跳过休息</button>
              <button class="btn" data-action="finish-session">完成训练</button>
            </div>
          </div>` : `
          <div class="session-footer">
            <button class="btn btn-block" data-action="finish-session">${ICONS.check}完成训练并保存</button>
          </div>`}
      </div>`;
  }

  function tickSession() {
    if (!UI.session || UI.session.finished) return;
    const elapsedEl = document.getElementById('session-elapsed');
    if (elapsedEl) elapsedEl.textContent = fmtClock((Date.now() - UI.session.startedAt) / 1000);
    if (UI.session.restEnd) {
      const remaining = Math.max(0, Math.ceil((UI.session.restEnd - Date.now()) / 1000));
      const timeEl = document.getElementById('rest-time');
      const barEl = document.getElementById('rest-bar');
      if (timeEl) timeEl.textContent = fmtClock(remaining);
      if (barEl) barEl.style.width = `${UI.session.restTotal ? (remaining / UI.session.restTotal) * 100 : 0}%`;
      if (remaining <= 0) {
        UI.session.restEnd = null;
        if (navigator.vibrate) navigator.vibrate([120, 60, 120]);
        renderSession();
      }
    }
  }

  function toggleSet(exIndex, setIndex) {
    if (!UI.session || UI.session.finished) return;
    const arr = UI.session.completed[exIndex];
    if (!arr || typeof arr[setIndex] === 'undefined') return;
    arr[setIndex] = !arr[setIndex];
    if (arr[setIndex]) {
      const slot = UI.session.day.slots[exIndex];
      const stats = sessionStats();
      if (stats.done < stats.total) {
        UI.session.restEnd = Date.now() + Number(slot.rest || 90) * 1000;
        UI.session.restTotal = Number(slot.rest || 90);
      }
      if (navigator.vibrate) navigator.vibrate(35);
    } else {
      UI.session.restEnd = null;
    }
    renderSession();
  }

  function skipRest() {
    if (!UI.session) return;
    UI.session.restEnd = null;
    renderSession();
  }

  function finishSession() {
    if (!UI.session || UI.session.finished) return;
    const stats = sessionStats();
    if (!stats.done) {
      toast('至少完成一组再保存');
      return;
    }
    const duration = Math.max(1, Math.round((Date.now() - UI.session.startedAt) / 60000));
    const entry = {
      id: `session-${Date.now()}`,
      date: isoDate(),
      dayTitle: UI.session.day.title,
      sets: stats.done,
      duration
    };
    S.sessions.push(entry);
    save();
    clearInterval(sessionTicker);
    UI.session.finished = { ...entry, exercises: UI.session.day.slots.length };
    renderSession();
  }

  function closeSession(view) {
    clearInterval(sessionTicker);
    UI.session = null;
    sessionRoot.innerHTML = '';
    if (!sheetRoot.innerHTML && !onboardRoot.innerHTML) document.body.classList.remove('is-locked');
    if (view && VIEWS.includes(view)) {
      UI.view = view;
      history.replaceState(null, '', `#${view}`);
    }
    render();
    resetScroll();
  }

  /* ---------- Data mutations ---------- */

  function upsertWeightLog(date, weight, bodyFat, waist) {
    const existing = S.logs.find((l) => l.date === date);
    if (existing) {
      existing.weight = weight;
      if (bodyFat != null) existing.bodyFat = bodyFat;
      if (waist != null) existing.waist = waist;
    } else {
      S.logs.push({
        id: `log-${Date.now()}`,
        date,
        weight,
        bodyFat: bodyFat == null ? null : bodyFat,
        waist: waist == null ? null : waist
      });
    }
    const newest = sortedLogs()[sortedLogs().length - 1];
    if (newest) {
      S.profile.weight = Number(newest.weight);
      if (newest.bodyFat != null) S.profile.bodyFat = newest.bodyFat;
      if (newest.waist != null) S.profile.waist = newest.waist;
    }
  }

  function addIntake(item) {
    const today = isoDate();
    if (!S.intake[today]) S.intake[today] = [];
    S.intake[today].push({ id: `intake-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, ...item });
    save();
  }

  function quickAdd(index) {
    const food = FOODS.quick[Number(index)];
    if (!food) return;
    addIntake({ name: food.n, kcal: food.kcal, p: food.p, c: food.c, f: food.f });
    toast(`已添加 ${food.n}`, 'ok');
    render();
  }

  function saveWeightForm(form) {
    const fd = new FormData(form);
    const date = String(fd.get('date') || isoDate());
    const weight = Number(fd.get('weight'));
    const bodyFat = fd.get('bodyFat') ? Number(fd.get('bodyFat')) : null;
    const waist = fd.get('waist') ? Number(fd.get('waist')) : null;
    if (!(weight >= 30 && weight <= 250)) {
      toast('请输入 30–250 kg 之间的体重');
      return;
    }
    if (date > isoDate()) {
      toast('日期不能晚于今天');
      return;
    }
    upsertWeightLog(date, weight, bodyFat, waist);
    save();
    toast('体重已记录', 'ok');
    render();
  }

  function saveIntakeForm(form) {
    const fd = new FormData(form);
    const name = String(fd.get('name') || '').trim();
    const kcal = Number(fd.get('kcal'));
    if (!name || !(kcal >= 0)) {
      toast('请填写食物名称和热量');
      return;
    }
    addIntake({
      name,
      kcal,
      p: Number(fd.get('protein')) || 0,
      c: Number(fd.get('carbs')) || 0,
      f: Number(fd.get('fat')) || 0
    });
    toast('已加入今日摄入', 'ok');
    render();
  }

  function saveProfileForm(form) {
    const fd = new FormData(form);
    const oldWeight = Number(S.profile.weight);
    const p = {
      ...S.profile,
      name: String(fd.get('name') || '').trim(),
      sex: String(fd.get('sex') || 'male'),
      age: Number(fd.get('age')),
      height: Number(fd.get('height')),
      weight: Number(fd.get('weight')),
      targetWeight: Number(fd.get('targetWeight')),
      weeklyRate: Number(fd.get('weeklyRate')),
      goal: String(fd.get('goal') || 'hypertrophy'),
      experience: String(fd.get('experience') || 'intermediate'),
      days: Number(fd.get('days')),
      minutes: Number(fd.get('minutes')),
      equipment: String(fd.get('equipment') || 'gym'),
      activity: String(fd.get('activity') || 'moderate'),
      diet: String(fd.get('diet') || 'omnivore'),
      bodyFat: fd.get('bodyFat') ? Number(fd.get('bodyFat')) : null,
      limitations: fd.getAll('limitations'),
      focus: fd.getAll('focus')
    };
    if (!p.focus.length) p.focus = ['胸', '背', '腿'];
    if (!(p.weight >= 30 && p.weight <= 250) || !(p.height >= 120 && p.height <= 230) || !(p.age >= 14 && p.age <= 90)) {
      toast('请检查年龄、身高和体重');
      return;
    }
    S.profile = p;
    if (p.weight !== oldWeight || latestLog()?.date !== isoDate()) {
      upsertWeightLog(isoDate(), p.weight, p.bodyFat, p.waist);
    }
    S.plan = generatePlan(p, Date.now());
    UI.planDay = 0;
    save();
    closeSheet();
    render();
    toast('资料已更新，计划已重新生成', 'ok');
  }

  function importDataFile(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        if (!parsed || typeof parsed !== 'object' || !parsed.profile) throw new Error('bad file');
        const base = defaultState();
        S = {
          ...base,
          ...parsed,
          profile: { ...DEFAULT_PROFILE, ...parsed.profile },
          logs: Array.isArray(parsed.logs) ? parsed.logs : [],
          sessions: Array.isArray(parsed.sessions) ? parsed.sessions : [],
          intake: parsed.intake && typeof parsed.intake === 'object' ? parsed.intake : {}
        };
        if (!S.plan) S.plan = generatePlan(S.profile, Date.now());
        save();
        closeSheet();
        render();
        toast('数据已导入', 'ok');
      } catch (err) {
        toast('导入失败：文件格式不正确');
      }
    };
    reader.readAsText(file);
  }

  /* ---------- Events ---------- */

  function navigate(view) {
    if (!VIEWS.includes(view)) return;
    if (UI.view === view && location.hash === `#${view}`) {
      render();
      resetScroll();
      return;
    }
    location.hash = `#${view}`;
  }

  function resetScroll() {
    window.scrollTo(0, 0);
    requestAnimationFrame(() => window.scrollTo(0, 0));
  }

  document.addEventListener('click', (event) => {
    if (event.target.classList && event.target.classList.contains('sheet-backdrop')) {
      closeSheet();
      return;
    }
    const el = event.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    if (action === 'nav') {
      event.preventDefault();
      navigate(el.dataset.view);
      return;
    }
    if (action !== 'toggle-set' && action !== 'set-plus' && action !== 'set-minus') {
      if (el.tagName === 'A') event.preventDefault();
    }
    switch (action) {
      case 'open-ex':
        openExercise(el.dataset.id);
        break;
      case 'toggle-demo':
        toggleExerciseMedia();
        break;
      case 'pick-form-video':
        document.getElementById('form-video')?.click();
        break;
      case 'reset-form-video':
        if (UI.analysis.videoUrl) URL.revokeObjectURL(UI.analysis.videoUrl);
        UI.analysis.videoUrl = '';
        UI.analysis.fileName = '';
        UI.analysis.result = null;
        UI.analysis.error = '';
        UI.analysis.progress = 0;
        UI.analysis.saved = false;
        refreshExerciseSheet();
        break;
      case 'analyze-form-video':
        analyzePersonalVideo();
        break;
      case 'save-analysis':
        saveAnalysis();
        break;
      case 'close-sheet':
        closeSheet();
        break;
      case 'open-research':
        navigate('research');
        break;
      case 'open-profile':
        openProfile();
        break;
      case 'lib-group':
        UI.lib.group = el.dataset.value || '全部';
        render();
        break;
      case 'lib-clear':
        UI.lib.q = '';
        render();
        document.getElementById('lib-search')?.focus();
        break;
      case 'study-tag':
        UI.studyTag = el.dataset.value || '全部';
        render();
        break;
      case 'log-range':
        UI.chartRange = el.dataset.range === 'all' ? 'all' : Number(el.dataset.range);
        render();
        break;
      case 'add-to-plan':
        addToPlan(el.dataset.id);
        break;
      case 'day-tab':
        UI.planDay = Number(el.dataset.day) || 0;
        render();
        break;
      case 'set-minus':
      case 'set-plus': {
        const day = S.plan?.days[Number(el.dataset.day)];
        const slot = day?.slots[Number(el.dataset.idx)];
        if (!slot) break;
        slot.sets = clamp(Number(slot.sets) + (action === 'set-plus' ? 1 : -1), 1, 8);
        save();
        render();
        break;
      }
      case 'swap-ex':
        swapExercise(Number(el.dataset.day), Number(el.dataset.idx));
        break;
      case 'regen-plan':
        if (!S.plan || window.confirm('重新生成会覆盖当前计划的组数和换动作调整，继续吗？')) regeneratePlan();
        break;
      case 'start-session':
        startSession(Number(el.dataset.day) || 0);
        break;
      case 'toggle-set':
        toggleSet(Number(el.dataset.ex), Number(el.dataset.set));
        break;
      case 'skip-rest':
        skipRest();
        break;
      case 'finish-session':
        finishSession();
        break;
      case 'close-session':
        closeSession(el.dataset.view || '');
        break;
      case 'focus-weight':
        navigate('log');
        setTimeout(() => {
          const input = document.getElementById('w-weight');
          if (input) {
            input.focus();
            input.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }, 180);
        break;
      case 'del-log': {
        const id = el.dataset.id;
        S.logs = S.logs.filter((l) => l.id !== id);
        const last = latestLog();
        if (last) S.profile.weight = Number(last.weight);
        save();
        render();
        toast('记录已删除');
        break;
      }
      case 'quick-add':
        quickAdd(Number(el.dataset.index));
        break;
      case 'del-intake': {
        const today = isoDate();
        S.intake[today] = (S.intake[today] || []).filter((i) => i.id !== el.dataset.id);
        save();
        render();
        break;
      }
      case 'reset-intake':
        delete S.intake[isoDate()];
        save();
        render();
        toast('今天的摄入记录已清空');
        break;
      case 'pick-photo':
        document.getElementById('food-photo')?.click();
        break;
      case 'photo-clear':
        clearPhotoState();
        render();
        break;
      case 'analyze-photo':
        analyzeFoodPhoto();
        break;
      case 'add-photo-intake':
        addPhotoToIntake();
        break;
      case 'open-onboarding':
        openOnboarding();
        break;
      case 'ob-goal':
        UI.draft.goal = el.dataset.value;
        {
          const w = Number(UI.draft.weight) || 72;
          if (UI.draft.goal === 'cut') UI.draft.targetWeight = Math.round(w * 0.92 * 10) / 10;
          else if (UI.draft.goal === 'hypertrophy' || UI.draft.goal === 'gain') UI.draft.targetWeight = Math.round(w * 1.04 * 10) / 10;
          else if (UI.draft.goal === 'strength') UI.draft.targetWeight = Math.round(w * 1.02 * 10) / 10;
          else UI.draft.targetWeight = Math.round(w * 10) / 10;
        }
        renderOnboarding();
        break;
      case 'ob-sex':
        UI.draft.sex = el.dataset.value;
        renderOnboarding();
        break;
      case 'ob-exp':
        UI.draft.experience = el.dataset.value;
        renderOnboarding();
        break;
      case 'ob-days':
        UI.draft.days = Number(el.dataset.value);
        renderOnboarding();
        break;
      case 'ob-min':
        UI.draft.minutes = Number(el.dataset.value);
        renderOnboarding();
        break;
      case 'ob-equip':
        UI.draft.equipment = el.dataset.value;
        renderOnboarding();
        break;
      case 'ob-limit': {
        const v = el.dataset.value;
        UI.draft.limitations = UI.draft.limitations.includes(v) ? UI.draft.limitations.filter((x) => x !== v) : [...UI.draft.limitations, v];
        renderOnboarding();
        break;
      }
      case 'ob-focus': {
        const v = el.dataset.value;
        UI.draft.focus = UI.draft.focus.includes(v) ? UI.draft.focus.filter((x) => x !== v) : [...UI.draft.focus, v];
        renderOnboarding();
        break;
      }
      case 'ob-diet':
        UI.draft.diet = el.dataset.value;
        renderOnboarding();
        break;
      case 'ob-next':
        onboardNext();
        break;
      case 'ob-back':
        onboardBack();
        break;
      case 'load-demo':
        loadDemo();
        break;
      case 'export-data':
        exportData();
        break;
      case 'import-data':
        document.getElementById('import-file')?.click();
        break;
      case 'reset-data':
        resetData();
        break;
      default:
        break;
    }
  });

  document.addEventListener('input', (event) => {
    const target = event.target;
    if (target.id === 'lib-search') {
      UI.lib.q = target.value;
      refreshLibraryList();
      const clear = document.querySelector('.search-clear');
      if (clear) clear.style.display = target.value ? 'grid' : 'none';
      return;
    }
    if (target.id === 'food-note') {
      UI.photo.note = target.value;
      return;
    }
    if (target.dataset && target.dataset.photoGrams != null) {
      updatePhotoGrams(Number(target.dataset.photoGrams), target.value);
      refreshPhotoResultDOM();
      return;
    }
    if (target.dataset && target.dataset.ob && UI.draft) {
      const key = target.dataset.ob;
      UI.draft[key] = target.type === 'number' ? (target.value === '' ? '' : Number(target.value)) : target.value;
    }
  });

  document.addEventListener('change', (event) => {
    const target = event.target;
    if (target.id === 'lib-equip') {
      UI.lib.equip = target.value;
      refreshLibraryList();
    } else if (target.id === 'lib-sort') {
      UI.lib.sort = target.value;
      refreshLibraryList();
    } else if (target.id === 'import-file') {
      importDataFile(target.files && target.files[0]);
    } else if (target.id === 'food-photo') {
      handlePhotoFile(target.files && target.files[0]);
    } else if (target.id === 'form-video') {
      handleFormVideo(target.files && target.files[0]);
    } else if (target.dataset && target.dataset.photoGrams != null) {
      updatePhotoGrams(Number(target.dataset.photoGrams), target.value);
      refreshPhotoResultDOM();
    }
  });

  document.addEventListener('submit', (event) => {
    event.preventDefault();
    if (event.target.id === 'weight-form') saveWeightForm(event.target);
    else if (event.target.id === 'intake-form') saveIntakeForm(event.target);
    else if (event.target.id === 'profile-form') saveProfileForm(event.target);
  });

  window.addEventListener('hashchange', () => {
    const view = routeFromHash();
    if (view === UI.view) return;
    UI.view = view;
    closeSheet();
    render();
    resetScroll();
  });

  /* ---------- Render / init ---------- */

  function render() {
    let content = '';
    if (UI.view === 'home') content = homeView();
    else if (UI.view === 'library') content = libraryView();
    else if (UI.view === 'plan') content = planView();
    else if (UI.view === 'log') content = logView();
    else if (UI.view === 'nutrition') content = nutritionView();
    else if (UI.view === 'research') content = researchView();
    else content = homeView();
    app.innerHTML = shell(content, UI.view);
    if (!S.onboarded && !onboardRoot.innerHTML) {
      openOnboarding();
    }
    if (UI.session) renderSession();
  }

  function init() {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    if (!location.hash) history.replaceState(null, '', '#home');
    UI.view = routeFromHash();
    render();
    if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) {
      navigator.serviceWorker.register('sw.js').catch(() => {});
    }
  }

  window.FORGE_DEBUG = {
    state: () => S,
    exercises: () => EX,
    generate: generatePlan,
    targets: nutritionTargets,
    render
  };

  init();
})();
