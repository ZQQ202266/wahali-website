# WAHALI website

WAHALI 静态官网。使用现有 Avenir Next / Manrope 字体体系，产品选款、定制需求、WhatsApp／邮件询盘；不含在线支付或后端收件。

## 当前部署：Cloudflare Workers 静态网站

Cloudflare 项目名：wahali-website，连接 GitHub 仓库 ZQQ202266/wahali-website。

- Production branch: main
- Build command: 留空 / None
- Deploy command: npx wrangler deploy
- Root directory: 仓库根目录（/）
- 静态网站目录：dist，由 wrangler.jsonc 的 assets.directory 明确指定

Workers 支持纯静态网站，不需要另建 Pages 项目。只发布 dist，不把源码说明、内部规则和维护脚本作为网页提供。

先检查项目的 workers.dev 地址，再安排正式域名切换；保留原站和原 DNS，直到新部署验收通过。

官方说明：https://developers.cloudflare.com/workers/static-assets/binding/

如未来改用 Pages：preset None，build exit 0，output dist，main 分支。

## 更新方式

修改 dist 下文件，检查后提交 main。配置 Git 集成后，Cloudflare Workers 自动发布。公开前可用其他分支产生预览部署。

- 首页：dist/index.html（B 版首页）；兼容入口 b.html
- 女装目录：dist/women.html
- 详情：dist/product/shorts.html?ref=WH-W-SH-001
- 定制：dist/customisation.html
- 独立询盘目录：dist/inquiry/index.html
- 英文目录：dist/catalogue.pdf
- 共享字体：dist/visual-system.css
- 数据：dist/client-data.js

## 资料和发布约束

当前57个款式、61组搭配。WH-W-SH-002、WH-W-SH-009及对应搭配暂停公开，保留排除规则。面料、尺码、起订量和交期按询盘确认。

客户选择保存在浏览器；客户先预览，再手动用WhatsApp或邮箱发送。文件选择只在摘要中列文件名，附件需要客户随邮件或WhatsApp另行发送；没有云端文件上传。

客户联系邮箱：zqq202266@gmail.com；WhatsApp：+852 9460 3714。

## PDF 同步

在 Mac 安装 Chrome 后运行 `python3 scripts/build-catalogue.py`；生成匹配的 PDF 与 catalogue-manifest.json，然后一起提交。此脚本不是 Cloudflare 构建命令。

PDF中现有绝对链接暂保留已发布的预览来源；正式域名切换验收时统一更新生成脚本 BASE 与 PDF 链接。

暂保留 noindex / robots 禁止收录，待资料确认后开放搜索收录。

源码来源：现有网站已发布版本 v104；不包含原托管账号凭据或部署配置。
