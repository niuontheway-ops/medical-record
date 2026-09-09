# 病历书写入门 · 临床第一课

面向中国大陆临床新人的独立图文教学网页。21节课、63段可点击批注、21组错误对照与21道反馈练习，兼顾手机与电脑。

## 运行

Node.js >=22.13；使用项目的 pnpm-lock.yaml 安装依赖。开发：`pnpm dev`，构建：`pnpm build`，本地运行：`pnpm start`，打开 http://127.0.0.1:4200/ 。也可直接调用 `node scripts/build.mjs` 和 `node scripts/serve.mjs`。静态导出位于 `dist/client`，可由普通静态HTTP服务器运行。

GitHub Pages 手机版使用 `.github/workflows/deploy-pages.yml` 自动构建，并通过 `/medical-record` 基础路径发布。电脑本地发布包由 `desktop` 内的启动文件和静态导出组成。

## 教学说明

内容是原创教学讲解，所有病例为虚构节选，不能直接提交为临床病历。规范来源和条款在每节及网页底部展示，核对日期为2026年9月9日。院内模板、专科要求、书写人员资质与审阅流程需由带教老师结合本院制度确认。本课程不生成真实患者病历、不接收患者隐私数据。

授课前请老师重点复核：现行规范和院内时限、签署资格与知情同意流程、电子病历修订权限、完整病历模板，以及示例与学员专业的适用性。书写练习不能替代实际病情判断。

## 插画

内置 ImageGen 原创生成三张插图，分别用于带教审阅、平视问诊和呼吸系统前后胸查体，保存于 `public/images`，已压缩为WebP。

提示词摘要：warm detailed 3D cartoon clinical education; East Asian senior female doctor and young resident reviewing blank chart / resident and patient taking history at equal eye level / two-panel anterior and posterior respiratory examination; dark teal/navy, warm ivory, small amber accents; 3:2; no text, logos or patient data.

## 验证范围

类型检查与课程结构校验；检查21个课程ID、63条批注和每题答案反馈结构。未开展额外浏览器UI测试。提供一个可选WebMCP课程导航工具；无支持的验证上下文时不宣称其已通过运行验证。
