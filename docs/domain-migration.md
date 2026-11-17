# Domain migration — 2026-11-17

Primary address: https://www.hkdfyne.com

Cloudflare Worker: wahali-website. All four apex/www domains stay bound. worker.js redirects wahaliqq.com, www.wahaliqq.com and hkdfyne.com to www.hkdfyne.com with HTTP 301, preserving pathname and query parameters. Static assets are served through env.ASSETS.

Website footer, canonical/hreflang, 448 sitemap URLs, customer PDF and retained PDF aliases use the new domain. 98 styles and 66 pairings remain unchanged. The old domain should remain registered and connected for redirects.

Google domain verification and Search Console change of address require the owner's account. Sitemap submission is still on hold; do not submit automatically.
