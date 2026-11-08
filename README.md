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

当前98个女装独立款式、66组搭配。WH-W-SH-002（6.5英寸）已恢复；WH-W-SH-009及其搭配继续排除。面料、尺码、起订量和交期按询盘确认。

客户选择保存在浏览器；客户先预览，再手动用WhatsApp或邮箱发送。文件选择只在摘要中列文件名，附件需要客户随邮件或WhatsApp另行发送；没有云端文件上传。

客户联系邮箱：zqq202266@gmail.com；WhatsApp：+852 9460 3714。

## PDF 同步

在 Mac 安装 Chrome 后运行 `python3 scripts/build-catalogue.py`；生成匹配的 PDF 与 catalogue-manifest.json，然后一起提交。此脚本不是 Cloudflare 构建命令。

PDF 的绝对链接使用正式域名 https://www.wahaliqq.com，与独立客户选款目录一致。

暂保留 noindex / robots 禁止收录，待资料确认后开放搜索收录。

源码来源：现有网站已发布版本 v104；不包含原托管账号凭据或部署配置。

## 加载优化（2026-11-08）

首页 Banner 使用 960/1672 像素 WebP，并在 HTML 提前请求；导航 Logo 为 360×240 PNG（约35 KB）。图片缓存一天，字体缓存七天；HTML、脚本及样式沿用重新验证，保证代码更新可见。以后替换图片或字体时使用新文件名并更新引用，避免浏览器继续使用旧素材。此次没有改动产品数据、客户目录内容或 PDF 内容。

## 首页调整（2026-11-08）

语言入口合并为 English/EN、Spanish/ES、French/FR、Portuguese/PT，不再展示地区与国旗；定制页初始标题修正，产品详情标题跟随商品名称。Banner 文案在桌面端对齐 WOMEN。移除首页面料模块，更新流程与目录资源区。独立客户目录补充法语。新定制区仅在 custom-home-preview.html 显示，首页仍保留原定制区；经确认后再替换。PDF 已重建并将链接切换至正式域名。

## 女装九类整合（2026-11-08）

替换旧女装为98个独立单品、66组搭配、九类入口；Tracksuits兼容原Sets状态。恢复WH-W-SH-002的6.5英寸款，WH-W-SH-009继续排除。旧40个来源编号退出选款，旧链接显示Collection updated。运行图片来自交接包的Eagle压缩副本。首页、详情、独立询盘和PDF同步；PDF正式域名为https://www.wahaliqq.com，颜色圆点可点击，使用scripts/pdf-link-appearance.js保留无高亮链接。

## Product Customization inquiry page

The new /product-customization.html and existing /customisation.html share the homepage header/footer. The responsive form supports configured quantity ranges, custom quantity, five branding options, local multi-file selection/drag/drop/removal, date and contact validation. The multipart adapter is implemented but endpoint remains empty: online submission explicitly reports not sent, and customers can still prepare a WhatsApp/email inquiry with manual attachments. No server-side receiver or third-party service has been added. See docs/custom-inquiry.md for the receiving-service contract and required backend configuration.

## Catalogue release — 2026-11-08

`dist/catalogue.pdf` and the published lightweight `dist/catalogue-print.html` use the current formal product data. Revision 6 includes transparent whole-card links, inline right-aligned View details / View look links and clickable colour dots. Regenerate with `WAHALI_PUBLIC_BASE_URL="https://www.wahaliqq.com" python3 scripts/build-catalogue.py`; the script uses `scripts/pdf-link-mode.py` and records PDF/preview/data hashes in `dist/catalogue-manifest.json`. The homepage, enquiry catalogue and retained local PDF aliases continue to use the same catalogue.
