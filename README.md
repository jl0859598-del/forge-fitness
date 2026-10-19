# 炼 FORGE · 训练与营养

一个手机优先、可离线使用的健身训练与营养管理应用。不需要账号，所有个人记录保存在当前浏览器的 `localStorage` 中。

## 已实现

- 301 个动作的完整动作库：胸、背、肩、手臂、腿、臀、核心、有氧、灵活性
- 每个动作包含：主要/次要肌群示意图、动作要领、常见错误、替代动作、SFR 效率评分、难度和器械
- 144 个动作带有 Free Exercise DB 的标准开始位/结束位演示图（Public Domain / Unlicense），可暂停/继续；没有经过核对素材的动作会明确提示“暂无标准演示”，不再用通用动画冒充
- 每个动作详情都有 YouTube / B 站示范视频检索入口；轨迹按具体动作模式与器械路径逐条映射（如卧推/深蹲/弯举/腿屈伸），未核对的动作显示“待核对”，不再套用同肌群的通用曲线
- 个人视频轨迹分析：拍摄/上传一段侧面全身视频，本地提取肩、肘、髋、膝、踝关键点，比较活动范围、左右差异、节奏和主要移动点，给出参考分与建议；视频不上传、不保存
- 按目标、经验、每周天数、单次时长、器械条件、伤病限制和重点部位生成训练计划
- 自动给出组数、次数、RIR（余力次数）、组间休息和每周肌群容量
- 支持调整组数、替换动作、查看渐进超负荷建议
- 训练模式：逐组打卡、休息倒计时、完成训练后自动记录
- 体重、体脂、腰围记录与 30/90 天趋势图、周均变化、目标进度
- 基于 Mifflin-St Jeor 的热量估算、蛋白质/碳水/脂肪/纤维/饮水目标
- 按普通饮食、蛋奶素、无乳糖饮食生成一日餐单，并支持今日摄入记录
- 拍照估热量：视觉模型识别食物、估算克数与热量，显示置信度和范围，可手动修正克数后记账
- 16 篇研究摘要（附 PubMed 检索链接）与 9 位运动员公开案例
- 8 位著名教练的视频索引：官方播放列表 + B 站搜索，附训练原则摘要和“不要照搬”提示
- 可添加到手机主屏幕（PWA）、支持离线缓存
- 数据导出/导入 JSON 备份

## 在电脑上打开

直接双击 `index.html` 也可以使用，但“添加到主屏幕”和离线缓存需要 HTTP 服务。

Mac 上双击 `start.command`，或在终端运行：

```bash
cd /Users/baochen/Documents/Codex/2026-10-19/ban/outputs/forge
python3 server.py 8080
```

然后打开 `http://localhost:8080`。

如果只想查看静态页面，也可以双击 `index.html`；但拍照识别、“添加到主屏幕”和离线缓存需要 `server.py`。

## 在手机上使用

1. 电脑和手机连接同一个 Wi-Fi。
2. 在 Mac 终端进入本目录，运行 `./start.command`，记下终端显示的 `手机打开: http://...:8080` 地址。
3. 手机浏览器打开该地址。
4. iPhone Safari：点“分享”→“添加到主屏幕”。Android Chrome：菜单→“安装应用/添加到主屏幕”。

如果手机打不开：

- 确认电脑和手机在同一 Wi-Fi；
- 检查 macOS 防火墙是否允许 Python 接收传入连接；
- 换一个端口，例如 `python3 server.py 8081`。

## 启用拍照估热量

识别接口由本机 `server.py` 代理调用 OpenAI Responses API，API Key 不会进入浏览器，也不会写入前端代码。

1. 复制 `.env.example` 为 `.env`：

```bash
cp .env.example .env
```

2. 编辑 `.env`，填入你的 Key：

```text
OPENAI_API_KEY=sk-...
OPENAI_VISION_MODEL=gpt-6-astra
```

3. 重新运行 `./start.command`。页面里的“拍照估热量”会显示“视觉服务已连接”。

