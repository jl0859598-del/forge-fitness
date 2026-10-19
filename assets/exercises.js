/* 炼 FORGE — 动作库
 * sfr: 刺激/疲劳比（1-10，训练实践评分，不是实验室指标）
 * lv: 1 入门 / 2 进阶 / 3 高阶
 * mp/ms: 人体肌群示意图高亮区域
 */
window.FORGE_EXERCISES = [
  {
    id: 'bench', n: '杠铃卧推', en: 'Barbell Bench Press', g: '胸', p: '胸大肌（中束）',
    s: ['肱三头肌', '三角肌前束'], eq: '杠铃', lv: 2, t: '复合', sfr: 9, pat: 'horizontal_push',
    mp: ['chest'], ms: ['triceps', 'front_delts'],
    cues: ['肩胛骨后缩下沉，双脚踩稳地面', '杠铃下放至胸骨下缘，前臂尽量垂直地面', '推起时手腕保持中立，肘部与躯干约 45°'],
    err: ['肘部完全外展、肩膀前顶，肩前侧压力过大', '臀部离凳或腰部过度反弓来“借力”'],
    alt: ['db-bench', 'machine-press'], avoid: [], tags: ['水平推', '自由重量']
  },
  {
    id: 'incline-bench', n: '上斜杠铃卧推', en: 'Incline Barbell Press', g: '胸', p: '胸大肌（上束）',
    s: ['三角肌前束', '肱三头肌'], eq: '杠铃', lv: 2, t: '复合', sfr: 8, pat: 'incline_push',
    mp: ['chest'], ms: ['front_delts', 'triceps'],
    cues: ['凳面约 20–30°，角度过高会让肩前束代偿', '杠铃落点在上胸锁骨下方，前臂垂直', '保持肩胛稳定，不要耸肩推起'],
    err: ['把凳子调到 45° 以上，变成肩推', '下放位置太靠脖子，肩关节压力大'],
    alt: ['incline-db', 'machine-press'], avoid: [], tags: ['上斜推', '自由重量']
  },
  {
    id: 'db-bench', n: '哑铃卧推', en: 'Dumbbell Bench Press', g: '胸', p: '胸大肌（中束）',
    s: ['肱三头肌', '三角肌前束'], eq: '哑铃', lv: 1, t: '复合', sfr: 9, pat: 'horizontal_push',
    mp: ['chest'], ms: ['triceps', 'front_delts'],
    cues: ['哑铃落在胸部两侧，肘部略低于躯干', '推起时向中间靠拢，但不要在顶端碰撞', '全程保持肩胛后缩，脚掌稳定'],
    err: ['下放过深导致肩前侧过度拉伸', '手腕后折，哑铃重心压到腕关节'],
    alt: ['bench', 'pushup'], avoid: [], tags: ['水平推', '哑铃']
  },
  {
    id: 'incline-db', n: '上斜哑铃卧推', en: 'Incline Dumbbell Press', g: '胸', p: '胸大肌（上束）',
    s: ['三角肌前束', '肱三头肌'], eq: '哑铃', lv: 2, t: '复合', sfr: 8, pat: 'incline_push',
    mp: ['chest'], ms: ['front_delts', 'triceps'],
    cues: ['凳面 20–30°，上背贴紧靠垫', '哑铃沿上胸两侧下放，肘部约 45°', '推起时想象把上臂拉向胸中线'],
    err: ['拱腰把上斜变成平板推', '哑铃下放太深、肩头前移'],
    alt: ['incline-bench', 'machine-press'], avoid: [], tags: ['上斜推', '哑铃']
  },
  {
    id: 'db-fly', n: '哑铃飞鸟', en: 'Dumbbell Fly', g: '胸', p: '胸大肌（拉伸位）',
    s: ['三角肌前束'], eq: '哑铃', lv: 1, t: '孤立', sfr: 6, pat: 'chest_iso',
    mp: ['chest'], ms: ['front_delts'],
    cues: ['肘部保持微屈并锁定角度', '以肩为轴画弧，下放到胸部有拉伸感即可', '回收时想象用胸肌把上臂合拢'],
    err: ['把飞鸟做成推举，肘角反复变化', '下放过深追求拉伸，肩前侧吃紧'],
    alt: ['cable-fly', 'pec-deck'], avoid: ['肩'], tags: ['胸部孤立', '拉伸位']
  },
  {
    id: 'cable-fly', n: '绳索夹胸', en: 'Cable Chest Fly', g: '胸', p: '胸大肌（内侧）',
    s: ['三角肌前束'], eq: '绳索', lv: 1, t: '孤立', sfr: 7, pat: 'chest_iso',
    mp: ['chest'], ms: ['front_delts'],
    cues: ['身体前倾约 10°，核心收紧', '手肘微屈，沿弧线在胸前合拢', '回放时控制 2–3 秒，不要让配重片砸回'],
    err: ['耸肩、用肩前束发力', '身体前后晃动借力'],
    alt: ['db-fly', 'pec-deck'], avoid: [], tags: ['胸部孤立', '持续张力']
  },
  {
    id: 'dips', n: '双杠臂屈伸', en: 'Chest Dips', g: '胸', p: '胸大肌（下束）',
    s: ['肱三头肌', '三角肌前束'], eq: '自重', lv: 3, t: '复合', sfr: 8, pat: 'horizontal_push',
    mp: ['chest'], ms: ['triceps', 'front_delts'],
    cues: ['身体略前倾，双腿后收', '下放到上臂接近平行地面即可', '肩胛下沉，避免肩膀耸到耳朵'],
    err: ['下放过深，肩前侧被强行拉开', '身体直立、肘部外张，变成危险的三头下压'],
    alt: ['machine-press', 'bench-dips'], avoid: ['肩', '腕'], tags: ['自重', '高阶']
  },
  {
    id: 'pushup', n: '俯卧撑', en: 'Push-Up', g: '胸', p: '胸大肌（中束）',
    s: ['肱三头肌', '三角肌前束', '核心'], eq: '自重', lv: 1, t: '复合', sfr: 8, pat: 'horizontal_push',
    mp: ['chest'], ms: ['triceps', 'front_delts', 'abs'],
    cues: ['头、背、臀、脚跟保持一条直线', '双手略宽于肩，肘部朝后 45°', '胸口接近地面后推起，顶端不要塌腰'],
    err: ['塌腰或撅臀，核心没有参与', '手肘完全向外打开'],
    alt: ['db-bench', 'machine-press'], avoid: [], tags: ['徒手', '核心参与']
  },
  {
    id: 'machine-press', n: '器械推胸', en: 'Chest Press Machine', g: '胸', p: '胸大肌（中束）',
    s: ['肱三头肌', '三角肌前束'], eq: '器械', lv: 1, t: '复合', sfr: 8, pat: 'horizontal_push',
    mp: ['chest'], ms: ['triceps', 'front_delts'],
    cues: ['调整座椅，让握把与胸中线齐平', '肩胛贴紧靠垫，推到手肘将直未直', '回放时控制，不要让配重带着手臂后弹'],
    err: ['座椅太低，肩关节被迫上抬', '顶端猛锁肘，肘关节承受冲击'],
    alt: ['db-bench', 'pushup'], avoid: [], tags: ['器械', '新手友好']
  },
  {
    id: 'pec-deck', n: '蝴蝶机夹胸', en: 'Pec Deck', g: '胸', p: '胸大肌（内侧）',
    s: ['三角肌前束'], eq: '器械', lv: 1, t: '孤立', sfr: 6, pat: 'chest_iso',
    mp: ['chest'], ms: ['front_delts'],
    cues: ['背部贴紧靠垫，肩胛稳定', '手肘保持微屈，用胸肌带动手臂合拢', '在收缩位停 1 秒，再慢慢回放'],
    err: ['肩膀前伸去够把手', '回放太快，胸肌失去张力'],
    alt: ['cable-fly', 'db-fly'], avoid: ['肩'], tags: ['胸部孤立', '器械']
  },

  {
    id: 'pullup', n: '引体向上', en: 'Pull-Up', g: '背', p: '背阔肌',
    s: ['肱二头肌', '斜方肌中下部'], eq: '自重', lv: 3, t: '复合', sfr: 9, pat: 'vertical_pull',
    mp: ['lats'], ms: ['biceps', 'upper_back'],
    cues: ['先沉肩，再把胸口拉向单杠', '手肘朝下后方拉，不要只用手臂弯举', '下放到手臂接近伸直，保持控制'],
    err: ['耸肩、脖子前伸去够杠', '身体大幅摆动，用惯性完成'],
    alt: ['lat-pulldown', 'inverted-row'], avoid: [], tags: ['垂直拉', '自重']
  },
  {
    id: 'lat-pulldown', n: '高位下拉', en: 'Lat Pulldown', g: '背', p: '背阔肌',
    s: ['肱二头肌', '斜方肌中下部'], eq: '绳索', lv: 1, t: '复合', sfr: 8, pat: 'vertical_pull',
    mp: ['lats'], ms: ['biceps', 'upper_back'],
    cues: ['胸口抬起，身体略后仰但核心稳定', '先沉肩，再把横杆拉向上胸', '回放时让肩胛向上滑，背阔肌拉长'],
    err: ['身体大幅后仰，变成划船', '拉到颈后，肩颈压力大'],
    alt: ['pullup', 'cable-row'], avoid: [], tags: ['垂直拉', '新手友好']
  },
  {
    id: 'barbell-row', n: '杠铃划船', en: 'Barbell Row', g: '背', p: '背阔肌 / 中背',
    s: ['肱二头肌', '三角肌后束', '竖脊肌'], eq: '杠铃', lv: 2, t: '复合', sfr: 8, pat: 'horizontal_pull',
    mp: ['lats', 'upper_back'], ms: ['biceps', 'rear_delts', 'lower_back'],
    cues: ['髋部后移，躯干前倾约 45°，脊柱中立', '把杠铃拉向肚脐或下肋', '顶端夹紧肩胛，回落时保持背阔肌张力'],
    err: ['腰部弓起、用身体猛甩', '只弯手臂，肩胛没有后缩'],
    alt: ['db-row', 'cable-row'], avoid: ['腰'], tags: ['水平拉', '自由重量']
  },
  {
    id: 'db-row', n: '单臂哑铃划船', en: 'One-Arm Dumbbell Row', g: '背', p: '背阔肌',
    s: ['肱二头肌', '三角肌后束'], eq: '哑铃', lv: 1, t: '复合', sfr: 9, pat: 'horizontal_pull',
    mp: ['lats', 'upper_back'], ms: ['biceps', 'rear_delts'],
    cues: ['支撑手稳定，背部保持平直', '肘部沿身体侧面拉向髋部', '顶端停 1 秒，回放时让肩胛前伸'],
    err: ['躯干旋转过大，借力甩起哑铃', '肘部向外打开，变成后束训练'],
    alt: ['cable-row', 'barbell-row'], avoid: [], tags: ['水平拉', '单侧']
  },
  {
    id: 'cable-row', n: '坐姿绳索划船', en: 'Seated Cable Row', g: '背', p: '背阔肌 / 中背',
    s: ['肱二头肌', '三角肌后束'], eq: '绳索', lv: 1, t: '复合', sfr: 8, pat: 'horizontal_pull',
    mp: ['lats', 'upper_back'], ms: ['biceps', 'rear_delts'],
    cues: ['脚掌踩稳，胸口抬起，脊柱中立', '先让肩胛后缩，再把手柄拉向腹部', '回放时控制，不要被配重拉走'],
    err: ['身体前后大幅摆动', '耸肩，用斜方肌上部代偿'],
    alt: ['db-row', 'machine-press'], avoid: [], tags: ['水平拉', '器械']
  },
  {
    id: 'tbar-row', n: 'T 杠划船', en: 'T-Bar Row', g: '背', p: '中背 / 背阔肌',
    s: ['肱二头肌', '三角肌后束', '竖脊肌'], eq: '杠铃', lv: 2, t: '复合', sfr: 8, pat: 'horizontal_pull',
    mp: ['lats', 'upper_back'], ms: ['biceps', 'rear_delts', 'lower_back'],
    cues: ['髋部后移，胸口朝向地面但保持中立', '把手柄拉向腹部，肘部贴近身体', '顶端挤压肩胛，回放时保持控制'],
    err: ['腰部代偿，躯干上下起伏', '重量过大导致每次行程变短'],
    alt: ['barbell-row', 'cable-row'], avoid: ['腰'], tags: ['水平拉', '中背']
  },
  {
    id: 'straight-arm', n: '直臂下压', en: 'Straight-Arm Pulldown', g: '背', p: '背阔肌',
    s: ['肱三头肌长头'], eq: '绳索', lv: 1, t: '孤立', sfr: 6, pat: 'lat_iso',
    mp: ['lats'], ms: ['triceps'],
    cues: ['手肘微屈并固定，身体略前倾', '用背阔肌把横杆压向大腿', '回放时让手臂举过头顶，感受背阔肌拉长'],
    err: ['手肘反复弯曲，变成三头下压', '耸肩，斜方肌抢走发力'],
    alt: ['lat-pulldown', 'cable-row'], avoid: [], tags: ['背阔肌孤立', '持续张力']
  },
  {
    id: 'face-pull', n: '面拉', en: 'Face Pull', g: '肩', p: '三角肌后束',
    s: ['斜方肌中下部', '肩袖'], eq: '绳索', lv: 1, t: '孤立', sfr: 7, pat: 'rear_delt',
    mp: ['rear_delts'], ms: ['upper_back', 'traps'],
    cues: ['绳索调到眼睛高度，手肘略高于手腕', '把绳子拉向额头两侧，同时外旋', '顶端停 1 秒，肩胛向后向下'],
    err: ['重量太大，身体后仰借力', '手肘下沉，变成高位划船'],
    alt: ['reverse-fly', 'band-pullapart'], avoid: [], tags: ['后束', '肩健康']
  },
  {
    id: 'deadlift', n: '传统硬拉', en: 'Conventional Deadlift', g: '腿', p: '臀腿后链 / 竖脊肌',
    s: ['背阔肌', '斜方肌', '前臂'], eq: '杠铃', lv: 3, t: '复合', sfr: 8, pat: 'hinge',
    mp: ['hamstrings', 'glutes', 'lower_back'], ms: ['lats', 'traps', 'forearms'],
    cues: ['杠铃在脚掌中部上方，胫骨靠近杠铃', '吸气收紧核心，背部中立，脚蹬地起身', '站直时夹臀，不要过度后仰'],
    err: ['起拉时腰背弓起、臀部先抬', '杠铃远离身体，腰部力矩变大'],
    alt: ['rdl', 'sumo-deadlift'], avoid: ['腰'], tags: ['髋铰链', '全身']
  },
  {
    id: 'rdl', n: '罗马尼亚硬拉', en: 'Romanian Deadlift', g: '腿', p: '腘绳肌 / 臀大肌',
    s: ['竖脊肌', '前臂'], eq: '杠铃', lv: 2, t: '复合', sfr: 9, pat: 'hinge',
    mp: ['hamstrings', 'glutes'], ms: ['lower_back', 'forearms'],
    cues: ['膝盖微屈并固定，髋部向后推', '杠铃贴腿下放，直到腘绳肌有明显拉伸', '脚掌踩地，髋部向前伸髋站起'],
    err: ['把动作做成深蹲，膝盖反复屈伸', '下放过低导致腰椎屈曲'],
    alt: ['single-leg-rdl', 'hip-thrust'], avoid: ['腰'], tags: ['髋铰链', '后链']
  },
  {
    id: 'inverted-row', n: '反向划船', en: 'Inverted Row', g: '背', p: '背阔肌 / 中背',
    s: ['肱二头肌', '核心'], eq: '自重', lv: 1, t: '复合', sfr: 7, pat: 'horizontal_pull',
    mp: ['lats', 'upper_back'], ms: ['biceps', 'abs'],
    cues: ['身体保持一条直线，脚跟着地', '胸口拉向横杆，肩胛后缩', '控制下放到手臂伸直'],
    err: ['髋部下沉，腰部代偿', '只用手臂拉，肩胛不动'],
    alt: ['cable-row', 'band-row'], avoid: [], tags: ['自重', '水平拉']
  },
  {
    id: 'shrug', n: '杠铃耸肩', en: 'Barbell Shrug', g: '背', p: '斜方肌上部',
    s: ['前臂'], eq: '杠铃', lv: 1, t: '孤立', sfr: 5, pat: 'shrug',
    mp: ['traps'], ms: ['forearms'],
    cues: ['手臂自然下垂，肩膀直接向上提', '顶端停 1 秒，不要滚动肩膀', '下放时控制，保持斜方肌张力'],
    err: ['用脖子前伸代替耸肩', '重量过大导致行程几乎为零'],
    alt: ['farmer-carry', 'face-pull'], avoid: [], tags: ['斜方肌', '简单有效']
  },

  {
    id: 'ohp', n: '站姿杠铃推举', en: 'Overhead Press', g: '肩', p: '三角肌前束',
    s: ['肱三头肌', '斜方肌上部', '核心'], eq: '杠铃', lv: 2, t: '复合', sfr: 8, pat: 'vertical_push',
    mp: ['front_delts'], ms: ['triceps', 'traps', 'abs'],
    cues: ['杠铃在锁骨上方，前臂垂直地面', '收紧臀部和核心，头略后让出杠铃路径', '推过头顶后主动耸肩，让肩胛上旋'],
    err: ['腰部过度反弓，把推举变成上斜卧推', '杠铃绕过头顶，肩关节路径不稳'],
    alt: ['db-shoulder-press', 'machine-shoulder'], avoid: ['肩', '腰'], tags: ['垂直推', '全身张力']
  },
  {
    id: 'db-shoulder-press', n: '坐姿哑铃推举', en: 'Seated Dumbbell Press', g: '肩', p: '三角肌前束',
    s: ['肱三头肌', '三角肌中束'], eq: '哑铃', lv: 1, t: '复合', sfr: 8, pat: 'vertical_push',
    mp: ['front_delts'], ms: ['triceps', 'side_delts'],
    cues: ['背部贴紧靠垫，哑铃在耳朵两侧', '向上推起，手腕在肘部正上方', '下放到上臂略低于水平即可'],
    err: ['下放过深导致肩前侧不适', '腰部拱起、肋骨外翻'],
    alt: ['machine-shoulder', 'ohp'], avoid: [], tags: ['垂直推', '哑铃']
  },
  {
    id: 'arnold', n: '阿诺德推举', en: 'Arnold Press', g: '肩', p: '三角肌前束 / 中束',
    s: ['肱三头肌'], eq: '哑铃', lv: 2, t: '复合', sfr: 7, pat: 'vertical_push',
    mp: ['front_delts', 'side_delts'], ms: ['triceps'],
    cues: ['起始掌心朝向自己，肘部在身体前方', '推起过程中逐渐外旋，顶端掌心向前', '回放时反向旋转，控制速度'],
    err: ['旋转过快，肩关节失去控制', '重量太大，行程只剩一半'],
    alt: ['db-shoulder-press', 'lateral-raise'], avoid: ['肩'], tags: ['垂直推', '中前束']
  },
  {
    id: 'lateral-raise', n: '哑铃侧平举', en: 'Dumbbell Lateral Raise', g: '肩', p: '三角肌中束',
    s: ['斜方肌上部'], eq: '哑铃', lv: 1, t: '孤立', sfr: 8, pat: 'lateral',
    mp: ['side_delts'], ms: ['traps'],
    cues: ['手肘微屈，向身体两侧抬起', '抬到与肩同高即可，小指略高于拇指', '想象用肘部带动，不要耸肩'],
    err: ['耸肩把斜方肌练累', '身体前后晃动甩起哑铃'],
    alt: ['cable-lateral', 'band-lateral'], avoid: [], tags: ['中束', '侧平举']
  },
  {
    id: 'cable-lateral', n: '绳索侧平举', en: 'Cable Lateral Raise', g: '肩', p: '三角肌中束',
    s: ['斜方肌上部'], eq: '绳索', lv: 1, t: '孤立', sfr: 8, pat: 'lateral',
    mp: ['side_delts'], ms: ['traps'],
    cues: ['绳索从身体前方或后方穿过', '手肘微屈，沿弧线抬到肩高', '回放时保持张力，不要让配重片碰底'],
    err: ['身体侧倾借力', '手腕高于手肘太多，变成耸肩'],
    alt: ['lateral-raise', 'band-lateral'], avoid: [], tags: ['中束', '持续张力']
  },
  {
    id: 'front-raise', n: '哑铃前平举', en: 'Dumbbell Front Raise', g: '肩', p: '三角肌前束',
    s: ['胸大肌上束'], eq: '哑铃', lv: 1, t: '孤立', sfr: 5, pat: 'front_delt',
    mp: ['front_delts'], ms: ['chest'],
    cues: ['手臂微屈，向前抬到肩高', '核心收紧，不要用腰部后仰', '控制下放，避免自由落体'],
    err: ['身体后仰借力', '抬得过高，斜方肌接管'],
    alt: ['ohp', 'lateral-raise'], avoid: [], tags: ['前束', '补充动作']
  },
  {
    id: 'reverse-fly', n: '俯身反向飞鸟', en: 'Bent-Over Reverse Fly', g: '肩', p: '三角肌后束',
    s: ['斜方肌中下部', '菱形肌'], eq: '哑铃', lv: 1, t: '孤立', sfr: 7, pat: 'rear_delt',
    mp: ['rear_delts'], ms: ['upper_back', 'traps'],
    cues: ['髋部后移，背部平直', '手肘微屈，向两侧打开手臂', '肩胛保持稳定，不要夹背过度'],
    err: ['重量太大，用腰部甩动', '肘部弯曲过多，变成划船'],
    alt: ['face-pull', 'band-pullapart'], avoid: [], tags: ['后束', '体态']
  },
  {
    id: 'machine-shoulder', n: '器械肩推', en: 'Shoulder Press Machine', g: '肩', p: '三角肌前束',
    s: ['肱三头肌', '三角肌中束'], eq: '器械', lv: 1, t: '复合', sfr: 7, pat: 'vertical_push',
    mp: ['front_delts'], ms: ['triceps', 'side_delts'],
    cues: ['调整座椅，让握把在肩部高度', '背部贴紧靠垫，向上推起', '下放时控制到上臂接近水平'],
    err: ['座椅过低导致肩关节上抬', '顶端猛锁肘'],
    alt: ['db-shoulder-press', 'ohp'], avoid: [], tags: ['垂直推', '器械']
  },

  {
    id: 'barbell-curl', n: '杠铃弯举', en: 'Barbell Curl', g: '手臂', p: '肱二头肌',
    s: ['肱肌', '前臂'], eq: '杠铃', lv: 1, t: '孤立', sfr: 7, pat: 'bicep',
    mp: ['biceps'], ms: ['forearms'],
    cues: ['手肘贴近身体两侧并固定', '弯举到前臂接近垂直，顶端收缩', '下放 2–3 秒，保持二头肌张力'],
    err: ['身体后仰甩起杠铃', '手肘向前跑，肩部代偿'],
    alt: ['cable-curl', 'alt-curl'], avoid: ['腕'], tags: ['二头肌', '自由重量']
  },
  {
    id: 'alt-curl', n: '哑铃交替弯举', en: 'Alternating Dumbbell Curl', g: '手臂', p: '肱二头肌',
    s: ['肱肌', '前臂'], eq: '哑铃', lv: 1, t: '孤立', sfr: 7, pat: 'bicep',
    mp: ['biceps'], ms: ['forearms'],
    cues: ['一侧弯举时另一侧保持稳定', '手腕中立，不要过度屈腕', '下放到底再换边'],
    err: ['两侧同时甩动，失去控制', '肩膀前移帮忙抬重量'],
    alt: ['hammer-curl', 'cable-curl'], avoid: [], tags: ['二头肌', '单侧']
  },
  {
    id: 'hammer-curl', n: '锤式弯举', en: 'Hammer Curl', g: '手臂', p: '肱肌 / 肱桡肌',
    s: ['肱二头肌', '前臂'], eq: '哑铃', lv: 1, t: '孤立', sfr: 7, pat: 'bicep',
    mp: ['biceps', 'forearms'], ms: [],
    cues: ['掌心相对握哑铃，手肘固定', '向上弯举，顶端停 1 秒', '下放时保持手腕中立'],
    err: ['手腕向内扣', '身体摆动借力'],
    alt: ['alt-curl', 'cable-curl'], avoid: [], tags: ['肱肌', '手臂围度']
  },
  {
    id: 'preacher-curl', n: '牧师凳弯举', en: 'Preacher Curl', g: '手臂', p: '肱二头肌（短头）',
    s: ['肱肌'], eq: '器械', lv: 2, t: '孤立', sfr: 7, pat: 'bicep',
    mp: ['biceps'], ms: ['forearms'],
    cues: ['上臂完全贴住斜板', '下放到接近伸直但不要锁死', '用二头肌把重量卷起'],
    err: ['下放到底时肘部突然锁死', '臀部离凳、身体上抬借力'],
    alt: ['concentration-curl', 'cable-curl'], avoid: [], tags: ['二头肌', '拉伸位']
  },
  {
    id: 'cable-curl', n: '绳索弯举', en: 'Cable Curl', g: '手臂', p: '肱二头肌',
    s: ['肱肌', '前臂'], eq: '绳索', lv: 1, t: '孤立', sfr: 7, pat: 'bicep',
    mp: ['biceps'], ms: ['forearms'],
    cues: ['手肘固定在身体两侧', '弯举到顶端挤压二头肌', '回放时控制，保持绳索张力'],
    err: ['身体后仰借力', '手肘前后移动'],
    alt: ['barbell-curl', 'hammer-curl'], avoid: [], tags: ['二头肌', '持续张力']
  },
  {
    id: 'concentration-curl', n: '集中弯举', en: 'Concentration Curl', g: '手臂', p: '肱二头肌（短头）',
    s: ['肱肌'], eq: '哑铃', lv: 1, t: '孤立', sfr: 6, pat: 'bicep',
    mp: ['biceps'], ms: ['forearms'],
    cues: ['坐姿，肘部抵住大腿内侧', '缓慢弯举，顶端停 1 秒', '下放到手臂接近伸直'],
    err: ['用肩膀带动手臂', '重量太大导致躯干旋转'],
    alt: ['preacher-curl', 'cable-curl'], avoid: [], tags: ['二头肌', '峰值收缩']
  },
  {
    id: 'pushdown', n: '绳索下压', en: 'Triceps Pushdown', g: '手臂', p: '肱三头肌',
    s: ['肘肌'], eq: '绳索', lv: 1, t: '孤立', sfr: 8, pat: 'tricep',
    mp: ['triceps'], ms: [],
    cues: ['手肘固定在身体两侧', '向下压到手臂伸直，顶端挤压三头肌', '回放时控制到前臂略高于水平'],
    err: ['手肘向外张开', '身体前倾用体重压下去'],
    alt: ['skullcrusher', 'overhead-ext'], avoid: [], tags: ['三头肌', '持续张力']
  },
  {
    id: 'skullcrusher', n: '仰卧臂屈伸', en: 'Skull Crusher', g: '手臂', p: '肱三头肌（长头）',
    s: ['肱三头肌（外侧头）'], eq: '杠铃', lv: 2, t: '孤立', sfr: 7, pat: 'tricep',
    mp: ['triceps'], ms: [],
    cues: ['上臂保持垂直地面并固定', '屈肘把杠铃下放到额头上方', '伸直手肘时不要耸肩'],
    err: ['手肘向外散开', '下放太快，肘关节压力大'],
    alt: ['overhead-ext', 'pushdown'], avoid: [], tags: ['三头肌', '长头']
  },
  {
    id: 'close-grip', n: '窄距卧推', en: 'Close-Grip Bench Press', g: '手臂', p: '肱三头肌',
    s: ['胸大肌', '三角肌前束'], eq: '杠铃', lv: 2, t: '复合', sfr: 8, pat: 'tricep',
    mp: ['triceps'], ms: ['chest', 'front_delts'],
    cues: ['握距略窄于肩，手腕保持中立', '肘部贴近身体下放', '推起时用三头肌发力，顶端不锁死'],
    err: ['握距过窄，手腕承受扭转', '肘部外张，变成普通卧推'],
    alt: ['pushdown', 'bench-dips'], avoid: ['腕'], tags: ['三头肌', '复合']
  },
  {
    id: 'overhead-ext', n: '哑铃颈后臂屈伸', en: 'Overhead Dumbbell Extension', g: '手臂', p: '肱三头肌（长头）',
    s: ['肘肌'], eq: '哑铃', lv: 1, t: '孤立', sfr: 7, pat: 'tricep',
    mp: ['triceps'], ms: ['front_delts'],
    cues: ['双手托住哑铃，手肘朝前', '下放到头后，感受三头肌拉长', '伸直手臂时保持核心稳定'],
    err: ['手肘向外张开', '腰部过度反弓'],
    alt: ['skullcrusher', 'pushdown'], avoid: ['肩'], tags: ['三头肌', '拉伸位']
  },
  {
    id: 'kickback', n: '俯身哑铃臂屈伸', en: 'Dumbbell Kickback', g: '手臂', p: '肱三头肌',
    s: ['肘肌'], eq: '哑铃', lv: 1, t: '孤立', sfr: 5, pat: 'tricep',
    mp: ['triceps'], ms: [],
    cues: ['俯身，上臂贴近躯干并固定', '向后伸直手臂，顶端挤压', '控制回放，不要甩动'],
    err: ['上臂上下移动，变成划船', '重量太大，动作幅度很小'],
    alt: ['pushdown', 'overhead-ext'], avoid: [], tags: ['三头肌', '峰值收缩']
  },
  {
    id: 'bench-dips', n: '凳上臂屈伸', en: 'Bench Dips', g: '手臂', p: '肱三头肌',
    s: ['三角肌前束', '胸大肌'], eq: '自重', lv: 1, t: '复合', sfr: 6, pat: 'tricep',
    mp: ['triceps'], ms: ['front_delts', 'chest'],
    cues: ['双手撑在凳边，指尖朝前', '屈肘下放，肘部朝后', '用三头肌推起，肩膀远离耳朵'],
    err: ['下放过深，肩前侧压力大', '身体离凳太远，肩关节被拉开'],
    alt: ['pushdown', 'close-grip'], avoid: ['肩', '腕'], tags: ['三头肌', '自重']
  },

  {
    id: 'squat', n: '杠铃深蹲', en: 'Barbell Back Squat', g: '腿', p: '股四头肌 / 臀大肌',
    s: ['腘绳肌', '竖脊肌', '核心'], eq: '杠铃', lv: 2, t: '复合', sfr: 9, pat: 'squat',
    mp: ['quads', 'glutes'], ms: ['hamstrings', 'lower_back', 'abs'],
    cues: ['脚掌踩稳，膝盖与脚尖方向一致', '髋部和膝盖同时屈曲，下蹲到大腿接近平行', '起身时脚蹬地，胸口与髋部同步上升'],
    err: ['膝盖内扣，足弓塌陷', '下蹲时腰背弓起或脚跟离地'],
    alt: ['goblet', 'leg-press'], avoid: ['膝', '腰'], tags: ['深蹲', '下肢复合']
  },
  {
    id: 'front-squat', n: '杠铃前蹲', en: 'Front Squat', g: '腿', p: '股四头肌',
    s: ['臀大肌', '核心', '上背'], eq: '杠铃', lv: 3, t: '复合', sfr: 8, pat: 'squat',
    mp: ['quads', 'glutes'], ms: ['abs', 'upper_back'],
    cues: ['杠铃放在前三角肌和锁骨上', '手肘抬高，胸口保持直立', '下蹲时膝盖向前移动，躯干尽量垂直'],
    err: ['手肘下沉，杠铃滑向前方', '脚跟离地，重心过度前移'],
    alt: ['goblet', 'hack-squat'], avoid: ['膝', '腕', '腰'], tags: ['深蹲', '股四头']
  },
  {
    id: 'hack-squat', n: '哈克深蹲', en: 'Hack Squat', g: '腿', p: '股四头肌',
    s: ['臀大肌', '腘绳肌'], eq: '器械', lv: 2, t: '复合', sfr: 8, pat: 'squat',
    mp: ['quads', 'glutes'], ms: ['hamstrings'],
    cues: ['背部贴紧靠垫，脚掌踩满踏板', '膝盖沿脚尖方向下蹲', '下放到大腿接近平行，控制起身'],
    err: ['膝盖内扣', '顶端锁死膝盖，失去张力'],
    alt: ['leg-press', 'squat'], avoid: ['膝'], tags: ['深蹲', '器械']
  },
  {
    id: 'leg-press', n: '腿举', en: 'Leg Press', g: '腿', p: '股四头肌',
    s: ['臀大肌', '腘绳肌'], eq: '器械', lv: 1, t: '复合', sfr: 7, pat: 'squat',
    mp: ['quads', 'glutes'], ms: ['hamstrings'],
    cues: ['腰背贴紧靠垫，脚掌踩在踏板中部', '下放到膝盖约 90°，不要让骨盆卷起', '脚蹬起时膝盖保持微屈'],
    err: ['下放过深导致腰部离开靠垫', '膝盖内扣或完全锁死'],
    alt: ['hack-squat', 'goblet'], avoid: [], tags: ['下肢', '器械']
  },
  {
    id: 'bulgarian', n: '保加利亚分腿蹲', en: 'Bulgarian Split Squat', g: '腿', p: '股四头肌 / 臀大肌',
    s: ['臀中肌', '核心'], eq: '哑铃', lv: 3, t: '复合', sfr: 9, pat: 'single_leg',
    mp: ['quads', 'glutes'], ms: ['abs', 'calves'],
    cues: ['后脚脚背放在凳上，前脚站稳', '前膝沿脚尖方向下沉', '躯干略前倾可增加臀部参与'],
    err: ['前脚离凳太近，膝盖压力过大', '身体左右晃动，臀中肌没有稳定'],
    alt: ['lunge', 'step-up'], avoid: ['膝'], tags: ['单腿', '臀腿']
  },
  {
    id: 'lunge', n: '哑铃箭步蹲', en: 'Dumbbell Lunge', g: '腿', p: '股四头肌 / 臀大肌',
    s: ['臀中肌', '核心'], eq: '哑铃', lv: 2, t: '复合', sfr: 8, pat: 'single_leg',
    mp: ['quads', 'glutes'], ms: ['abs', 'calves'],
    cues: ['迈步后前膝与脚尖同向', '后膝下沉接近地面，躯干保持稳定', '前脚蹬地回到站姿'],
    err: ['步幅太小，膝盖过度前移', '左右摇晃，重心不稳'],
    alt: ['step-up', 'bulgarian'], avoid: ['膝'], tags: ['单腿', '日常功能']
  },
  {
    id: 'leg-ext', n: '腿屈伸', en: 'Leg Extension', g: '腿', p: '股四头肌',
    s: [], eq: '器械', lv: 1, t: '孤立', sfr: 6, pat: 'leg_ext',
    mp: ['quads'], ms: [],
    cues: ['调整靠背，让膝关节对准转轴', '伸膝到接近伸直，顶端停 1 秒', '下放时控制，不要让配重砸下'],
    err: ['臀部离开座椅', '顶端猛甩或锁死膝盖'],
    alt: ['goblet', 'leg-press'], avoid: ['膝'], tags: ['股四头', '孤立']
  },
  {
    id: 'leg-curl', n: '腿弯举', en: 'Leg Curl', g: '腿', p: '腘绳肌',
    s: ['腓肠肌'], eq: '器械', lv: 1, t: '孤立', sfr: 7, pat: 'leg_curl',
    mp: ['hamstrings'], ms: ['calves'],
    cues: ['调整器械，让膝关节对准转轴', '用腘绳肌把脚跟拉向臀部', '回放时控制，保持髋部贴紧'],
    err: ['腰部拱起借力', '回放太快，失去张力'],
    alt: ['rdl', 'single-leg-rdl'], avoid: [], tags: ['腘绳肌', '孤立']
  },
  {
    id: 'goblet', n: '高脚杯深蹲', en: 'Goblet Squat', g: '腿', p: '股四头肌 / 臀大肌',
    s: ['核心', '上背'], eq: '哑铃', lv: 1, t: '复合', sfr: 8, pat: 'squat',
    mp: ['quads', 'glutes'], ms: ['abs', 'upper_back'],
    cues: ['哑铃抱在胸前，手肘向下', '脚掌踩稳，膝盖沿脚尖方向下蹲', '胸口抬起，蹲到大腿接近平行'],
    err: ['哑铃离开身体，腰部代偿', '脚跟离地，重心前移'],
    alt: ['squat', 'leg-press'], avoid: ['膝'], tags: ['深蹲', '新手友好']
  },
  {
    id: 'step-up', n: '哑铃台阶上步', en: 'Dumbbell Step-Up', g: '腿', p: '股四头肌 / 臀大肌',
    s: ['臀中肌', '核心'], eq: '哑铃', lv: 2, t: '复合', sfr: 8, pat: 'single_leg',
    mp: ['quads', 'glutes'], ms: ['abs', 'calves'],
    cues: ['选择膝盖约 90° 的台阶高度', '整个脚掌踩上台阶再发力站起', '下台阶时控制，不要直接跳下'],
    err: ['只用后脚蹬地借力', '膝盖内扣，骨盆不稳定'],
    alt: ['lunge', 'bulgarian'], avoid: ['膝'], tags: ['单腿', '功能训练']
  },
  {
    id: 'standing-calf', n: '站姿提踵', en: 'Standing Calf Raise', g: '腿', p: '腓肠肌',
    s: ['比目鱼肌'], eq: '器械', lv: 1, t: '孤立', sfr: 6, pat: 'calf',
    mp: ['calves'], ms: [],
    cues: ['前脚掌踩在踏板边缘，膝盖伸直', '脚跟尽量下沉，再向上提踵', '顶端停 1 秒，缓慢下放'],
    err: ['膝盖弯曲，腓肠肌失去拉伸', '弹震式完成，行程很短'],
    alt: ['seated-calf', 'leg-press'], avoid: [], tags: ['小腿', '拉伸位']
  },
  {
    id: 'seated-calf', n: '坐姿提踵', en: 'Seated Calf Raise', g: '腿', p: '比目鱼肌',
    s: ['腓肠肌'], eq: '器械', lv: 1, t: '孤立', sfr: 6, pat: 'calf',
    mp: ['calves'], ms: [],
    cues: ['膝盖弯曲约 90°，前脚掌踩稳', '脚跟下沉到有拉伸感', '提起脚跟，顶端挤压小腿'],
    err: ['动作幅度太小', '借助惯性快速弹动'],
    alt: ['standing-calf', 'leg-press'], avoid: [], tags: ['小腿', '比目鱼肌']
  },
  {
    id: 'single-leg-rdl', n: '单腿罗马尼亚硬拉', en: 'Single-Leg RDL', g: '腿', p: '腘绳肌 / 臀大肌',
    s: ['臀中肌', '核心'], eq: '哑铃', lv: 2, t: '复合', sfr: 8, pat: 'hinge',
    mp: ['hamstrings', 'glutes'], ms: ['abs'],
    cues: ['单脚站稳，另一条腿向后延伸', '髋部向后推，背部保持中立', '支撑脚脚掌踩地，伸髋站起'],
    err: ['骨盆向一侧翻转', '下放时弯腰，而不是髋部后移'],
    alt: ['rdl', 'glute-bridge'], avoid: ['腰'], tags: ['单腿', '后链']
  },
  {
    id: 'wall-sit', n: '靠墙静蹲', en: 'Wall Sit', g: '腿', p: '股四头肌',
    s: ['臀大肌', '核心'], eq: '自重', lv: 1, t: '等长', sfr: 4, pat: 'squat',
    mp: ['quads'], ms: ['glutes', 'abs'],
    cues: ['背部贴墙，膝盖约 90°', '膝盖与脚尖同向，脚掌踩稳', '保持均匀呼吸，不要憋气'],
    err: ['膝盖内扣', '蹲得过低导致膝前侧不适'],
    alt: ['leg-press', 'goblet'], avoid: ['膝'], tags: ['等长', '徒手']
  },

  {
    id: 'hip-thrust', n: '杠铃臀推', en: 'Barbell Hip Thrust', g: '臀', p: '臀大肌',
    s: ['腘绳肌', '核心'], eq: '杠铃', lv: 1, t: '复合', sfr: 9, pat: 'glute',
    mp: ['glutes'], ms: ['hamstrings', 'abs'],
    cues: ['上背靠在凳边，杠铃置于髋部', '脚跟踩地，伸髋把臀部推到躯干水平', '顶端夹臀 1 秒，不要用腰过度后仰'],
    err: ['腰椎过伸代替伸髋', '脚离身体太远，腘绳肌抢发力'],
    alt: ['glute-bridge', 'sumo-deadlift'], avoid: [], tags: ['臀部', '伸髋']
  },
  {
    id: 'glute-bridge', n: '臀桥', en: 'Glute Bridge', g: '臀', p: '臀大肌',
    s: ['腘绳肌', '核心'], eq: '自重', lv: 1, t: '复合', sfr: 6, pat: 'glute',
    mp: ['glutes'], ms: ['hamstrings', 'abs'],
    cues: ['仰卧屈膝，脚跟靠近臀部', '伸髋抬起骨盆，顶端夹臀', '下放时控制，腰部不要先落地'],
    err: ['用腰部顶起而不是伸髋', '脚离臀部太远'],
    alt: ['hip-thrust', 'frog-pump'], avoid: [], tags: ['臀部', '徒手']
  },
  {
    id: 'cable-kickback', n: '绳索后踢腿', en: 'Cable Glute Kickback', g: '臀', p: '臀大肌',
    s: ['腘绳肌'], eq: '绳索', lv: 1, t: '孤立', sfr: 5, pat: 'glute',
    mp: ['glutes'], ms: ['hamstrings'],
    cues: ['身体略前倾，核心收紧', '支撑腿微屈，工作腿向后伸髋', '顶端夹臀，回放时保持控制'],
    err: ['腰部后仰代替伸髋', '动作幅度过大导致骨盆旋转'],
    alt: ['hip-abduction', 'glute-bridge'], avoid: [], tags: ['臀部', '孤立']
  },
  {
    id: 'hip-abduction', n: '髋外展', en: 'Hip Abduction', g: '臀', p: '臀中肌',
    s: ['臀小肌'], eq: '器械', lv: 1, t: '孤立', sfr: 4, pat: 'glute',
    mp: ['glutes'], ms: [],
    cues: ['坐姿或站姿稳定，骨盆保持中立', '向两侧打开膝盖，顶端停 1 秒', '回放时控制，不要让配重撞回'],
    err: ['身体后仰借力', '只追求大开大合，失去臀部张力'],
    alt: ['cable-kickback', 'glute-bridge'], avoid: [], tags: ['臀中肌', '稳定']
  },
  {
    id: 'sumo-deadlift', n: '相扑硬拉', en: 'Sumo Deadlift', g: '腿', p: '臀大肌 / 内收肌',
    s: ['股四头肌', '竖脊肌', '前臂'], eq: '杠铃', lv: 3, t: '复合', sfr: 8, pat: 'hinge',
    mp: ['glutes', 'quads'], ms: ['hamstrings', 'lower_back', 'forearms'],
    cues: ['站距宽，脚尖略外展，膝盖对准脚尖', '胸口抬起，杠铃贴近小腿', '脚蹬地并伸髋，站直时夹臀'],
    err: ['膝盖内扣', '起拉时臀部先抬，背部失去中立'],
    alt: ['deadlift', 'hip-thrust'], avoid: ['腰', '膝'], tags: ['髋铰链', '臀部']
  },
  {
    id: 'frog-pump', n: '蛙式臀桥', en: 'Frog Pump', g: '臀', p: '臀大肌',
    s: ['髋外旋肌群'], eq: '自重', lv: 1, t: '孤立', sfr: 4, pat: 'glute',
    mp: ['glutes'], ms: [],
    cues: ['脚掌相对，膝盖向外打开', '脚跟并拢，伸髋抬起骨盆', '顶端夹臀，缓慢下放'],
    err: ['腰部过度反弓', '动作过快，臀部没有收缩'],
    alt: ['glute-bridge', 'hip-thrust'], avoid: [], tags: ['臀部', '热身']
  },

  {
    id: 'plank', n: '平板支撑', en: 'Plank', g: '核心', p: '腹横肌 / 腹直肌',
    s: ['臀大肌', '肩胛稳定肌'], eq: '自重', lv: 1, t: '等长', sfr: 6, pat: 'core',
    mp: ['abs'], ms: ['glutes', 'front_delts'],
    cues: ['手肘在肩膀正下方，前臂平行', '收紧臀部和腹部，身体保持一条直线', '均匀呼吸，不要憋气'],
    err: ['塌腰，腰椎压力增加', '臀部抬得过高，核心张力消失'],
    alt: ['deadbug', 'side-plank'], avoid: [], tags: ['核心', '等长']
  },
  {
    id: 'side-plank', n: '侧平板支撑', en: 'Side Plank', g: '核心', p: '腹斜肌 / 腰方肌',
    s: ['臀中肌', '肩胛稳定肌'], eq: '自重', lv: 1, t: '等长', sfr: 6, pat: 'core',
    mp: ['obliques'], ms: ['glutes', 'front_delts'],
    cues: ['手肘在肩膀正下方', '髋部抬起，身体侧面保持一条直线', '两侧各做相同时间'],
    err: ['髋部下沉或身体前后旋转', '肩膀耸起，颈部紧张'],
    alt: ['plank', 'russian-twist'], avoid: ['肩'], tags: ['核心', '侧链']
  },
  {
    id: 'deadbug', n: '死虫式', en: 'Dead Bug', g: '核心', p: '腹横肌 / 腹直肌',
    s: ['髋屈肌'], eq: '自重', lv: 1, t: '核心稳定', sfr: 7, pat: 'core',
    mp: ['abs'], ms: ['obliques'],
    cues: ['仰卧，腰部轻贴地面', '对侧手脚缓慢伸展，呼气收紧腹部', '回到起始位再换边'],
    err: ['腰部拱起离开地面', '动作过快，靠惯性完成'],
    alt: ['bird-dog', 'plank'], avoid: [], tags: ['核心', '腰背友好']
  },
  {
    id: 'bird-dog', n: '鸟狗式', en: 'Bird Dog', g: '核心', p: '核心稳定 / 竖脊肌',
    s: ['臀大肌', '肩胛稳定肌'], eq: '自重', lv: 1, t: '核心稳定', sfr: 6, pat: 'core',
    mp: ['abs', 'lower_back'], ms: ['glutes', 'upper_back'],
    cues: ['四点支撑，脊柱中立', '对侧手脚同时伸直，骨盆保持水平', '顶端停 2 秒再回位'],
    err: ['骨盆向一侧翻转', '腰部过度下沉或拱起'],
    alt: ['deadbug', 'plank'], avoid: [], tags: ['核心', '腰背友好']
  },
  {
    id: 'crunch', n: '卷腹', en: 'Crunch', g: '核心', p: '腹直肌',
    s: ['腹斜肌'], eq: '自重', lv: 1, t: '孤立', sfr: 4, pat: 'core',
    mp: ['abs'], ms: ['obliques'],
    cues: ['下背贴地，双手轻放耳侧', '用腹部把肩胛骨卷离地面', '顶端呼气，缓慢下放'],
    err: ['双手拉扯脖子', '用髋屈肌把整个上身抬起'],
    alt: ['cable-crunch', 'hanging-leg-raise'], avoid: [], tags: ['腹直肌', '徒手']
  },
  {
    id: 'hanging-leg-raise', n: '悬垂举腿', en: 'Hanging Leg Raise', g: '核心', p: '腹直肌下部',
    s: ['髋屈肌', '前臂'], eq: '自重', lv: 2, t: '复合', sfr: 7, pat: 'core',
    mp: ['abs'], ms: ['forearms'],
    cues: ['身体稳定悬挂，先沉肩', '骨盆后倾，把膝盖或腿抬向胸口', '下放时控制，不要摆荡'],
    err: ['身体前后摆动借力', '只抬腿不卷骨盆，髋屈肌代偿'],
    alt: ['cable-crunch', 'deadbug'], avoid: ['肩', '腰'], tags: ['核心', '高阶']
  },
  {
    id: 'cable-crunch', n: '绳索卷腹', en: 'Cable Crunch', g: '核心', p: '腹直肌',
    s: ['腹斜肌'], eq: '绳索', lv: 1, t: '孤立', sfr: 7, pat: 'core',
    mp: ['abs'], ms: ['obliques'],
    cues: ['跪姿，绳索放在头两侧', '用腹部卷曲躯干，骨盆保持稳定', '回放时让腹部拉长，不要用手臂拉'],
    err: ['用髋部前后移动', '手臂和肩膀主导发力'],
    alt: ['crunch', 'ab-wheel'], avoid: [], tags: ['腹直肌', '可负重']
  },
  {
    id: 'ab-wheel', n: '健腹轮', en: 'Ab Wheel Rollout', g: '核心', p: '腹直肌 / 腹横肌',
    s: ['背阔肌', '肩胛稳定肌'], eq: '自重', lv: 3, t: '复合', sfr: 8, pat: 'core',
    mp: ['abs'], ms: ['lats', 'front_delts'],
    cues: ['跪姿，骨盆后倾，核心收紧', '向前滚动，保持腰部不塌', '用腹部把轮子拉回'],
    err: ['腰部下沉，腰椎过伸', '滚得太远，超出控制范围'],
    alt: ['cable-crunch', 'plank'], avoid: ['腰', '肩'], tags: ['核心', '高阶']
  },
  {
    id: 'russian-twist', n: '俄罗斯转体', en: 'Russian Twist', g: '核心', p: '腹斜肌',
    s: ['腹直肌', '髋屈肌'], eq: '自重', lv: 1, t: '孤立', sfr: 4, pat: 'core',
    mp: ['obliques'], ms: ['abs'],
    cues: ['坐姿，躯干略后倾，背部保持中立', '胸口带动身体旋转，不要只转手臂', '控制速度，双脚可落地降低难度'],
    err: ['弓背旋转，腰椎压力大', '甩动哑铃或手臂，失去控制'],
    alt: ['side-plank', 'cable-crunch'], avoid: ['腰'], tags: ['腹斜肌', '旋转']
  },
  {
    id: 'farmer-carry', n: '农夫行走', en: 'Farmer Carry', g: '核心', p: '前臂 / 核心',
    s: ['斜方肌', '臀中肌'], eq: '哑铃', lv: 1, t: '负重行走', sfr: 7, pat: 'carry',
    mp: ['forearms', 'abs'], ms: ['traps', 'glutes'],
    cues: ['双手提重物，肩膀下沉', '核心收紧，步幅稳定', '保持躯干直立，不要左右倾斜'],
    err: ['耸肩、含胸', '身体向一侧倾斜，核心没有稳定'],
    alt: ['shrug', 'plank'], avoid: [], tags: ['核心', '握力']
  },

  {
    id: 'brisk-walk', n: '坡度快走', en: 'Incline Treadmill Walk', g: '有氧', p: '心肺 / 下肢',
    s: ['臀大肌', '小腿'], eq: '器械', lv: 1, t: '有氧', sfr: 5, pat: 'cardio',
    mp: ['quads', 'glutes', 'calves'], ms: ['abs'],
    cues: ['坡度 8–12%，速度以能说短句为准', '身体略前倾，不要抓扶手', '脚跟到脚尖完整落地'],
    err: ['抓着扶手把坡度走变成悬挂', '步幅过大，膝盖压力增加'],
    alt: ['run', 'bike'], avoid: [], tags: ['低冲击', '减脂']
  },
  {
    id: 'run', n: '跑步', en: 'Running', g: '有氧', p: '心肺 / 下肢',
    s: ['臀大肌', '小腿', '核心'], eq: '自重', lv: 1, t: '有氧', sfr: 6, pat: 'cardio',
    mp: ['quads', 'glutes', 'calves'], ms: ['abs', 'hamstrings'],
    cues: ['步频稳定，脚落在身体重心附近', '肩膀放松，手臂前后摆动', '从低强度开始，每周增量不超过 10%'],
    err: ['跨步过大，脚跟着地刹车', '突然增加里程，肌腱来不及适应'],
    alt: ['brisk-walk', 'bike'], avoid: ['膝'], tags: ['心肺', '耐力']
  },
  {
    id: 'bike', n: '单车', en: 'Stationary Bike', g: '有氧', p: '心肺 / 下肢',
    s: ['股四头肌', '臀大肌'], eq: '器械', lv: 1, t: '有氧', sfr: 5, pat: 'cardio',
    mp: ['quads', 'glutes'], ms: ['calves'],
    cues: ['调整座椅，脚踏最低点时膝盖微屈', '保持躯干稳定，不要左右摇摆', '用不同阻力做间歇或稳态'],
    err: ['座椅太低，膝盖过度弯曲', '阻力太小，踩着空转'],
    alt: ['brisk-walk', 'rower'], avoid: [], tags: ['低冲击', '心肺']
  },
  {
    id: 'rower', n: '划船机', en: 'Rowing Machine', g: '有氧', p: '心肺 / 全身',
    s: ['背阔肌', '股四头肌', '核心'], eq: '器械', lv: 1, t: '有氧', sfr: 7, pat: 'cardio',
    mp: ['lats', 'quads', 'abs'], ms: ['glutes', 'upper_back'],
    cues: ['顺序是腿蹬、身体后倾、手臂拉', '回程反过来：手臂、身体、腿', '保持核心稳定，不要弓背'],
    err: ['先拉手臂再蹬腿，力量顺序错误', '回程弓背，腰部压力大'],
    alt: ['bike', 'brisk-walk'], avoid: ['腰'], tags: ['全身', '低冲击']
  },
  {
    id: 'jump-rope', n: '跳绳', en: 'Jump Rope', g: '有氧', p: '心肺 / 小腿',
    s: ['前臂', '核心'], eq: '自重', lv: 2, t: '有氧', sfr: 6, pat: 'cardio',
    mp: ['calves'], ms: ['forearms', 'abs'],
    cues: ['手腕摇绳，跳跃高度 2–3 厘米', '前脚掌轻落地，膝盖微屈缓冲', '从 30 秒一组开始'],
    err: ['跳得过高，落地冲击大', '全脚掌砸地，膝盖和胫骨压力大'],
    alt: ['brisk-walk', 'bike'], avoid: ['膝'], tags: ['心肺', '协调']
  },
  {
    id: 'hiit', n: '冲刺间歇', en: 'HIIT Intervals', g: '有氧', p: '心肺 / 无氧',
    s: ['下肢', '核心'], eq: '自重', lv: 2, t: '有氧', sfr: 6, pat: 'cardio',
    mp: ['quads', 'glutes', 'abs'], ms: ['calves'],
    cues: ['充分热身 8–10 分钟', '冲刺 20–30 秒，休息 60–90 秒', '总高强度时间控制在 4–10 分钟'],
    err: ['一开始就全力，后半段动作变形', '把间歇做成每天都练，恢复不足'],
    alt: ['run', 'bike'], avoid: ['膝', '肩'], tags: ['高效', '心肺']
  },

  {
    id: 'cat-cow', n: '猫牛式', en: 'Cat-Cow', g: '灵活性', p: '脊柱活动度',
    s: ['核心', '竖脊肌'], eq: '自重', lv: 1, t: '灵活性', sfr: 5, pat: 'mobility',
    mp: ['lower_back', 'upper_back'], ms: ['abs'],
    cues: ['四点支撑，吸气抬头塌腰', '呼气拱背，逐节活动脊柱', '动作缓慢，配合呼吸'],
    err: ['只动腰部，胸椎没有参与', '动作过快，变成弹震'],
    alt: ['thoracic-rotation', 'bird-dog'], avoid: [], tags: ['热身', '脊柱']
  },
  {
    id: 'hip-flexor-stretch', n: '髋屈肌拉伸', en: 'Hip Flexor Stretch', g: '灵活性', p: '髋屈肌',
    s: ['股四头肌'], eq: '自重', lv: 1, t: '拉伸', sfr: 4, pat: 'mobility',
    mp: ['quads'], ms: ['glutes'],
    cues: ['半跪姿，后脚膝盖着地', '夹紧臀部，骨盆后倾', '身体微微前移，保持 30–45 秒'],
    err: ['腰部反弓代替髋部伸展', '前膝超过脚尖太多'],
    alt: ['cat-cow', 'hamstring-stretch'], avoid: ['膝'], tags: ['拉伸', '久坐']
  },
  {
    id: 'thoracic-rotation', n: '胸椎旋转', en: 'Thoracic Rotation', g: '灵活性', p: '胸椎活动度',
    s: ['肩胛稳定肌'], eq: '自重', lv: 1, t: '灵活性', sfr: 5, pat: 'mobility',
    mp: ['upper_back'], ms: ['rear_delts'],
    cues: ['侧卧屈膝，手臂向前伸直', '上侧手臂向天花板打开，胸口随之旋转', '呼气时增加幅度，不要强掰'],
    err: ['只转手臂，胸椎不动', '腰部代偿旋转'],
    alt: ['cat-cow', 'scap-activation'], avoid: [], tags: ['热身', '胸椎']
  },
  {
    id: 'scap-activation', n: '肩胛激活', en: 'Scapular Activation', g: '灵活性', p: '肩胛稳定',
    s: ['斜方肌中下部', '前锯肌'], eq: '自重', lv: 1, t: '激活', sfr: 5, pat: 'mobility',
    mp: ['upper_back'], ms: ['rear_delts'],
    cues: ['手臂前伸，肩胛骨向前滑再向后收', '保持手肘微屈，不要耸肩', '每个方向做 8–12 次'],
    err: ['耸肩代偿', '动作太快，肩胛没有真正移动'],
    alt: ['band-pullapart', 'face-pull'], avoid: [], tags: ['热身', '肩部']
  },
  {
    id: 'ankle-mobility', n: '踝关节活动', en: 'Ankle Mobility Drill', g: '灵活性', p: '踝关节背屈',
    s: ['小腿'], eq: '自重', lv: 1, t: '灵活性', sfr: 4, pat: 'mobility',
    mp: ['calves'], ms: [],
    cues: ['弓步跪姿，前脚掌踩稳', '膝盖向前推，脚跟不离地', '每次停 2 秒，做 8–10 次'],
    err: ['脚跟抬起', '膝盖向内扣'],
    alt: ['cat-cow', 'hip-flexor-stretch'], avoid: [], tags: ['热身', '深蹲']
  },
  {
    id: 'hamstring-stretch', n: '腘绳肌拉伸', en: 'Hamstring Stretch', g: '灵活性', p: '腘绳肌',
    s: ['小腿'], eq: '自重', lv: 1, t: '拉伸', sfr: 4, pat: 'mobility',
    mp: ['hamstrings'], ms: ['calves'],
    cues: ['坐姿或站姿，保持背部中立', '从髋部向前倾，不要弓背去够脚尖', '保持 30–45 秒，呼吸放松'],
    err: ['弹震式拉伸', '弓背硬拉，腰椎压力大'],
    alt: ['hip-flexor-stretch', 'cat-cow'], avoid: [], tags: ['拉伸', '后链']
  },

  {
    id: 'band-row', n: '弹力带划船', en: 'Band Row', g: '背', p: '背阔肌 / 中背',
    s: ['肱二头肌', '三角肌后束'], eq: '弹力带', lv: 1, t: '复合', sfr: 6, pat: 'horizontal_pull',
    mp: ['lats', 'upper_back'], ms: ['biceps', 'rear_delts'],
    cues: ['弹力带固定在与胸口同高', '先收肩胛，再把手肘拉向身体两侧', '回放时控制，保持弹力带张力'],
    err: ['身体后仰借力', '耸肩，手臂主导发力'],
    alt: ['cable-row', 'inverted-row'], avoid: [], tags: ['弹力带', '居家']
  },
  {
    id: 'band-pullapart', n: '弹力带拉开', en: 'Band Pull-Apart', g: '肩', p: '三角肌后束 / 中背',
    s: ['斜方肌中下部'], eq: '弹力带', lv: 1, t: '孤立', sfr: 6, pat: 'rear_delt',
    mp: ['rear_delts'], ms: ['upper_back', 'traps'],
    cues: ['双手与肩同高握住弹力带', '向两侧拉开，肩胛骨向后收', '顶端停 1 秒，缓慢回放'],
    err: ['耸肩', '弹力带太短，动作幅度不足'],
    alt: ['face-pull', 'reverse-fly'], avoid: [], tags: ['弹力带', '肩健康']
  },
  {
    id: 'band-lateral', n: '弹力带侧平举', en: 'Band Lateral Raise', g: '肩', p: '三角肌中束',
    s: ['斜方肌上部'], eq: '弹力带', lv: 1, t: '孤立', sfr: 5, pat: 'lateral',
    mp: ['side_delts'], ms: ['traps'],
    cues: ['脚踩弹力带，手肘微屈', '向侧上方抬到肩高', '控制下放，保持张力'],
    err: ['耸肩', '身体侧倾借力'],
    alt: ['lateral-raise', 'cable-lateral'], avoid: [], tags: ['弹力带', '中束']
  },
  {
    id: 'band-squat', n: '弹力带深蹲', en: 'Band Squat', g: '腿', p: '股四头肌 / 臀大肌',
    s: ['核心'], eq: '弹力带', lv: 1, t: '复合', sfr: 6, pat: 'squat',
    mp: ['quads', 'glutes'], ms: ['abs'],
    cues: ['脚踩弹力带，双手握住两端置于肩前', '膝盖沿脚尖方向下蹲', '脚掌蹬地站起，保持胸口抬起'],
    err: ['膝盖内扣', '拱背，重心前移'],
    alt: ['goblet', 'leg-press'], avoid: ['膝'], tags: ['弹力带', '居家']
  },
  {
    id: 'band-curl', n: '弹力带弯举', en: 'Band Curl', g: '手臂', p: '肱二头肌',
    s: ['肱肌', '前臂'], eq: '弹力带', lv: 1, t: '孤立', sfr: 5, pat: 'bicep',
    mp: ['biceps'], ms: ['forearms'],
    cues: ['脚踩弹力带，手肘固定在身体两侧', '向上弯举，顶端挤压', '缓慢回放，保持弹力带张力'],
    err: ['身体后仰借力', '手肘向前移动'],
    alt: ['cable-curl', 'hammer-curl'], avoid: [], tags: ['弹力带', '二头肌']
  },
  {
    id: 'bw-goodmorning', n: '徒手早安式', en: 'Bodyweight Good Morning', g: '腿', p: '腘绳肌 / 臀大肌',
    s: ['竖脊肌', '核心'], eq: '自重', lv: 1, t: '复合', sfr: 5, pat: 'hinge',
    mp: ['hamstrings', 'glutes'], ms: ['lower_back', 'abs'],
    cues: ['双脚与髋同宽，膝盖微屈', '髋部向后推，胸口向前，背部保持中立', '感到腘绳肌拉伸后伸髋站起'],
    err: ['弯腰代替髋部后移', '膝盖过度弯曲，变成深蹲'],
    alt: ['rdl', 'glute-bridge'], avoid: ['腰'], tags: ['居家', '髋铰链']
  },
  {
    id: 'band-press', n: '弹力带站姿推举', en: 'Band Overhead Press', g: '肩', p: '三角肌前束',
    s: ['肱三头肌', '核心'], eq: '弹力带', lv: 1, t: '复合', sfr: 5, pat: 'vertical_push',
    mp: ['front_delts'], ms: ['triceps', 'abs'],
    cues: ['脚踩弹力带，双手在肩部高度握住', '向上推起，手腕保持在肘部上方', '核心收紧，不要用腰部后仰借力'],
    err: ['弹力带太短，动作幅度不足', '腰部反弓，肋骨外翻'],
    alt: ['db-shoulder-press', 'machine-shoulder'], avoid: ['肩'], tags: ['弹力带', '居家']
  },
  {
    id: 'band-pulldown', n: '弹力带高位下拉', en: 'Band Pulldown', g: '背', p: '背阔肌',
    s: ['肱二头肌', '斜方肌中下部'], eq: '弹力带', lv: 1, t: '复合', sfr: 5, pat: 'vertical_pull',
    mp: ['lats'], ms: ['biceps', 'upper_back'],
    cues: ['弹力带固定在高处，双手握住两端', '先沉肩，再把肘部拉向身体两侧', '回放时控制，保持弹力带张力'],
    err: ['耸肩，脖子前伸', '身体后仰，用惯性拉下'],
    alt: ['lat-pulldown', 'band-row'], avoid: [], tags: ['弹力带', '居家']
  },
  {
    id: 'band-pushdown', n: '弹力带下压', en: 'Band Triceps Pushdown', g: '手臂', p: '肱三头肌',
    s: ['肘肌'], eq: '弹力带', lv: 1, t: '孤立', sfr: 5, pat: 'tricep',
    mp: ['triceps'], ms: [],
    cues: ['弹力带固定在高处，手肘贴近身体', '向下压到手臂伸直，顶端挤压三头肌', '回放时控制，不要让弹力带弹回'],
    err: ['手肘向外张开', '身体前倾用体重压下去'],
    alt: ['pushdown', 'bench-dips'], avoid: [], tags: ['弹力带', '三头肌']
  }
];
