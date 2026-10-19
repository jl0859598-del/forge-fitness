/* 炼 FORGE — 食物、研究、运动员公开案例 */

window.FORGE_FOODS = {
  proteins: [
    { id: 'chicken', n: '鸡胸肉（熟）', kcal: 165, p: 31, c: 0, f: 3.6, diet: ['omnivore', 'lactoseFree'] },
    { id: 'beef', n: '瘦牛肉（熟）', kcal: 213, p: 27, c: 0, f: 11, diet: ['omnivore', 'lactoseFree'] },
    { id: 'salmon', n: '三文鱼（熟）', kcal: 208, p: 20, c: 0, f: 13, diet: ['omnivore', 'lactoseFree'] },
    { id: 'shrimp', n: '虾仁（熟）', kcal: 99, p: 24, c: 0.2, f: 0.3, diet: ['omnivore', 'lactoseFree'] },
    { id: 'egg', n: '鸡蛋', kcal: 143, p: 13, c: 0.7, f: 9.5, diet: ['omnivore', 'vegetarian', 'lactoseFree'] },
    { id: 'tofu', n: '北豆腐', kcal: 76, p: 8, c: 1.9, f: 4.8, diet: ['omnivore', 'vegetarian', 'lactoseFree'] },
    { id: 'yogurt', n: '希腊酸奶 0%', kcal: 59, p: 10, c: 3.6, f: 0.4, diet: ['omnivore', 'vegetarian'] },
    { id: 'whey', n: '乳清蛋白粉', kcal: 400, p: 80, c: 8, f: 6, diet: ['omnivore', 'vegetarian'] },
    { id: 'soymilk', n: '无糖豆浆', kcal: 33, p: 3.3, c: 1.8, f: 1.8, diet: ['omnivore', 'vegetarian', 'lactoseFree'] },
    { id: 'edamame', n: '毛豆（熟）', kcal: 121, p: 11, c: 8.9, f: 5.2, diet: ['omnivore', 'vegetarian', 'lactoseFree'] }
  ],
  carbs: [
    { id: 'rice', n: '熟米饭', kcal: 116, p: 2.6, c: 25.9, f: 0.3 },
    { id: 'oats', n: '燕麦片（干）', kcal: 389, p: 13, c: 66, f: 6.9 },
    { id: 'sweetpotato', n: '红薯', kcal: 86, p: 1.6, c: 20.1, f: 0.1 },
    { id: 'bread', n: '全麦面包', kcal: 247, p: 9, c: 41, f: 3.4 },
    { id: 'pasta', n: '意面（熟）', kcal: 158, p: 5.8, c: 30.9, f: 0.9 },
    { id: 'quinoa', n: '藜麦（熟）', kcal: 120, p: 4.4, c: 21.3, f: 1.9 },
    { id: 'banana', n: '香蕉', kcal: 89, p: 1.1, c: 22.8, f: 0.3 },
    { id: 'potato', n: '土豆', kcal: 77, p: 2, c: 17, f: 0.1 }
  ],
  fats: [
    { id: 'oil', n: '橄榄油', kcal: 884, p: 0, c: 0, f: 100 },
    { id: 'almond', n: '杏仁', kcal: 579, p: 21, c: 22, f: 50 },
    { id: 'peanut', n: '花生酱', kcal: 588, p: 25, c: 20, f: 50 },
    { id: 'avocado', n: '牛油果', kcal: 160, p: 2, c: 8.5, f: 14.7 }
  ],
  veg: [
    { id: 'broccoli', n: '西兰花', kcal: 34, p: 2.8, c: 6.6, f: 0.4 },
    { id: 'spinach', n: '菠菜', kcal: 23, p: 2.9, c: 3.6, f: 0.4 },
    { id: 'mixedveg', n: '混合蔬菜', kcal: 40, p: 2, c: 7, f: 0.4 }
  ],
  quick: [
    { n: '鸡蛋 1 个', kcal: 72, p: 6.3, c: 0.4, f: 4.8 },
    { n: '鸡胸肉 100g', kcal: 165, p: 31, c: 0, f: 3.6 },
    { n: '米饭 1 碗（150g）', kcal: 174, p: 3.9, c: 38.9, f: 0.5 },
    { n: '乳清蛋白 1 勺', kcal: 120, p: 24, c: 2.4, f: 1.8 },
    { n: '香蕉 1 根', kcal: 89, p: 1.1, c: 22.8, f: 0.3 },
    { n: '牛奶 250ml', kcal: 155, p: 8, c: 12, f: 8 },
    { n: '希腊酸奶 150g', kcal: 89, p: 15, c: 5.4, f: 0.6 },
    { n: '燕麦 40g', kcal: 156, p: 5.2, c: 26.4, f: 2.8 },
    { n: '杏仁 20g', kcal: 116, p: 4.2, c: 4.4, f: 10 }
  ]
};

