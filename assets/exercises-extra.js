/* 炼 FORGE — 扩展动作库（在 exercises.js 之后加载）
 * 以动作家族生成 200+ 个可执行变式，保持字段结构与主库一致。
 */
(() => {
  const PAT_CUE = {
    horizontal_push: '保持肩胛稳定，推起时前臂尽量垂直地面',
    incline_push: '上背贴紧靠垫，肩胛不要前伸',
    vertical_push: '收紧核心，肋骨不要外翻，重量在头顶正上方',
    vertical_pull: '先沉肩，再把肘部拉向身体两侧',
    horizontal_pull: '先让肩胛后缩，再把肘部拉向髋部',
    lateral: '手肘微屈并领先于手腕，抬到肩高即可',
    front_delt: '核心收紧，不要用腰部后仰借力',
    rear_delt: '手肘略高于手腕，肩胛保持稳定',
    bicep: '手肘固定在身体两侧，控制下放',
    tricep: '手肘固定，伸直时不要耸肩',
    chest_iso: '手肘角度固定，用胸肌带动手臂合拢',
    lat_iso: '手肘微屈并固定，用背阔肌把重量压向身体',
    squat: '膝盖沿脚尖方向，脚掌踩稳，核心收紧',
    hinge: '髋部向后推，背部保持中立，重量贴近腿部',
    single_leg: '骨盆保持水平，前膝沿脚尖方向',
    glute: '肋骨下沉，伸髋到躯干水平，顶端夹臀',
    core: '肋骨下沉，核心收紧，保持均匀呼吸',
    leg_ext: '调整器械使膝关节对准转轴，控制回放',
    leg_curl: '髋部贴紧垫子，用腘绳肌发力',
    calf: '脚跟充分下沉，顶端停1秒',
    shrug: '肩膀直接向上提，不要滚动肩膀',
    carry: '躯干直立，核心收紧，步幅稳定',
    cardio: '保持姿势稳定，强度以能控制动作为准',
    mobility: '动作缓慢，配合呼吸，不追求疼痛范围'
  };

  const PAT_ERR = {
    horizontal_push: '手腕后折，重量压到腕关节',
    incline_push: '拱腰把上斜推变成平板推',
    vertical_push: '腰椎过度反弓，肋骨外翻',
    vertical_pull: '耸肩，脖子前伸去够重量',
    horizontal_pull: '身体前后晃动，用惯性完成',
    lateral: '耸肩，斜方肌接管发力',
    front_delt: '身体后仰，借力甩起重量',
    rear_delt: '手肘下沉，变成高位划船',
    bicep: '手肘向前跑，肩部代偿',
    tricep: '手肘向外张开，重量失控',
    chest_iso: '肩膀前伸去够重量',
    lat_iso: '手肘反复弯曲，变成三头下压',
    squat: '膝盖内扣或脚跟离地',
    hinge: '腰部弓起，重量远离身体',
    single_leg: '身体左右晃动，骨盆翻转',
    glute: '用腰椎过伸代替伸髋',
    core: '塌腰或憋气，核心张力丢失',
    leg_ext: '臀部离开座椅，顶端猛锁膝',
    leg_curl: '腰部拱起，回放太快',
    calf: '动作幅度太小，靠惯性弹动',
    shrug: '脖子前伸，重量过大导致行程不足',
    carry: '身体向一侧倾斜，核心没有稳定',
    cardio: '动作变形，强度超出可控范围',
    mobility: '弹震式拉伸，强掰关节'
  };

  const F = (key, g, p, s, mp, ms, pat, eq, lv, sfr, cue, err, alt, variants) => ({
    key, g, p, s, mp, ms, pat, eq, lv, sfr, cue, err, alt, variants
  });

  const FAM = [
    F('bench', '胸', '胸大肌（中束）', ['肱三头肌', '三角肌前束'], ['chest'], ['triceps', 'front_delts'], 'horizontal_push', '杠铃', 2, 9,
      '肩胛后缩下沉，双脚踩稳；杠铃下放至胸骨下缘，前臂尽量垂直；推起时手腕中立，肘部与躯干约45°',
      '肘部完全外展、肩前侧顶起；臀部离凳或腰部过度反弓', ['bench', 'db-bench'], [
        ['wide', '宽距杠铃卧推', 'Wide-Grip Bench Press', '杠铃', 2, 8, '握距约为肩宽1.5倍，肘部不要完全外展'],
        ['close', '窄握杠铃卧推', 'Close-Grip Bench Press', '杠铃', 2, 8, '握距与肩同宽，肘部贴近身体'],
        ['paused', '停顿卧推', 'Paused Bench Press', '杠铃', 3, 8, '杠铃在胸口停1秒再推起，不要借弹力'],
        ['floor', '地板卧推', 'Floor Press', '杠铃', 2, 7, '肘部触地后停1秒再推起']
      ]),
    F('incline', '胸', '胸大肌（上束）', ['三角肌前束', '肱三头肌'], ['chest'], ['front_delts', 'triceps'], 'incline_push', '杠铃', 2, 8,
      '凳面20–30°，上背贴紧；杠铃落点上胸锁骨下方；前臂垂直地面',
      '角度过高变成肩推；下放位置太靠脖子', ['incline-bench', 'incline-db'], [
        ['low', '低角度上斜卧推', 'Low-Incline Bench Press', '杠铃', 2, 8, '凳面约15–20°，更接近平板推'],
        ['db', '中立握上斜哑铃推', 'Neutral-Grip Incline Press', '哑铃', 2, 8, '掌心相对，肘部贴近身体'],
        ['smith', '史密斯机上斜推', 'Smith Machine Incline Press', '器械', 1, 7, '固定轨迹下仍保持肩胛稳定，不要拱腰'],
        ['machine', '上斜器械推胸', 'Incline Chest Press Machine', '器械', 1, 7, '座椅调到握把与上胸齐平']
      ]),
    F('decline', '胸', '胸大肌（下束）', ['肱三头肌', '三角肌前束'], ['chest'], ['triceps', 'front_delts'], 'horizontal_push', '杠铃', 2, 8,
      '下斜15–30°，肩胛稳定；杠铃落点在下胸；推起时不要耸肩',
      '下放太深使肩前侧压力大；臀部离凳', ['dips', 'machine-press'], [
        ['bb', '下斜杠铃卧推', 'Decline Bench Press', '杠铃', 2, 8, '双脚固定，肩胛后缩'],
        ['db', '下斜哑铃卧推', 'Decline Dumbbell Press', '哑铃', 2, 8, '哑铃沿下胸两侧下放'],
        ['machine', '下斜器械推胸', 'Decline Chest Press', '器械', 1, 7, '背部贴紧靠垫，控制回放'],
        ['pushup', '下斜俯卧撑', 'Decline Push-Up', '自重', 2, 8, '双脚垫高，身体保持一条直线']
      ]),
    F('dbpress', '胸', '胸大肌（中束）', ['肱三头肌', '三角肌前束'], ['chest'], ['triceps', 'front_delts'], 'horizontal_push', '哑铃', 1, 9,
      '哑铃落在胸部两侧，肘部略低于躯干；推起时向中间靠拢但不相撞；肩胛稳定',
      '下放过深；手腕后折，哑铃重心压到腕关节', ['db-bench', 'pushup'], [
        ['neutral', '中立握哑铃卧推', 'Neutral-Grip Dumbbell Press', '哑铃', 1, 9, '掌心相对，肘部贴近身体'],
        ['alternating', '交替哑铃卧推', 'Alternating Dumbbell Press', '哑铃', 2, 8, '一侧推起时另一侧保持稳定'],
        ['squeeze', '哑铃夹胸推', 'Squeeze Press', '哑铃', 2, 8, '两只哑铃相互挤压，保持胸肌张力'],
        ['onearm', '单臂哑铃卧推', 'One-Arm Dumbbell Press', '哑铃', 3, 8, '核心抗旋转，骨盆保持稳定']
      ]),
    F('pushup', '胸', '胸大肌（中束）', ['肱三头肌', '核心'], ['chest'], ['triceps', 'abs'], 'horizontal_push', '自重', 1, 8,
      '头、背、臀、脚跟保持一条直线；双手略宽于肩；胸口接近地面后推起',
      '塌腰或撅臀；手肘完全向外打开', ['pushup', 'machine-press'], [
        ['wide', '宽距俯卧撑', 'Wide Push-Up', '自重', 1, 8, '双手约1.5倍肩宽，肘部朝后45°'],
        ['diamond', '钻石俯卧撑', 'Diamond Push-Up', '自重', 2, 7, '双手拇指食指相触，肘部贴近身体'],
        ['decline', '下斜俯卧撑', 'Decline Push-Up', '自重', 2, 8, '双脚垫高，核心收紧'],
        ['archer', '弓箭手俯卧撑', 'Archer Push-Up', '自重', 3, 8, '重心移向一侧，另一侧手臂伸直']
      ]),
    F('fly', '胸', '胸大肌（拉伸位）', ['三角肌前束'], ['chest'], ['front_delts'], 'chest_iso', '哑铃', 1, 6,
      '手肘微屈并锁定角度；以肩为轴画弧；回收时用胸肌把上臂合拢',
      '把飞鸟做成推举；下放过深追求拉伸', ['cable-fly', 'pec-deck'], [
        ['incline', '上斜哑铃飞鸟', 'Incline Dumbbell Fly', '哑铃', 1, 6, '凳面20–30°，下放到胸部有拉伸即可'],
        ['high', '高位绳索夹胸', 'High Cable Fly', '绳索', 1, 7, '滑轮高于肩，向下向内夹'],
        ['low', '低位绳索夹胸', 'Low Cable Fly', '绳索', 1, 7, '滑轮低于肩，向上向内夹'],
        ['reverse', '蝴蝶机反向夹胸', 'Reverse Pec Deck', '器械', 1, 7, '反向坐姿，重点在后束与上背']
      ]),
    F('pullover', '胸', '胸大肌 / 背阔肌', ['肱三头肌长头', '前锯肌'], ['chest', 'lats'], ['triceps'], 'chest_iso', '哑铃', 2, 7,
      '手肘微屈，肩胛稳定；沿头后下放；用胸背发力拉回',
      '下放过深使肩前侧压力大；腰部过度反弓', ['straight-arm', 'cable-fly'], [
        ['db', '哑铃仰卧上拉', 'Dumbbell Pullover', '哑铃', 2, 7, '下放到上臂与躯干同高即可'],
        ['cable', '绳索直臂上拉', 'Cable Pullover', '绳索', 1, 7, '身体前倾，手肘固定'],
        ['machine', '器械上拉', 'Machine Pullover', '器械', 1, 7, '背部贴紧靠垫，控制回放'],
        ['band', '弹力带上拉', 'Band Pullover', '弹力带', 1, 6, '弹力带固定在高处，保持张力']
      ]),

    F('pulldown', '背', '背阔肌', ['肱二头肌', '斜方肌中下部'], ['lats'], ['biceps', 'upper_back'], 'vertical_pull', '绳索', 1, 8,
      '胸口抬起，身体略后仰；先沉肩，再把横杆拉向上胸；回放时让肩胛上滑',
      '身体大幅后仰；拉到颈后', ['lat-pulldown', 'band-pulldown'], [
        ['wide', '宽握高位下拉', 'Wide-Grip Pulldown', '绳索', 1, 8, '握距约1.5倍肩宽，肘部向下后方'],
        ['close', '窄握高位下拉', 'Close-Grip Pulldown', '绳索', 1, 8, '双手窄握，手肘贴近身体'],
        ['neutral', '对握高位下拉', 'Neutral-Grip Pulldown', '绳索', 1, 8, '掌心相对，肘部向下'],
        ['single', '单臂高位下拉', 'Single-Arm Pulldown', '绳索', 2, 8, '单侧拉伸更充分，躯干保持稳定']
      ]),
    F('pullup', '背', '背阔肌', ['肱二头肌', '斜方肌中下部'], ['lats'], ['biceps', 'upper_back'], 'vertical_pull', '自重', 3, 9,
      '先沉肩，再把胸口拉向单杠；手肘朝下后方；下放控制',
      '耸肩、脖子前伸；身体大幅摆动', ['pullup', 'lat-pulldown'], [
        ['wide', '宽握引体向上', 'Wide-Grip Pull-Up', '自重', 3, 9, '握距约1.5倍肩宽，胸口向上'],
        ['close', '窄握引体向上', 'Close-Grip Pull-Up', '自重', 3, 9, '双手窄握，手肘向下'],
        ['neutral', '对握引体向上', 'Neutral-Grip Pull-Up', '自重', 3, 9, '掌心相对，肩胛稳定'],
        ['assisted', '弹力带辅助引体', 'Band-Assisted Pull-Up', '弹力带', 1, 7, '弹力带踩在脚下，控制下放']
      ]),
    F('row', '背', '背阔肌 / 中背', ['肱二头肌', '三角肌后束'], ['lats', 'upper_back'], ['biceps', 'rear_delts'], 'horizontal_pull', '绳索', 1, 8,
      '先收肩胛，再把手肘拉向身体；躯干保持稳定；回放控制',
      '身体后仰借力；耸肩，用斜方肌上部代偿', ['cable-row', 'db-row'], [
        ['chest', '胸支撑划船', 'Chest-Supported Row', '器械', 1, 8, '胸部贴垫，避免腰部代偿'],
        ['wide', '宽握坐姿划船', 'Wide-Grip Seated Row', '绳索', 1, 8, '手肘向外打开，重点中背'],
        ['single', '单臂绳索划船', 'Single-Arm Cable Row', '绳索', 1, 8, '躯干稳定，单侧充分拉伸'],
        ['landmine', '地雷管划船', 'Landmine Row', '杠铃', 2, 8, '身体前倾，杠铃拉向腹部']
      ]),
    F('barbrow', '背', '背阔肌 / 中背', ['肱二头肌', '三角肌后束', '竖脊肌'], ['lats', 'upper_back'], ['biceps', 'rear_delts', 'lower_back'], 'horizontal_pull', '杠铃', 2, 8,
      '髋部后移，躯干前倾约45°；杠铃拉向肚脐；脊柱保持中立',
      '腰部弓起；用身体猛甩', ['barbell-row', 'tbar-row'], [
        ['pendlay', 'Pendlay 划船', 'Pendlay Row', '杠铃', 3, 8, '每次从地面重新起拉'],
        ['yates', '耶茨划船', 'Yates Row', '杠铃', 2, 8, '躯干更直立，反握拉向下腹'],
        ['underhand', '反握杠铃划船', 'Underhand Barbell Row', '杠铃', 2, 8, '掌心向前，手肘贴身'],
        ['seal', '海豹划船', 'Seal Row', '杠铃', 2, 8, '胸部贴凳，减少腿部借力']
      ]),
    F('deadlift', '腿', '臀腿后链 / 竖脊肌', ['背阔肌', '斜方肌', '前臂'], ['hamstrings', 'glutes', 'lower_back'], ['lats', 'traps', 'forearms'], 'hinge', '杠铃', 3, 8,
      '杠铃在脚掌中部上方；吸气收紧核心；脚蹬地起身',
      '腰背弓起；杠铃远离身体，腰部力矩变大', ['deadlift', 'rdl'], [
        ['sumo', '相扑硬拉', 'Sumo Deadlift', '杠铃', 3, 8, '宽站距，膝盖对准脚尖'],
        ['deficit', '赤字硬拉', 'Deficit Deadlift', '杠铃', 3, 8, '站在2–5厘米垫板上，增加起始幅度'],
        ['rack', '架上硬拉', 'Rack Pull', '杠铃', 2, 7, '杠铃从膝盖上方起拉'],
        ['trap', '六角杠硬拉', 'Trap Bar Deadlift', '杠铃', 2, 8, '站在六角杠内，躯干更直立']
      ]),
    F('facepull', '肩', '三角肌后束', ['斜方肌中下部', '肩袖'], ['rear_delts'], ['upper_back', 'traps'], 'rear_delt', '绳索', 1, 7,
      '绳索在眼睛高度；手肘高于手腕；拉向额头两侧',
      '身体后仰；手肘下沉变成高位划船', ['face-pull', 'reverse-fly'], [
        ['high', '高位面拉', 'High Face Pull', '绳索', 1, 7, '滑轮略高于眼睛，向额头方向拉'],
        ['low', '低位面拉', 'Low Face Pull', '绳索', 1, 6, '滑轮在胸口高度，向上向外拉'],
        ['seated', '坐姿面拉', 'Seated Face Pull', '绳索', 1, 7, '坐姿固定躯干，减少借力'],
        ['single', '单臂面拉', 'Single-Arm Face Pull', '绳索', 2, 7, '单侧外旋更充分，躯干稳定']
      ]),
    F('straightarm', '背', '背阔肌', ['肱三头肌长头'], ['lats'], ['triceps'], 'lat_iso', '绳索', 1, 6,
      '手肘微屈固定；身体略前倾；用背阔肌把重量压向身体',
      '手肘反复弯曲；耸肩', ['straight-arm', 'lat-pulldown'], [
        ['cable', '绳索直臂下压', 'Cable Straight-Arm Pulldown', '绳索', 1, 6, '绳索从高处向下压'],
        ['band', '弹力带直臂下压', 'Band Straight-Arm Pulldown', '弹力带', 1, 5, '弹力带固定在高处，保持张力'],
        ['db', '哑铃仰卧直臂上拉', 'Dumbbell Straight-Arm Pullover', '哑铃', 2, 6, '仰卧，手臂接近伸直'],
        ['rope', '绳索直臂下拉', 'Rope Straight-Arm Pulldown', '绳索', 1, 6, '双手握绳，手肘固定']
      ]),
    F('backext', '背', '竖脊肌 / 臀大肌', ['腘绳肌', '核心'], ['lower_back', 'glutes'], ['hamstrings', 'abs'], 'hinge', '器械', 1, 6,
      '髋部为轴，背部中立；下放到腘绳肌有拉伸；伸髋起身',
      '腰椎过伸；动作过快', ['bird-dog', 'rdl'], [
        ['45', '45度背伸', '45-Degree Back Extension', '器械', 1, 6, '髋部靠在垫子上，脊柱中立'],
        ['floor', '地面背伸', 'Floor Back Extension', '自重', 1, 5, '俯卧，双手轻放耳侧'],
        ['machine', '器械背伸', 'Machine Back Extension', '器械', 1, 6, '调整转轴与髋部对齐'],
        ['reverse', '反向挺身', 'Reverse Hyperextension', '器械', 2, 6, '用臀部和腘绳肌抬起双腿']
      ]),

    F('press', '肩', '三角肌前束', ['肱三头肌', '斜方肌上部'], ['front_delts'], ['triceps', 'traps'], 'vertical_push', '哑铃', 1, 8,
      '背部贴紧靠垫，哑铃在耳朵两侧；手腕在肘部正上方；下放到上臂略低于水平',
      '下放过深导致肩前侧不适；腰部拱起', ['db-shoulder-press', 'machine-shoulder'], [
        ['db', '坐姿哑铃推举', 'Seated Dumbbell Press', '哑铃', 1, 8, '掌心向前，肘部略在身体前方'],
        ['arnold', '阿诺德推举', 'Arnold Press', '哑铃', 2, 7, '起始掌心朝向自己，推起时逐渐外旋'],
        ['machine', '器械肩推', 'Machine Shoulder Press', '器械', 1, 7, '座椅调到握把与肩同高'],
        ['landmine', '地雷管推举', 'Landmine Press', '杠铃', 2, 7, '单臂斜向上推，核心抗旋转']
      ]),
    F('lateral', '肩', '三角肌中束', ['斜方肌上部'], ['side_delts'], ['traps'], 'lateral', '哑铃', 1, 8,
      '手肘微屈，向身体两侧抬起；抬到与肩同高即可；想象用肘部带动',
      '耸肩把斜方肌练累；身体前后晃动', ['lateral-raise', 'cable-lateral'], [
        ['cable', '单臂绳索侧平举', 'Single-Arm Cable Lateral Raise', '绳索', 1, 8, '绳索从身体前方穿过，保持张力'],
        ['machine', '器械侧平举', 'Machine Lateral Raise', '器械', 1, 7, '调整座椅，让肩关节与转轴对齐'],
        ['leaning', '倾斜侧平举', 'Leaning Lateral Raise', '哑铃', 2, 8, '扶住固定物，身体略侧倾'],
        ['seated', '坐姿侧平举', 'Seated Lateral Raise', '哑铃', 1, 8, '坐姿减少身体借力']
      ]),
    F('frontraise', '肩', '三角肌前束', ['胸大肌上束'], ['front_delts'], ['chest'], 'front_delt', '哑铃', 1, 5,
      '手臂微屈，向前抬到肩高；核心收紧；控制下放',
      '身体后仰借力；抬得过高让斜方肌接管', ['front-raise', 'ohp'], [
        ['cable', '绳索前平举', 'Cable Front Raise', '绳索', 1, 5, '背对滑轮，向前抬到肩高'],
        ['plate', '杠铃片前平举', 'Plate Front Raise', '杠铃', 1, 5, '双手夹住杠铃片，控制下放'],
        ['band', '弹力带前平举', 'Band Front Raise', '弹力带', 1, 4, '脚踩弹力带，保持张力'],
        ['machine', '器械前平举', 'Machine Front Raise', '器械', 1, 5, '背部贴垫，避免身体后仰']
      ]),
    F('reardelt', '肩', '三角肌后束', ['斜方肌中下部', '菱形肌'], ['rear_delts'], ['upper_back', 'traps'], 'rear_delt', '哑铃', 1, 7,
      '髋部后移，背部平直；手肘微屈向两侧打开；肩胛保持稳定',
      '重量太大用腰部甩动；肘部弯曲过多变成划船', ['reverse-fly', 'face-pull'], [
        ['machine', '蝴蝶机反向飞鸟', 'Reverse Pec Deck', '器械', 1, 7, '胸部贴垫，手臂向两侧打开'],
        ['cable', '绳索反向飞鸟', 'Cable Reverse Fly', '绳索', 1, 7, '双手交叉握绳，向两侧拉开'],
        ['prone', '俯卧反向飞鸟', 'Prone Reverse Fly', '哑铃', 1, 6, '俯卧在凳上，减少借力'],
        ['seated', '坐姿反向飞鸟', 'Seated Reverse Fly', '哑铃', 1, 6, '坐姿前倾，胸口靠近大腿']
      ]),
    F('uprightrow', '肩', '三角肌中束 / 斜方肌', ['肱二头肌'], ['side_delts', 'traps'], ['biceps'], 'lateral', '杠铃', 2, 7,
      '双手与肩同宽，沿身体向上提；手肘高于手腕；提到胸口高度即可',
      '提得过高导致肩峰撞击；身体后仰借力', ['lateral-raise', 'face-pull'], [
        ['bb', '杠铃直立划船', 'Barbell Upright Row', '杠铃', 2, 7, '握距略宽于肩，肘部领先'],
        ['cable', '绳索直立划船', 'Cable Upright Row', '绳索', 1, 6, '绳索从低位向上拉'],
        ['db', '哑铃直立划船', 'Dumbbell Upright Row', '哑铃', 1, 6, '哑铃贴近身体，肘部向外'],
        ['machine', '器械直立划船', 'Machine Upright Row', '器械', 1, 6, '固定轨迹下控制幅度']
      ]),
    F('pike', '肩', '三角肌前束', ['肱三头肌', '核心'], ['front_delts'], ['triceps', 'abs'], 'vertical_push', '自重', 3, 8,
      '臀部下压成倒V形；头部向双手之间下落；用肩部推起',
      '头部撞地；肘部完全外展', ['pushup', 'ohp'], [
        ['standard', '折刀俯卧撑', 'Pike Push-Up', '自重', 3, 8, '臀部抬高，头部垂直下落'],
        ['elevated', '垫高折刀俯卧撑', 'Elevated Pike Push-Up', '自重', 3, 8, '双脚垫高，增加肩部负荷'],
        ['deficit', '赤字折刀俯卧撑', 'Deficit Pike Push-Up', '自重', 3, 7, '双手垫高，增加活动范围'],
        ['wall', '靠墙倒立撑', 'Wall Handstand Push-Up', '自重', 3, 8, '靠墙倒立，头部轻触地面']
      ], { t: '复合', avoid: ['肩', '腕'] }),

    F('curl', '手臂', '肱二头肌', ['肱肌', '前臂'], ['biceps'], ['forearms'], 'bicep', '哑铃', 1, 7,
      '手肘贴近身体并固定；弯举到前臂接近垂直；下放2–3秒',
      '身体后仰甩起重量；手肘向前跑', ['barbell-curl', 'cable-curl'], [
        ['incline', '上斜哑铃弯举', 'Incline Dumbbell Curl', '哑铃', 2, 7, '上臂在身体后方，增加拉伸'],
        ['preacher', '牧师凳弯举', 'Preacher Curl', '器械', 2, 7, '上臂完全贴住斜板'],
        ['spider', '蜘蛛弯举', 'Spider Curl', '哑铃', 2, 7, '俯卧斜板，手臂垂直向下'],
        ['cable', '绳索弯举', 'Cable Curl', '绳索', 1, 7, '手肘固定，保持绳索张力']
      ]),
    F('hammer', '手臂', '肱肌 / 肱桡肌', ['肱二头肌', '前臂'], ['biceps', 'forearms'], [], 'bicep', '哑铃', 1, 7,
      '掌心相对握哑铃，手肘固定；向上弯举；顶端停1秒',
      '手腕向内扣；身体摆动借力', ['hammer-curl', 'alt-curl'], [
        ['cross', '交叉锤式弯举', 'Cross-Body Hammer Curl', '哑铃', 1, 7, '哑铃向对侧肩膀弯举'],
        ['rope', '绳索锤式弯举', 'Rope Hammer Curl', '绳索', 1, 7, '双手握绳，掌心相对'],
        ['incline', '上斜锤式弯举', 'Incline Hammer Curl', '哑铃', 2, 7, '上臂在身体后方，拉伸肱肌'],
        ['reverse', '反握弯举', 'Reverse Curl', '杠铃', 1, 6, '掌心向下，手腕保持中立']
      ]),
    F('pushdown', '手臂', '肱三头肌', ['肘肌'], ['triceps'], [], 'tricep', '绳索', 1, 8,
      '手肘固定在身体两侧；向下压到手臂伸直；回放控制',
      '手肘向外张开；身体前倾用体重压下去', ['pushdown', 'band-pushdown'], [
        ['rope', '绳索下压', 'Rope Pushdown', '绳索', 1, 8, '双手握绳，顶端向两侧分开'],
        ['bar', '直杆下压', 'Bar Pushdown', '绳索', 1, 8, '直杆下压，手腕中立'],
        ['single', '单臂绳索下压', 'Single-Arm Pushdown', '绳索', 1, 7, '单侧手肘贴近身体'],
        ['reverse', '反握绳索下压', 'Reverse-Grip Pushdown', '绳索', 1, 7, '掌心向上，重点内侧头']
      ]),
    F('skull', '手臂', '肱三头肌（长头）', ['肱三头肌（外侧头）'], ['triceps'], [], 'tricep', '杠铃', 2, 7,
      '上臂垂直地面并固定；屈肘把重量下放到额头上方；伸直时不要耸肩',
      '手肘向外散开；下放太快', ['skullcrusher', 'overhead-ext'], [
        ['ez', 'EZ杆仰卧臂屈伸', 'EZ-Bar Skull Crusher', '杠铃', 2, 7, 'EZ杆减轻手腕压力'],
        ['db', '哑铃仰卧臂屈伸', 'Dumbbell Skull Crusher', '哑铃', 1, 7, '双手托住哑铃，手肘朝前'],
        ['cable', '绳索仰卧臂屈伸', 'Cable Skull Crusher', '绳索', 1, 7, '绳索保持张力，控制回放'],
        ['floor', '地板臂屈伸', 'Floor Triceps Extension', '杠铃', 1, 6, '上臂贴地，肘部触地后伸直']
      ]),
    F('overheadext', '手臂', '肱三头肌（长头）', ['肘肌'], ['triceps'], ['front_delts'], 'tricep', '哑铃', 1, 7,
      '双手托住重量，手肘朝前；下放到头后；伸直时核心稳定',
      '手肘向外张开；腰部过度反弓', ['overhead-ext', 'pushdown'], [
        ['cable', '绳索颈后臂屈伸', 'Cable Overhead Extension', '绳索', 1, 7, '背对滑轮，手肘朝前'],
        ['band', '弹力带颈后臂屈伸', 'Band Overhead Extension', '弹力带', 1, 6, '弹力带踩在脚下，保持张力'],
        ['single', '单臂颈后臂屈伸', 'Single-Arm Overhead Extension', '哑铃', 1, 7, '单侧手肘贴近耳朵'],
        ['rope', '绳索过头臂屈伸', 'Rope Overhead Extension', '绳索', 1, 7, '双手握绳，向两侧分开']
      ]),
    F('closegrip', '手臂', '肱三头肌', ['胸大肌', '三角肌前束'], ['triceps'], ['chest', 'front_delts'], 'tricep', '杠铃', 2, 8,
      '握距略窄于肩，手腕中立；肘部贴近身体下放；推起时用三头肌发力',
      '握距过窄手腕扭转；肘部外张', ['close-grip', 'pushdown'], [
        ['smith', '史密斯机窄推', 'Smith Machine Close-Grip Press', '器械', 1, 7, '固定轨迹，肘部贴近身体'],
        ['db', '哑铃窄推', 'Dumbbell Close-Grip Press', '哑铃', 2, 7, '哑铃并拢，肘部贴身'],
        ['floor', '地板窄推', 'Floor Close-Grip Press', '杠铃', 2, 7, '上臂触地后停1秒'],
        ['tempo', '慢速窄推', 'Tempo Close-Grip Press', '杠铃', 2, 7, '下放3秒，推起控制']
      ]),
    F('kickback', '手臂', '肱三头肌', ['肘肌'], ['triceps'], [], 'tricep', '哑铃', 1, 5,
      '俯身，上臂贴近躯干并固定；向后伸直手臂；顶端挤压',
      '上臂上下移动变成划船；重量太大行程很小', ['kickback', 'pushdown'], [
        ['cable', '绳索三头后踢', 'Cable Triceps Kickback', '绳索', 1, 5, '绳索从低位向后伸'],
        ['band', '弹力带臂屈伸', 'Band Triceps Kickback', '弹力带', 1, 4, '弹力带固定在前方，向后伸'],
        ['incline', '上斜哑铃臂屈伸', 'Incline Dumbbell Kickback', '哑铃', 1, 5, '胸部贴斜板，上臂固定'],
        ['machine', '器械臂屈伸', 'Machine Triceps Kickback', '器械', 1, 5, '固定轨迹，控制顶端']
      ]),

    F('squat', '腿', '股四头肌 / 臀大肌', ['腘绳肌', '竖脊肌'], ['quads', 'glutes'], ['hamstrings', 'lower_back'], 'squat', '杠铃', 2, 9,
      '脚掌踩稳，膝盖与脚尖方向一致；髋膝同时屈曲；起身时脚蹬地',
      '膝盖内扣、足弓塌陷；腰背弓起或脚跟离地', ['squat', 'goblet'], [
        ['front', '杠铃前蹲', 'Front Squat', '杠铃', 3, 8, '手肘抬高，胸口保持直立'],
        ['box', '箱式深蹲', 'Box Squat', '杠铃', 2, 8, '臀部轻触箱子后起身，不要坐实'],
        ['pause', '停顿深蹲', 'Pause Squat', '杠铃', 3, 8, '底部停2秒，保持核心张力'],
        ['tempo', '慢速深蹲', 'Tempo Squat', '杠铃', 2, 8, '下放3秒，起身控制']
      ], { avoid: ['膝', '腰'] }),
    F('lunge', '腿', '股四头肌 / 臀大肌', ['臀中肌', '核心'], ['quads', 'glutes'], ['abs', 'calves'], 'single_leg', '哑铃', 2, 8,
      '迈步后前膝与脚尖同向；后膝下沉接近地面；前脚蹬地回到站姿',
      '步幅太小膝盖过度前移；左右摇晃', ['lunge', 'step-up'], [
        ['reverse', '反向箭步蹲', 'Reverse Lunge', '哑铃', 2, 8, '向后迈步，前膝压力更小'],
        ['walking', '行走箭步蹲', 'Walking Lunge', '哑铃', 2, 8, '连续向前迈步，保持躯干稳定'],
        ['lateral', '侧向箭步蹲', 'Lateral Lunge', '哑铃', 2, 8, '向侧面迈步，髋部后坐'],
        ['curtsy', '屈膝礼箭步蹲', 'Curtsy Lunge', '哑铃', 3, 8, '后腿斜向另一侧，骨盆保持稳定']
      ], { avoid: ['膝'] }),
    F('split', '腿', '股四头肌 / 臀大肌', ['臀中肌', '核心'], ['quads', 'glutes'], ['abs'], 'single_leg', '哑铃', 3, 9,
      '前脚站稳，后脚支撑；前膝沿脚尖下沉；躯干保持稳定',
      '前脚离凳太近膝盖压力大；骨盆左右晃动', ['bulgarian', 'lunge'], [
        ['bulgarian', '保加利亚分腿蹲', 'Bulgarian Split Squat', '哑铃', 3, 9, '后脚脚背放在凳上'],
        ['frontup', '前脚垫高分腿蹲', 'Front-Foot Elevated Split Squat', '哑铃', 3, 8, '前脚垫高，增加活动范围'],
        ['deficit', '赤字分腿蹲', 'Deficit Split Squat', '哑铃', 3, 8, '前脚踩在垫板上，控制下沉'],
        ['iso', '静态分腿蹲', 'Isometric Split Squat', '自重', 1, 5, '保持半蹲位30–45秒']
      ], { avoid: ['膝'] }),
    F('legpress', '腿', '股四头肌', ['臀大肌', '腘绳肌'], ['quads', 'glutes'], ['hamstrings'], 'squat', '器械', 1, 7,
      '腰背贴紧靠垫；脚掌踩稳踏板；下放到膝盖约90°',
      '下放过深骨盆卷起；膝盖内扣或完全锁死', ['leg-press', 'hack-squat'], [
        ['single', '单腿腿举', 'Single-Leg Press', '器械', 2, 7, '单腿踩在踏板中部，骨盆稳定'],
        ['high', '高脚位腿举', 'High-Foot Leg Press', '器械', 1, 7, '脚位偏高，增加臀部参与'],
        ['low', '低脚位腿举', 'Low-Foot Leg Press', '器械', 2, 7, '脚位偏低，增加股四头参与'],
        ['narrow', '窄距腿举', 'Narrow-Stance Leg Press', '器械', 1, 7, '双脚靠近，膝盖沿脚尖']
      ]),
    F('legext', '腿', '股四头肌', [], ['quads'], [], 'leg_ext', '器械', 1, 6,
      '调整靠背使膝关节对准转轴；伸膝到接近伸直；控制回放',
      '臀部离开座椅；顶端猛锁膝', ['leg-ext', 'leg-press'], [
        ['single', '单腿腿屈伸', 'Single-Leg Extension', '器械', 1, 6, '单腿完成，骨盆保持稳定'],
        ['slow', '慢速腿屈伸', 'Slow Leg Extension', '器械', 1, 6, '下放3秒，顶端停1秒'],
        ['band', '弹力带腿屈伸', 'Band Leg Extension', '弹力带', 1, 5, '弹力带固定在脚踝后方'],
        ['machine', '器械腿屈伸', 'Machine Leg Extension', '器械', 1, 6, '调整座椅与转轴对齐']
      ], { avoid: ['膝'] }),
    F('legcurl', '腿', '腘绳肌', ['腓肠肌'], ['hamstrings'], ['calves'], 'leg_curl', '器械', 1, 7,
      '髋部贴紧垫子；用腘绳肌把脚跟拉向臀部；回放控制',
      '腰部拱起；回放太快失去张力', ['leg-curl', 'rdl'], [
        ['seated', '坐姿腿弯举', 'Seated Leg Curl', '器械', 1, 7, '坐姿固定大腿，脚跟向下拉'],
        ['standing', '站姿腿弯举', 'Standing Leg Curl', '器械', 1, 7, '单腿站立，髋部保持稳定'],
        ['single', '单腿腿弯举', 'Single-Leg Curl', '器械', 1, 7, '单侧完成，避免骨盆旋转'],
        ['nordic', '北欧腿弯举', 'Nordic Hamstring Curl', '自重', 3, 8, '身体缓慢前倾，腘绳肌离心控制']
      ]),
    F('calf', '腿', '腓肠肌', ['比目鱼肌'], ['calves'], [], 'calf', '器械', 1, 6,
      '前脚掌踩在踏板边缘；脚跟充分下沉；向上提踵停1秒',
      '动作幅度太小；靠惯性快速弹动', ['standing-calf', 'seated-calf'], [
        ['donkey', '驴式提踵', 'Donkey Calf Raise', '器械', 1, 6, '髋部前倾，脚跟下沉'],
        ['single', '单腿提踵', 'Single-Leg Calf Raise', '自重', 1, 6, '单脚完成，扶住固定物'],
        ['seated', '坐姿提踵', 'Seated Calf Raise', '器械', 1, 6, '膝盖弯曲90°，重点比目鱼肌'],
        ['legpress', '腿举提踵', 'Leg Press Calf Raise', '器械', 1, 6, '前脚掌踩踏板边缘，膝盖微屈']
      ]),
    F('hinge', '腿', '腘绳肌 / 臀大肌', ['竖脊肌'], ['hamstrings', 'glutes'], ['lower_back'], 'hinge', '杠铃', 2, 8,
      '膝盖微屈固定；髋部向后推；背部中立，重量贴腿',
      '弯腰代替髋部后移；下放过低腰椎屈曲', ['rdl', 'bw-goodmorning'], [
        ['goodmorning', '杠铃早安式', 'Barbell Good Morning', '杠铃', 2, 7, '杠铃放在上背，髋部后移'],
        ['pullthrough', '绳索髋拉', 'Cable Pull-Through', '绳索', 1, 7, '背对滑轮，髋部后移再伸髋'],
        ['band', '弹力带硬拉', 'Band Romanian Deadlift', '弹力带', 1, 6, '脚踩弹力带，髋部后移'],
        ['single', '单腿硬拉', 'Single-Leg Deadlift', '哑铃', 2, 8, '单脚站稳，另一条腿后伸']
      ], { avoid: ['腰'] }),

    F('hipthrust', '臀', '臀大肌', ['腘绳肌', '核心'], ['glutes'], ['hamstrings', 'abs'], 'glute', '杠铃', 1, 9,
      '上背靠凳，杠铃置于髋部；脚跟踩地；伸髋到躯干水平',
      '腰椎过伸代替伸髋；脚离身体太远', ['hip-thrust', 'glute-bridge'], [
        ['single', '单腿臀推', 'Single-Leg Hip Thrust', '自重', 2, 8, '单脚踩地，骨盆保持水平'],
        ['bstance', 'B站姿臀推', 'B-Stance Hip Thrust', '杠铃', 2, 8, '一脚承重，另一脚轻点地面'],
        ['machine', '器械臀推', 'Machine Hip Thrust', '器械', 1, 8, '背部贴垫，髋部对准转轴'],
        ['band', '弹力带臀推', 'Band Hip Thrust', '弹力带', 1, 6, '弹力带绕过髋部，顶端夹臀']
      ]),
    F('bridge', '臀', '臀大肌', ['腘绳肌', '核心'], ['glutes'], ['hamstrings'], 'glute', '自重', 1, 6,
      '仰卧屈膝，脚跟靠近臀部；伸髋抬起骨盆；顶端夹臀',
      '用腰部顶起；脚离臀部太远', ['glute-bridge', 'hip-thrust'], [
        ['single', '单腿臀桥', 'Single-Leg Glute Bridge', '自重', 2, 6, '单脚踩地，另一条腿伸直'],
        ['feetup', '垫高臀桥', 'Elevated Glute Bridge', '自重', 1, 6, '双脚垫高，增加活动范围'],
        ['barbell', '杠铃臀桥', 'Barbell Glute Bridge', '杠铃', 2, 7, '杠铃置于髋部，伸髋夹臀'],
        ['march', '行进臀桥', 'Marching Glute Bridge', '自重', 1, 5, '顶端交替抬脚，骨盆保持水平']
      ]),
    F('abduction', '臀', '臀中肌', ['臀小肌'], ['glutes'], [], 'glute', '器械', 1, 4,
      '骨盆保持中立；向两侧打开膝盖；顶端停1秒',
      '身体后仰借力；只追求大开大合', ['hip-abduction', 'cable-kickback'], [
        ['seated', '坐姿髋外展', 'Seated Hip Abduction', '器械', 1, 4, '坐姿稳定，骨盆中立'],
        ['standing', '站姿髋外展', 'Standing Hip Abduction', '器械', 1, 4, '扶住固定物，单腿向外打开'],
        ['cable', '绳索髋外展', 'Cable Hip Abduction', '绳索', 1, 4, '绳索固定在脚踝，控制回放'],
        ['band', '弹力带髋外展', 'Band Hip Abduction', '弹力带', 1, 4, '弹力带绕在膝盖上方，向两侧打开']
      ]),
    F('glute-kick', '臀', '臀大肌', ['腘绳肌'], ['glutes'], ['hamstrings'], 'glute', '绳索', 1, 5,
      '身体略前倾，核心收紧；支撑腿微屈；工作腿向后伸髋',
      '腰部后仰代替伸髋；骨盆旋转', ['cable-kickback', 'glute-bridge'], [
        ['cable', '绳索臀部后踢', 'Cable Glute Kickback', '绳索', 1, 5, '绳索固定在脚踝，向后伸髋'],
        ['band', '弹力带后踢腿', 'Band Glute Kickback', '弹力带', 1, 4, '弹力带固定在脚踝，控制回放'],
        ['machine', '器械后踢腿', 'Machine Glute Kickback', '器械', 1, 5, '胸部贴垫，避免腰部代偿'],
        ['bodyweight', '徒手后踢腿', 'Bodyweight Glute Kickback', '自重', 1, 4, '四点支撑，单腿向后伸']
      ]),

    F('plank', '核心', '腹横肌 / 腹直肌', ['臀大肌', '肩胛稳定肌'], ['abs'], ['glutes', 'front_delts'], 'core', '自重', 1, 6,
      '手肘在肩膀正下方；收紧臀部和腹部；身体保持一条直线',
      '塌腰腰椎压力增加；臀部抬得过高', ['plank', 'deadbug'], [
        ['side', '侧平板支撑', 'Side Plank', '自重', 1, 6, '手肘在肩下，髋部抬起'],
        ['weighted', '负重平板支撑', 'Weighted Plank', '杠铃', 2, 6, '背上放轻杠铃片，保持骨盆中立'],
        ['reach', '伸手平板支撑', 'Plank With Reach', '自重', 2, 6, '交替向前伸手，减少骨盆旋转'],
        ['reverse', '反向平板支撑', 'Reverse Plank', '自重', 1, 5, '臀部抬起，身体成一条直线']
      ]),
    F('crunch', '核心', '腹直肌', ['腹斜肌'], ['abs'], ['obliques'], 'core', '自重', 1, 4,
      '下背贴地，双手轻放耳侧；用腹部把肩胛骨卷离地面；顶端呼气',
      '双手拉扯脖子；用髋屈肌抬起整个上身', ['crunch', 'cable-crunch'], [
        ['cable', '绳索卷腹', 'Cable Crunch', '绳索', 1, 7, '跪姿，用腹部卷曲躯干'],
        ['machine', '器械卷腹', 'Machine Crunch', '器械', 1, 6, '背部贴垫，腹部卷曲'],
        ['decline', '下斜卷腹', 'Decline Crunch', '自重', 2, 5, '下斜凳增加负荷'],
        ['reverse', '反向卷腹', 'Reverse Crunch', '自重', 1, 5, '骨盆后倾，膝盖卷向胸口']
      ]),
    F('legraise', '核心', '腹直肌下部', ['髋屈肌', '前臂'], ['abs'], ['forearms'], 'core', '自重', 2, 7,
      '身体稳定，先沉肩；骨盆后倾；把膝盖或腿抬向胸口',
      '身体前后摆动；只抬腿不卷骨盆', ['hanging-leg-raise', 'cable-crunch'], [
        ['hanging', '悬垂举腿', 'Hanging Leg Raise', '自重', 2, 7, '悬挂稳定，骨盆后倾'],
        ['lying', '仰卧举腿', 'Lying Leg Raise', '自重', 1, 6, '下背贴地，双腿抬起'],
        ['chair', '悬垂屈膝举腿', 'Captain Chair Knee Raise', '自重', 2, 7, '前臂支撑，膝盖卷向胸口'],
        ['toes', '悬垂触脚尖', 'Toes-to-Bar', '自重', 3, 8, '骨盆后倾，脚尖触杠']
      ], { avoid: ['肩', '腰'] }),
    F('rotation', '核心', '腹斜肌', ['腹直肌', '髋屈肌'], ['obliques'], ['abs'], 'core', '绳索', 1, 5,
      '核心收紧，胸口带动旋转；骨盆保持稳定；控制回放',
      '弓背旋转；只转手臂不转躯干', ['russian-twist', 'side-plank'], [
        ['woodchop', '绳索伐木', 'Cable Woodchop', '绳索', 1, 5, '从高到低斜向旋转'],
        ['pallof', '帕洛夫抗旋推', 'Pallof Press', '绳索', 1, 6, '侧对滑轮，双手向前推'],
        ['landmine', '地雷管转体', 'Landmine Rotation', '杠铃', 2, 6, '双手握杠，胸口带动旋转'],
        ['russian', '俄罗斯转体', 'Russian Twist', '自重', 1, 4, '坐姿后倾，胸口带动旋转']
      ], { avoid: ['腰'] }),
    F('deadbug', '核心', '腹横肌 / 腹直肌', ['髋屈肌'], ['abs'], ['obliques'], 'core', '自重', 1, 7,
      '仰卧，腰部轻贴地面；对侧手脚缓慢伸展；呼气收紧腹部',
      '腰部拱起离开地面；动作过快', ['deadbug', 'bird-dog'], [
        ['band', '弹力带死虫', 'Band Dead Bug', '弹力带', 1, 6, '弹力带拉在手上，抗伸展'],
        ['weighted', '负重死虫', 'Weighted Dead Bug', '哑铃', 2, 6, '双手持轻哑铃，控制下放'],
        ['contralateral', '对侧死虫', 'Contralateral Dead Bug', '自重', 1, 7, '对侧手脚同时伸展'],
        ['wall', '靠墙死虫', 'Wall Dead Bug', '自重', 1, 7, '双脚抵墙，增加核心张力']
      ]),
    F('abwheel', '核心', '腹直肌 / 腹横肌', ['背阔肌', '肩胛稳定肌'], ['abs'], ['lats', 'front_delts'], 'core', '自重', 3, 8,
      '跪姿，骨盆后倾，核心收紧；向前滚动；用腹部拉回',
      '腰部下沉腰椎过伸；滚得太远超出控制', ['ab-wheel', 'cable-crunch'], [
        ['kneeling', '跪姿健腹轮', 'Kneeling Ab Wheel', '自重', 3, 8, '跪姿，控制向前滚动'],
        ['standing', '站姿健腹轮', 'Standing Ab Wheel', '自重', 3, 8, '站姿下滚，核心极强'],
        ['band', '弹力带健腹轮', 'Band-Assisted Ab Wheel', '弹力带', 2, 6, '弹力带辅助回拉'],
        ['stability', '不稳定健腹轮', 'Stability Ball Rollout', '自重', 2, 6, '用稳定球向前滚动']
      ], { avoid: ['腰', '肩'] }),
    F('carry', '核心', '前臂 / 核心', ['斜方肌', '臀中肌'], ['forearms', 'abs'], ['traps', 'glutes'], 'carry', '哑铃', 1, 7,
      '双手提重物，肩膀下沉；核心收紧；保持躯干直立',
      '耸肩、含胸；身体向一侧倾斜', ['farmer-carry', 'shrug'], [
        ['suitcase', '单侧提箱行走', 'Suitcase Carry', '哑铃', 1, 7, '单手提重物，核心抗侧屈'],
        ['overhead', '过头行走', 'Overhead Carry', '哑铃', 2, 7, '双手举过头顶，肋骨下沉'],
        ['waiter', '托盘行走', 'Waiter Carry', '哑铃', 1, 6, '单臂托举哑铃，核心稳定'],
        ['farmer', '农夫行走', 'Farmer Carry', '哑铃', 1, 7, '双手提重物，步幅稳定']
      ]),

    F('walk', '有氧', '心肺 / 下肢', ['臀大肌', '小腿'], ['quads', 'glutes', 'calves'], ['abs'], 'cardio', '器械', 1, 5,
      '坡度8–12%，速度以能说短句为准；身体略前倾；脚跟到脚尖完整落地',
      '抓着扶手把坡度走变成悬挂；步幅过大', ['brisk-walk', 'bike'], [
        ['incline', '坡度快走', 'Incline Walk', '器械', 1, 5, '坡度8–12%，不抓扶手'],
        ['treadmill', '跑步机稳态走', 'Treadmill Steady Walk', '器械', 1, 5, '保持稳定速度与步频'],
        ['outdoor', '户外快走', 'Outdoor Brisk Walk', '自重', 1, 5, '步频稳定，手臂自然摆动'],
        ['weighted', '负重快走', 'Weighted Walk', '哑铃', 2, 5, '穿轻负重背心或持轻哑铃']
      ], { t: '有氧' }),
    F('rower', '有氧', '心肺 / 全身', ['背阔肌', '股四头肌', '核心'], ['lats', 'quads', 'abs'], ['glutes', 'upper_back'], 'cardio', '器械', 1, 7,
      '顺序是腿蹬、身体后倾、手臂拉；回程反过来；保持核心稳定',
      '先拉手臂再蹬腿；回程弓背', ['rower', 'bike'], [
        ['steady', '划船机稳态', 'Steady Rowing', '器械', 1, 7, '保持20–24桨/分'],
        ['intervals', '划船机间歇', 'Rowing Intervals', '器械', 2, 7, '30秒快/90秒慢，控制动作'],
        ['sprint', '划船冲刺', 'Rowing Sprint', '器械', 2, 7, '短时间高功率，充分热身'],
        ['technique', '划船技术练习', 'Rowing Technique', '器械', 1, 6, '低速专注腿、身、手顺序']
      ], { t: '有氧' }),
    F('jumprope', '有氧', '心肺 / 小腿', ['前臂', '核心'], ['calves'], ['forearms', 'abs'], 'cardio', '自重', 2, 6,
      '手腕摇绳，跳跃高度2–3厘米；前脚掌轻落地；膝盖微屈缓冲',
      '跳得过高落地冲击大；全脚掌砸地', ['jump-rope', 'bike'], [
        ['singleleg', '单腿跳绳', 'Single-Leg Jump Rope', '自重', 3, 6, '单腿轻跳，膝盖微屈'],
        ['doubleunder', '双摇跳绳', 'Double-Under', '自重', 3, 6, '一次起跳摇两圈'],
        ['intervals', '跳绳间歇', 'Jump Rope Intervals', '自重', 2, 6, '30秒跳/30秒休息'],
        ['weighted', '负重跳绳', 'Weighted Jump Rope', '自重', 2, 6, '使用重绳，控制手腕']
      ], { t: '有氧', avoid: ['膝'] }),
    F('bike', '有氧', '心肺 / 下肢', ['股四头肌', '臀大肌'], ['quads', 'glutes'], ['calves'], 'cardio', '器械', 1, 5,
      '调整座椅，脚踏最低点时膝盖微屈；躯干稳定；用不同阻力做间歇或稳态',
      '座椅太低膝盖过度弯曲；阻力太小空转', ['bike', 'brisk-walk'], [
        ['spin', '动感单车', 'Spin Bike', '器械', 1, 5, '坐姿稳定，阻力可调'],
        ['recumbent', '卧式单车', 'Recumbent Bike', '器械', 1, 5, '靠背支撑，适合低冲击'],
        ['intervals', '单车间歇', 'Bike Intervals', '器械', 2, 6, '30秒快/90秒慢'],
        ['steady', '单车稳态', 'Steady Bike', '器械', 1, 5, '保持能说短句的强度']
      ], { t: '有氧' }),
    F('mobility', '灵活性', '活动度', ['核心'], ['abs'], ['lower_back'], 'mobility', '自重', 1, 4,
      '动作缓慢，配合呼吸；在无痛范围内活动；不要弹震',
      '强掰关节；憋气追求幅度', ['cat-cow', 'hip-flexor-stretch'], [
        ['hipflexor', '髋屈肌拉伸', 'Hip Flexor Stretch', '自重', 1, 4, '半跪姿，夹臀后骨盆后倾'],
        ['thoracic', '胸椎旋转', 'Thoracic Rotation', '自重', 1, 4, '侧卧屈膝，胸口向天花板打开'],
        ['ankle', '踝关节背屈', 'Ankle Dorsiflexion', '自重', 1, 4, '弓步跪姿，膝盖向前推'],
        ['hamstring', '腘绳肌拉伸', 'Hamstring Stretch', '自重', 1, 4, '保持背部中立，从髋部前倾']
      ], { t: '灵活性' })
  ];

  const ISO_PAT = new Set([
    'chest_iso', 'lat_iso', 'lateral', 'front_delt', 'rear_delt', 'bicep', 'tricep',
    'leg_ext', 'leg_curl', 'calf', 'core', 'shrug', 'glute', 'carry'
  ]);

  const rows = [];
  const usedNames = new Set((window.FORGE_EXERCISES || []).map((e) => e.n));
  for (const f of FAM) {
    for (const v of f.variants) {
      const [slug, n, en, eq, lv, sfr, setup, extra = {}] = v;
      const pat = extra.pat || f.pat;
      const cues = [setup, ...f.cue.split('；'), PAT_CUE[pat]]
        .filter(Boolean)
        .filter((x, i, arr) => arr.indexOf(x) === i)
        .slice(0, 3);
      const errors = [extra.err || f.err.split('；')[0], PAT_ERR[pat]]
        .filter(Boolean)
        .filter((x, i, arr) => arr.indexOf(x) === i)
        .slice(0, 2);
      let finalName = n;
      let suffix = 1;
      while (usedNames.has(finalName)) {
        finalName = `${n}（变式${suffix > 1 ? ` ${suffix}` : ''}）`;
        suffix += 1;
      }
      usedNames.add(finalName);
      rows.push({
        id: `x-${f.key}-${slug}`,
        n: finalName,
        en,
        g: extra.g || f.g,
        p: extra.p || f.p,
        s: extra.s || f.s,
        eq,
        lv,
        t: extra.t || (pat === 'cardio' ? '有氧' : pat === 'mobility' ? '灵活性' : ISO_PAT.has(pat) ? '孤立' : '复合'),
        sfr,
        pat,
        mp: extra.mp || f.mp,
        ms: extra.ms || f.ms,
        cues,
        err: errors,
        alt: extra.alt || f.alt,
        avoid: extra.avoid || [],
        tags: [f.g, '扩展动作', ...(extra.tags || [])]
      });
    }
  }

  window.FORGE_EXERCISES = [...(window.FORGE_EXERCISES || []), ...rows];
})();