模型名可以通过 `OPENAI_VISION_MODEL` 覆盖。若你的账号暂时没有默认模型权限，改成一个有视觉能力的模型即可。实现使用官方文档中的 Responses API 图片输入和 Structured Outputs：

- [Images and vision](https://developers.openai.com/api/docs/guides/images-vision)
- [Structured model outputs](https://developers.openai.com/api/docs/guides/structured-outputs)

开发时如果想不调用 API 检查界面，可在启动前设置 `FORGE_MOCK_VISION=1`，接口会返回固定示例结果。

### 准确度说明

- 拍照估算受光线、遮挡、碗盘大小、烹饪油、酱汁和食物密度影响；
- 模型会返回克数范围、热量范围和置信度，低置信度时请手动确认；
- 应用不会把识别结果自动记账，必须点“确认并记录”；
- 需要称重级准确时，请使用食品秤或包装营养标签；拍照功能是辅助估算，不应当作医疗或竞技备赛的唯一依据。

## 个人视频轨迹分析

动作详情页的“个人视频轨迹分析”使用浏览器本地姿态估计，不上传视频：

1. 点“拍摄 / 上传训练视频”，建议 5–20 秒，包含完整一次动作。
2. 手机固定在身体侧面，确保头、肩、髋、膝、踝都在画面内，光线充足。
3. 点“分析动作”，系统会逐帧提取关节点，计算主要关节角度、左右差异、节奏和主要移动点轨迹。
4. 结果包含参考分、检测次数、活动范围、左右差异、姿态质量、个人轨迹图和可分条阅读的建议。
5. 点“保存分析摘要”只保存分数、次数、活动范围和动作名称，不保存视频文件。

实现使用本地打包的 [MediaPipe Tasks Vision](https://developers.google.com/mediapipe/solutions/vision/pose_landmarker)（Apache-2.0）和 Pose Landmarker Lite 模型。分析是二维视频估算，受拍摄角度、遮挡、服装、光线和手机稳定性影响；分数不是医学评分，也不能替代现场动作评估。

首次分析需要加载约 18MB 的本地 WASM/模型文件，之后会由浏览器和 Service Worker 缓存；模型加载期间请保持页面打开。

## 部署到公网

商用站点（Netlify，允许商业使用）：<https://forge-train.netlify.app/>

- 镜像站点（GitHub Pages，仅作预览）：<https://jl0859598-del.github.io/forge-fitness/>
- 源码与发布分支：<https://github.com/jl0859598-del/forge-fitness>（`main` 分支根目录即发布内容）
- Netlify 项目面板：<https://app.netlify.com/projects/forge-train>（账号 jl0859598@gmail.com，团队 Forge Fitness）
- Netlify 的 GitHub App 已安装，但项目与该仓库的连接还需在 Netlify 面板里点一次「Link repository → GitHub」（浏览器需允许弹窗）
- 当前更新方式：本地改完打包，把整包拖到项目概览页的 “Already built it?” 上传区，几秒内部署完成
- 手机上打开链接后，用“添加到主屏幕”安装为全屏应用；首次加载会缓存到本机，之后可离线打开动作库
- 252 张标准动作图已打包进站点（`assets/media/`），不再依赖 GitHub raw 外链
- 应用内已有 `/用户协议`、`/隐私政策`、`/第三方许可` 三页（`#terms`、`#privacy`、`#licenses`），页脚与个人资料设置里都有入口
- 会员页 `#pro`：免费版每月 3 次视频分析，Pro 不限次数；激活码离线校验（ECDSA P-256），不依赖账号或服务器
- `_headers` 已生效：`/assets/vendor/*` 一年 immutable 缓存、`sw.js` 不缓存、基础安全响应头

### 会员与收银

- 生成激活码：`node work/gen-license.mjs --plan pro --days 365 --order ORD20261019001`
- 私钥 `work/license-private.pem` **不要提交、不要上传、不要发给客户**；丢失后无法再生成可用的新码
- 价格与免费额度在 `assets/app.js` 顶部的 `COMMERCE`（`gate`、`freeAnalysesPerMonth`、三档价格）
- 暂不收费：把 `COMMERCE.gate` 改成 `false`，所有功能恢复免费

注意：GitHub Pages 免费版条款不允许把它当作主要面向商业交易或在线业务的免费主机。正式对外收费后，应以 Netlify 域名为准，并考虑关闭 GitHub Pages 镜像或将其改为私有预览。

静态版中拍照估热量不可用（`/api/analyze` 需要服务端）。若要公网也能用，需要把 `server.py` 中的 `/api/analyze` 改成 Netlify/Vercel/Cloudflare 的 Serverless Function 并配置 `OPENAI_API_KEY` 环境变量；不要把 API Key 写进 `assets/app.js`。

## 文件结构

```
forge/
├── index.html
├── manifest.webmanifest
├── sw.js
├── start.command
├── server.py           # 静态服务 + 拍照识别代理
├── .env.example
├── icons/
└── assets/
    ├── styles.css
    ├── exercises.js    # 基础 93 个动作
    ├── exercises-extra.js # 扩展 208 个动作（总计 301）
    ├── exercise-media.js # 144 个动作的标准演示图索引
    ├── pose.js         # 个人视频姿态估计与轨迹分析
    ├── vendor/         # MediaPipe Tasks Vision + WASM + Pose Landmarker 模型
    ├── knowledge.js    # 食物、研究、运动员案例
    └── app.js          # 计划生成、记录、营养、交互
```

## 计划逻辑摘要

- 增肌：复合动作 6–10 次，孤立动作 10–15 次，RIR 1–2，复合动作休息 2–3 分钟
- 力量：复合动作 3–6 次，RIR 2–3，休息 2–3 分钟
- 减脂：保留抗阻训练，8–15 次为主，蛋白质提高，配合低冲击有氧
- 每个大肌群每周约 10–20 个有效组，按经验、恢复和目标调整
- 双重渐进：先在目标次数区间内加次数，达到上限后加 2.5–5% 重量

这些是通用起点，不是医疗处方。疼痛、伤病、孕期、代谢疾病或进食障碍史需要医生/注册营养师个体化评估。

## 数据与隐私

- 训练、体重和饮食记录只保存在浏览器本地；
- 清理浏览器网站数据会删除记录，建议定期用“个人资料 → 导出数据”备份；
- 拍照识别时，照片会发送到你配置的 OpenAI API 用于分析；应用本身不保存照片，也不记录识别历史；
- API Key 只保存在本机 `.env` 或环境变量中，由 `server.py` 读取，不进入手机浏览器。
- 个人训练视频在浏览器本地用 MediaPipe 分析，不上传服务器；关闭页面后视频对象会被释放，只有手动保存的分析摘要会进入本地记录。

## 内容说明

动作的 SFR 评分是训练实践评分，用于比较“单位疲劳下的有效刺激”，不是实验室测量指标。扩展动作由动作家族（角度、握距、器械、单侧、节奏）生成，仍建议以动作舒适度和教练反馈为准。运动员比赛体重、体脂和训练量来自公开资料，可能随赛季变化；媒体数据可能存在误差。研究结论描述群体平均效应，个体反应需要用 4–8 周的训练和体重记录来验证。

教练视频通过官方频道与 B 站搜索页外链展示，版权归原作者所有；本应用不下载、不转存、不重新托管视频。页面中的计划摘要是通用原则解读，不是教练付费计划原文。动作演示图来自 Free Exercise DB（Public Domain / Unlicense），只在与本应用动作定义匹配时显示；未匹配的动作不显示真人图，以避免错误示范。行程轨迹按动作模式逐条配置，展示被跟踪点（杠铃、手腕、髋部、脚踝等）的标准化路径；它不是从个人视频逐帧提取的测量结果，也不能替代现场指导、动作评估和疼痛筛查。

## 免责声明

本应用提供一般健身与营养教育信息，不构成医疗诊断、治疗建议、康复处方或比赛备赛指导。开始新的训练或饮食计划前，尤其是有既往伤病、心血管疾病、糖尿病、肾病、孕期/哺乳期或进食障碍史时，请咨询合格的医生、康复师或注册营养师。