window.FORGE_STUDIES = [
  {
    id: 'volume', tag: '增肌', level: '系统综述 + 元分析',
    title: '每周训练量越高，肌肉增长越多吗？',
    finding: '在纳入的研究中，每周每个肌群约 10 组以上与更好的肌肉增长相关，并呈现剂量—反应趋势；但超过一定范围后，收益会变小，疲劳和恢复成本上升。',
    apply: '大多数自然训练者可从每个大肌群每周 10–20 个有效组开始；新手取下限，恢复好、动作稳定后再增加。',
    cite: 'Schoenfeld BJ, Ogborn D, Krieger JW. J Sports Sci. 2017;35(11):1073-1082.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Schoenfeld+Ogborn+Krieger+dose-response+weekly+resistance+training+volume+2017'
  },
  {
    id: 'load', tag: '增肌', level: '系统综述 + 元分析',
    title: '轻重量和大重量，增肌效果差多少？',
    finding: '当训练接近力竭、总训练量相当时，低负荷（约 30–50% 1RM）和高负荷（约 75–85% 1RM）都能促进肌肉增长；大重量在最大力量提升上更有优势。',
    apply: '增肌不必每组都上大重量。复合动作可用 6–12 次，孤立动作可用 10–20 次；关键是接近力竭并持续进步。',
    cite: 'Schoenfeld BJ, Grgic J, Ogborn D, Krieger JW. J Strength Cond Res. 2017;31(12):3508-3523.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Schoenfeld+low+versus+high+load+resistance+training+2017'
  },
  {
    id: 'frequency', tag: '训练安排', level: '系统综述 + 元分析',
    title: '同一肌群一周练几次更合适？',
    finding: '在每周总训练量相同的情况下，每个肌群每周练 2 次左右通常略优于 1 次；频率本身不是魔法，关键是能否把足够训练量分散到可恢复的多次训练里。',
    apply: '3–5 天训练者优先用全身、上下肢或推拉腿分化，让每个大肌群每周至少被刺激 2 次。',
    cite: 'Schoenfeld BJ, Ogborn D, Krieger JW. Sports Med. 2016;46(11):1689-1697.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Schoenfeld+resistance+training+frequency+hypertrophy+2016'
  },
  {
    id: 'failure', tag: '训练安排', level: '系统综述 + 元分析',
    title: '每组都要练到力竭吗？',
    finding: '接近力竭的训练有利于增肌；练到绝对力竭可能带来少量额外刺激，但会显著增加疲劳、延长恢复，并影响后续训练质量。多数训练组保留 1–3 次余力已经足够有效。',
    apply: '复合动作保留 2–3 次余力，孤立动作保留 0–2 次；只有在动作稳定、恢复充足时，才把最后一组练到接近力竭。',
    cite: 'Refalo MC, Helms ER, Trexler ET, et al. Sports Med. 2023;53(3):649-665.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Refalo+proximity+to+failure+hypertrophy+meta-analysis'
  },
  {
    id: 'rest', tag: '训练安排', level: '系统综述',
    title: '组间休息多久？',
    finding: '复合动作使用较长休息（约 2–3 分钟）通常更有利于力量表现和后续组的训练质量；较短的休息并不必然带来更好的增肌效果，反而可能降低总训练量。',
    apply: '深蹲、卧推、硬拉、划船等复合动作休息 2–3 分钟；孤立动作休息 60–90 秒，按呼吸和心率恢复情况调整。',
    cite: 'Grgic J, Schoenfeld BJ, Skrepnik M, et al. Sports Med. 2018;48(1):137-151.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Grgic+rest+interval+duration+resistance+training+strength+2018'
  },
  {
    id: 'protein', tag: '蛋白质', level: '系统综述 + 元回归',
    title: '增肌每天到底需要多少蛋白质？',
    finding: '抗阻训练人群补充蛋白质可增加肌肉量和力量；汇总分析显示收益在约 1.6 g/kg/天附近趋于平台，置信区间上限约 2.2 g/kg/天。',
    apply: '大多数训练者按 1.6–2.2 g/kg/天分配蛋白质，分到 3–5 餐；减脂期可偏向区间上限。',
    cite: 'Morton RW, Murphy KT, McKellar SR, et al. Br J Sports Med. 2018;52(6):376-384.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Morton+protein+supplementation+meta-regression+2018'
  },
  {
    id: 'meals', tag: '蛋白质', level: '叙述性综述',
    title: '一餐能吃多少蛋白质？要分几餐？',
    finding: '每餐约 0.4 g/kg 体重的蛋白质、每天分 4 餐左右，是一个实用的分配策略；比“必须严格在训练后 30 分钟内喝蛋白粉”更重要的是全天总摄入。',
    apply: '70 kg 的人每餐约 28 g 蛋白质，分 3–4 餐；训练后 1–2 小时内吃到一餐含蛋白质的饭即可。',
    cite: 'Schoenfeld BJ, Aragon AA. J Int Soc Sports Nutr. 2018;15:10.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Schoenfeld+Aragon+protein+distribution+2018'
  },
  {
    id: 'cutprotein', tag: '减脂', level: '随机对照试验',
    title: '减脂期提高蛋白质，能保住更多肌肉吗？',
    finding: '在能量赤字并结合高强度训练的研究中，较高蛋白质摄入（约 2.4 g/kg/天）相比较低摄入（约 1.2 g/kg/天）带来更多瘦体重增加和脂肪减少。',
    apply: '减脂期把蛋白质提高到 2.0–2.4 g/kg/天，同时保持抗阻训练；不要只靠减少进食来制造赤字。',
    cite: 'Longland TM, Oikawa SY, Mitchell CJ, et al. Am J Clin Nutr. 2016;103(3):738-746.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Longland+higher+protein+energy+deficit+2016'
  },
  {
    id: 'prep', tag: '减脂', level: '叙述性综述',
    title: '自然健美备赛的减脂速度与蛋白质',
    finding: '自然健美备赛综述建议以每周约 0.5–1% 体重的速度减脂，并在热量赤字中维持较高蛋白质（按去脂体重约 2.3–3.1 g/kg），以尽量保留瘦体重。',
    apply: '普通减脂者不必照搬备赛极端做法；把每周减重控制在体重的 0.5–1%，出现力量明显下降或持续疲劳时放慢速度。',
    cite: 'Helms ER, Aragon AA, Fitschen PJ. J Int Soc Sports Nutr. 2014;11:20.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Helms+natural+bodybuilding+contest+preparation+2014'
  },
  {
    id: 'energy', tag: '饮食', level: '预测方程研究',
    title: '基础代谢和每日消耗怎么估？',
    finding: 'Mifflin-St Jeor 方程在健康成年人中比旧版 Harris-Benedict 方程更准确，但个体误差仍然存在；压力、睡眠、活动量和食物热效应都会影响实际消耗。',
    apply: '把公式结果当作起点，连续 2–3 周记录体重和饮食，用体重趋势反推真实维持热量，再每次调整 100–200 kcal。',
    cite: 'Mifflin MD, St Jeor ST, Hill LA, et al. Am J Clin Nutr. 1990;51(2):241-247.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Mifflin+St+Jeor+resting+energy+expenditure+1990'
  },
  {
    id: 'metabolic', tag: '减脂', level: '叙述性综述',
    title: '减着减着代谢变慢，怎么办？',
    finding: '减重过程中会出现代谢适应：体重下降、活动成本降低、非运动活动量减少等共同让实际消耗低于公式预测。这不是意志力问题，也不意味着代谢“坏了”。',
    apply: '每 2–4 周根据体重趋势调整热量；减脂平台期先检查记录误差、睡眠和日常步数，再做 100–200 kcal 的温和调整。',
    cite: 'Trexler ET, Smith-Ryan AE, Norton LE. J Int Soc Sports Nutr. 2014;11:7.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Trexler+metabolic+adaptation+weight+loss+2014'
  },
  {
    id: 'recomp', tag: '增肌', level: '叙述性综述',
    title: '能同时增肌和减脂吗？',
    finding: '在训练水平较低、体脂较高、蛋白质充足且训练刺激到位的人群中，身体重组是可能的；训练多年、体脂较低的人想同时大幅增肌减脂会更困难，进展也更慢。',
    apply: '重组期把热量放在维持附近，蛋白质 2.0–2.2 g/kg，抗阻训练保持渐进超负荷，用围度和力量变化而不只看体重。',
    cite: 'Barakat C, Pearson J, Escalante G, et al. Strength Cond J. 2020;42(5):7-21.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Barakat+body+recomposition+2020'
  },
  {
    id: 'cardio', tag: '减脂', level: '随机对照试验',
    title: '有氧加力量，比只做一种更好吗？',
    finding: '在超重/肥胖成年人中，有氧训练和抗阻训练都能改善身体成分；两者结合在减少脂肪的同时更有利于保留瘦体重和改善功能表现。',
    apply: '减脂期保留每周 2–4 次抗阻训练，再根据恢复加入 2–3 次低冲击有氧；不要把有氧当成替代力量训练的手段。',
    cite: 'Willis LH, Slentz CA, Bateman LA, et al. J Appl Physiol. 2012;113(12):1831-1837.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Willis+aerobic+resistance+training+body+composition+2012'
  },
  {
    id: 'sleep', tag: '恢复', level: '机制假说 + 综述',
    title: '睡眠不足会影响增肌恢复吗？',
    finding: '睡眠不足可能通过改变激素环境、增加炎症和降低训练表现来影响恢复。现有研究多为短期或机制性证据，但“睡眠是恢复的一部分”在运动实践中证据一致。',
    apply: '目标 7–9 小时睡眠；连续睡眠不足时，优先减少训练量或强度，而不是继续加练。',
    cite: 'Dattilo M, Antunes HK, Medeiros A, et al. Med Hypotheses. 2011;77(2):220-222.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=Dattilo+sleep+muscle+recovery+2011'
  },
  {
    id: 'acsm', tag: '训练安排', level: '学会立场声明',
    title: '渐进超负荷应该怎么加？',
    finding: '抗阻训练的健康与表现收益依赖渐进超负荷、动作专项性和合理变化。新手应先掌握动作，再逐步增加重量、次数或组数；进阶训练者需要更有计划地安排训练变量。',
    apply: '用双重渐进：先在目标次数区间内增加次数，达到上限后增加 2.5–5% 重量，再把次数从区间下限重新做起。',
    cite: 'Kraemer WJ, Adams K, Cafarelli E, et al. Med Sci Sports Exerc. 2009;41(3):687-708.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=ACSM+progression+models+resistance+training+2009'
  },
  {
    id: 'sportnutrition', tag: '饮食', level: '学会联合立场声明',
    title: '运动人群的碳水、蛋白质和补水',
    finding: '运动营养共识强调：总能量充足是基础；蛋白质约 1.2–2.0 g/kg/天可覆盖多数运动人群；碳水需求随训练量增加；补水应结合出汗量和环境。',
    apply: '训练日把碳水放在训练前后，蛋白质分散到各餐；长时间高强度训练才需要专门的运动饮料或碳水补充策略。',
    cite: 'Thomas DT, Erdman KA, Burke LM. Med Sci Sports Exerc. 2016;48(3):543-568.',
    url: 'https://pubmed.ncbi.nlm.nih.gov/?term=ACSM+nutrition+athletic+performance+2016'
  }
];

window.FORGE_ATHLETES = [
  {
    id: 'ronnie', name: '罗尼·库尔曼', en: 'Ronnie Coleman', sport: '健美', accent: 'lime',
    stat: '8×', statLabel: 'Mr. Olympia 1998–2005',
    facts: ['身高约 180 cm，巅峰比赛体重约 130 kg', '以超大重量复合动作和高强度训练著称', '公开训练视频中常出现深蹲、硬拉、划船等基础动作'],
    principles: ['把深蹲、卧推、硬拉、划船等复合动作作为力量基础', '在动作稳定后持续增加负重，记录每一组', '高强度训练必须配合充足进食和恢复'],
    learn: '把“渐进超负荷”落实到每次训练记录，而不是频繁换花哨动作。',
    caution: '他的体重、负重和关节承受能力属于极端个案；初学者照搬重量和频率，风险远大于收益。'
  },
  {
    id: 'arnold', name: '阿诺德·施瓦辛格', en: 'Arnold Schwarzenegger', sport: '健美', accent: 'orange',
    stat: '7×', statLabel: 'Mr. Olympia 1970–1975, 1980',
    facts: ['身高约 188 cm，巅峰比赛体重约 107 kg', '黄金时代高容量训练代表，常每天训练两次、每周 6 天', '强调念动一致（mind-muscle connection）和动作幅度'],
    principles: ['用较高训练量覆盖不同角度和肌肉区域', '重视动作控制和目标肌肉的收缩感', '把胸、背、腿等大肌群放在精力最好的时段'],
    learn: '动作质量和对目标肌群的感知，比“把重量甩起来”更重要。',
    caution: '高容量训练对恢复、饮食和时间要求很高；新手直接照搬容易过度训练。'
  },
  {
    id: 'dorian', name: '多里安·耶茨', en: 'Dorian Yates', sport: '健美', accent: 'blue',
    stat: '6×', statLabel: 'Mr. Olympia 1992–1997',
    facts: ['身高约 178 cm，巅峰比赛体重约 118 kg', 'Blood & Guts 训练法：每个动作 1 个正式组练到力竭', '典型训练约 4 天/周、45–60 分钟/次，强调短时高强度'],
    principles: ['用低容量、高强度提高单位时间刺激', '正式组前充分热身，正式组全力以赴', '把恢复放在和训练同等重要的位置'],
    learn: '训练效率来自专注和强度，不来自在健身房待得久。',
    caution: '每个动作都练到绝对力竭对神经系统和关节压力很大；没有稳定动作基础不建议模仿。'
  },
  {
    id: 'hafthor', name: '哈夫托·布扬松', en: 'Hafthor Bjornsson', sport: '大力士', accent: 'red',
    stat: '501 kg', statLabel: '2020 年硬拉世界纪录',
    facts: ['身高约 206 cm，巅峰体重约 205 kg', '2018 年世界最强壮男人冠军', '训练以硬拉、深蹲、推举和大力士项目为主，备赛期热量摄入极高'],
    principles: ['围绕比赛动作做专项训练', '用大重量低次数建立绝对力量', '把技术、握力、核心稳定和恢复都纳入计划'],
    learn: '目标决定训练：想提高硬拉，就要练硬拉及与其相关的薄弱环节。',
    caution: '大力士的体重、热量和负重不适用于普通健身人群；极高体重本身也带来健康风险。'
  },
  {
    id: 'lasha', name: '拉沙·塔拉哈泽', en: 'Lasha Talakhadze', sport: '举重', accent: 'violet',
    stat: '492 kg', statLabel: '2021 年世锦赛总成绩世界纪录',
    facts: ['身高约 197 cm，体重约 170 kg', '2016、2020、2024 三届奥运会冠军', '抓举 225 kg、挺举 267 kg、总成绩 492 kg 均为公开世界纪录级表现'],
    principles: ['技术优先，用大量专项练习固化动作路径', '低次数、高负荷，组间充分休息', '围绕抓举、挺举和深蹲/拉类辅助动作构建计划'],
    learn: '力量项目的高负荷低次数训练，核心是动作质量和技术稳定性。',
    caution: '奥举技术需要教练；没有技术基础直接上大重量，受伤风险很高。'
  },
  {
    id: 'bolt', name: '尤塞恩·博尔特', en: 'Usain Bolt', sport: '短跑', accent: 'lime',
    stat: '9.58 s', statLabel: '100 m 世界纪录（2009）',
    facts: ['身高约 195 cm，体重约 94 kg', '100 m 9.58 s、200 m 19.19 s 世界纪录保持者', '训练以短跑技术、起跑加速、力量与爆发力为核心'],
    principles: ['速度来自技术、力量与神经系统的共同作用', '力量训练服务于短跑表现，不追求健美式围度', '高强度日之间安排低强度恢复'],
    learn: '力量训练要服务于目标运动表现；不是每个项目都需要高次数泵感训练。',
    caution: '短跑对腘绳肌、跟腱和足底要求极高，需要循序渐进和技术指导。'
  },
  {
    id: 'kipchoge', name: '埃鲁德·基普乔格', en: 'Eliud Kipchoge', sport: '马拉松', accent: 'blue',
    stat: '2:01:09', statLabel: '柏林马拉松世界纪录（2022）',
    facts: ['身高约 167 cm，体重约 52–56 kg', '奥运会马拉松两连冠（2016、2020）', '训练以高里程、低强度有氧和每周少量高质量课为主，常在高原集训'],
    principles: ['大量轻松跑建立有氧基础', '高强度课控制在每周 1–2 次，质量优先', '睡眠、营养和恢复是训练的一部分'],
    learn: '“轻松日真的轻松，强度日真的强度”，比每天都中等强度更容易长期进步。',
    caution: '精英跑者每周 180–220 km 的跑量是多年适应的结果；普通跑者照搬会显著增加应力性损伤风险。'
  },
  {
    id: 'lebron', name: '勒布朗·詹姆斯', en: 'LeBron James', sport: '篮球', accent: 'orange',
    stat: '4×', statLabel: 'NBA 总冠军 / 4× MVP',
    facts: ['身高约 206 cm，体重约 113 kg', '职业生涯超过 20 个赛季，长期保持高水平竞技状态', '公开采访中强调力量维持、活动度、睡眠和恢复；每年身体维护投入常被媒体报道'],
    principles: ['力量训练以维持和预防伤病为主，不追求极限围度', '活动度、软组织护理和睡眠与训练同等重要', '赛季中根据比赛负荷调整训练量'],
    learn: '长期主义：训练要让你明天还能练，而不是今天把身体掏空。',
    caution: '媒体报道的身体维护费用是商业和个人团队投入，不是普通人必须复制的方案。'
  },
  {
    id: 'su', name: '苏炳添', en: 'Su Bingtian', sport: '短跑', accent: 'red',
    stat: '9.83 s', statLabel: '亚洲 100 m 纪录（2021）',
    facts: ['身高约 172 cm，体重约 65 kg', '2021 年东京奥运会半决赛跑出 9.83 s，创造亚洲纪录', '训练强调最大力量、起跑加速和步频/步幅技术'],
    principles: ['用深蹲、硬拉等最大力量训练提高力量相对值', '技术训练与力量训练分开安排，避免互相干扰', '通过视频和计时反馈持续微调动作'],
    learn: '力量不是越大越好，能和项目技术结合的力量体重比才有意义。',
    caution: '短跑训练的高强度冲刺和技术练习需要循序渐进，不能直接套用健美训练逻辑。'
  }
];

window.FORGE_COACHES = [
  {
    id: 'jeff',
    name: 'Jeff Nippard',
    sport: '自然健美 · 证据导向',
    focus: '增肌、力量、训练计划设计',
    plan: '常见结构是全身 A/B、上下肢或推拉腿；复合动作 4–8 次、孤立动作 8–15 次，RIR 1–3，每个大肌群每周约 10–20 个有效组。',
    points: ['用训练记录做双重渐进', '动作选择覆盖不同角度', '训练量按恢复逐步增加'],
    video: 'https://www.youtube.com/@JeffNippard/playlists',
    search: 'https://search.bilibili.com/all?keyword=Jeff+Nippard+%E8%AE%AD%E7%BB%83%E8%AE%A1%E5%88%92',
    caution: '视频中的计划常面向有经验的训练者；新手先降低组数，把动作做稳。'
  },
  {
    id: 'rp',
    name: 'Dr. Mike Israetel',
    sport: 'Renaissance Periodization',
    focus: '训练量、MEV/MRV、增肌与减脂',
    plan: '以每个肌群的维持量（MV）、最低有效量（MEV）和最大可恢复量（MRV）为框架，先建立基线，再逐周加组或减组。',
    points: ['用周训练量而不是单次训练判断刺激', '高容量期必须匹配睡眠和进食', '减量周用于恢复而不是补偿'],
    video: 'https://www.youtube.com/@RenaissancePeriodization/playlists',
    search: 'https://search.bilibili.com/all?keyword=Mike+Israetel+%E8%AE%AD%E7%BB%83%E8%AE%A1%E5%88%92',
    caution: 'MEV/MRV 是个体化估算，不是精确公式；不要为了追高组数牺牲动作质量。'
  },
  {
    id: 'layne',
    name: 'Layne Norton',
    sport: 'BioLayne · 力量与营养',
    focus: '周期化、蛋白质、身体重组',
    plan: '力量与健美结合，复合动作低次数、辅助动作中高次数；蛋白质优先，减脂期保留抗阻训练并控制速度。',
    points: ['先保证总热量和蛋白质', '用周期化安排强度与容量', '减脂期不要把有氧当成力量训练的替代'],
    video: 'https://www.youtube.com/@BioLayne/playlists',
    search: 'https://search.bilibili.com/all?keyword=Layne+Norton+%E8%AE%AD%E7%BB%83%E8%AE%A1%E5%88%92',
    caution: '他的比赛和备赛建议面向有经验人群；普通减脂不需要极端饮食。'
  },
  {
    id: '3dmj',
    name: 'Eric Helms / 3DMJ',
    sport: '自然健美 · 3DMJ',
    focus: '自然增肌、备赛、训练量',
    plan: '自然健美导向的上下肢或全身分化，重视渐进超负荷、蛋白质分配和可恢复的训练量；备赛期以每周约 0.5–1% 体重减脂。',
    points: ['训练量从可恢复范围开始', '蛋白质分到 3–5 餐', '减脂速度越慢越容易保住肌肉'],
    video: 'https://www.youtube.com/@3DMJ/playlists',
    search: 'https://search.bilibili.com/all?keyword=3DMJ+%E8%87%AA%E7%84%B6%E5%81%A5%E7%BE%8E+%E8%AE%AD%E7%BB%83',
    caution: '备赛期的极端做法不适合普通健身者；有进食障碍史不要照搬。'
  },
  {
    id: 'menno',
    name: 'Menno Henselmans',
    sport: 'Bayesian Bodybuilding',
    focus: '证据整合、频率、有效训练量',
    plan: '以证据权重和个体反应决定频率与训练量；常见每个肌群每周 2 次左右，复合动作与孤立动作结合，重视力量进步。',
    points: ['先看证据强度，再看个人反应', '频率服务于总训练量', '用力量趋势判断计划是否有效'],
    video: 'https://www.youtube.com/@MennoHenselmans/playlists',
    search: 'https://search.bilibili.com/all?keyword=Menno+Henselmans+%E8%AE%AD%E7%BB%83',
    caution: '“贝叶斯”是决策框架，不代表每个结论都确定；仍要结合自己的恢复和偏好。'
  },
  {
    id: 'sbs',
    name: 'Greg Nuckols / Stronger by Science',
    sport: '力量举 · 证据研究',
    focus: '力量、训练量、元分析',
    plan: '以力量表现为核心，复合动作低至中次数、充分休息；辅助动作补足薄弱环节，计划强调可持续的渐进超负荷。',
    points: ['力量进步需要足够休息', '用周期化安排峰值', '不要频繁更换有效动作'],
    video: 'https://www.youtube.com/@StrongerByScience/playlists',
    search: 'https://search.bilibili.com/all?keyword=Stronger+by+Science+%E8%AE%AD%E7%BB%83%E8%AE%A1%E5%88%92',
    caution: '力量举计划以比赛三项为核心，不一定适合以围度或健康为目标的人。'
  },
  {
    id: 'alan',
    name: 'Alan Thrall',
    sport: '杠铃技术 · 力量训练',
    focus: '深蹲、卧推、硬拉技术',
    plan: '以杠铃复合动作为中心，低次数、较高组间休息，先建立动作稳定性和力量基础，再增加辅助动作。',
    points: ['技术优先于重量', '复合动作充分休息', '用视频回放检查动作路径'],
    video: 'https://www.youtube.com/@AlanThrall/playlists',
    search: 'https://search.bilibili.com/all?keyword=Alan+Thrall+%E6%9D%A0%E9%93%83%E6%8A%80%E6%9C%AF',
    caution: '力量举技术需要现场指导；有腰背或关节疼痛时不要硬顶。'
  },
  {
    id: 'brian',
    name: 'Brian Alsruhe',
    sport: '大力士 · 体能',
    focus: '力量耐力、巨人组、条件训练',
    plan: '大力士风格的复合动作、负重行走和高密度训练；用巨人组和短休息提高体能，但疲劳成本很高。',
    points: ['把负重行走和核心稳定纳入训练', '用条件训练提高工作能力', '高强度日之间安排恢复'],
    video: 'https://www.youtube.com/@BrianAlsruhe/playlists',
    search: 'https://search.bilibili.com/all?keyword=Brian+Alsruhe+%E8%AE%AD%E7%BB%83%E8%AE%A1%E5%88%92',
    caution: '高密度、高疲劳训练不适合新手或恢复不足的人；先把基础力量和动作做好。'
  }
];
