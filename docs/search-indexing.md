# Search indexing readiness — 2026-11-08

The owner authorized crawl/indexing configuration updates in this conversation, while explicitly postponing sitemap submission. No Search Console submission, sitemap ping, Google account action, DNS change or domain-verification change is performed by this release.

## Public scope

- Homepage and its B-design alias.
- Women’s catalogue, its catalogue/index.html alias, and nine categories.
- All 98 active product references, including the resumed WH-W-SH-002. Publication hold WH-W-SH-009 remains excluded.
- About, Contact and Product Customization; the old customisation route canonicalizes to Product Customization.
- English, Spanish, French and Portuguese have separate URL variants.

Each product canonical keeps its own `ref`. Category canonicals keep the category. Region, design, colour, sort and tracking values are omitted. English uses the URL without `lang`; other languages use `lang=es/fr/pt`. Five reciprocal alternatives (four languages and x-default English) are emitted in page heads and sitemap entries. No product is canonicalized to another product.

## Exclusions

Cart/shared-cart URLs, independent customer inquiry utilities, PDF/print-preview files, design previews, placeholder/draft policy and men’s pages, text-search results, missing/held/retired product references and generic detail URLs without a reference stay noindex. The customer directory and PDF remain publicly accessible for sharing. They are not sitemap entries.

`_headers` no longer applies a site-wide noindex. It retains file/utility-specific noindex directives and existing cache settings. Public source HTML has no noindex. Invalid product/search states receive noindex when rendered.

## Existing JavaScript architecture

The site remains static HTML with browser-rendered content. `dist/search-indexing.js` updates one canonical, five language alternatives, title and description from actual page/language/product state. `client.js` calls it after rendering and on language changes. Generic product HTML deliberately has no fixed canonical pointing every reference to one product. Search engines must render JavaScript to see each product’s content and metadata. Crawl access is enabled for scripts, CSS and imagery.

Google documentation permits a JavaScript-injected canonical when an initial consistent canonical is unavailable, and cautions against removing a source-level noindex solely with JavaScript. This release clears the public source HTML and HTTP-level noindex as well.

References:
- https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- https://developers.google.com/search/docs/specialty/international/localized-versions

## Sitemap

`python3 scripts/build-search-indexing.py` regenerates `dist/sitemap.xml`, public template robot/script tags, `dist/robots.txt` and `docs/search-indexing-manifest.json` from formal product data. 112 distinct page/category/product entities × 4 languages = 448 unique URLs. The generator does not change product data, PDFs, pictures, contacts or site styling.

The sitemap is accessible at https://www.wahaliqq.com/sitemap.xml but **has not been submitted**. Its URL is deliberately not advertised in robots.txt pending the owner’s separate submission instruction. Publishing crawl permissions allows organic discovery; it does not guarantee Google indexing and cannot prevent discovery until manual submission.

## Verification and remaining owner step

Local browser: 160 cases passed, including all 98 references, core pages/categories in four languages, and invalid-reference/utility exclusions. Static validation checks sitemap uniqueness, language alternatives, reference validity and source HTML robots tags. The global block has been removed; file-specific exclusions remain.

The prior DNS read showed a Google verification TXT record, but it does not identify which Google account owns the Search Console property. The owner must confirm “Ownership verified” for the intended account/property in Search Console. Account verification and actual indexing status cannot be inferred from public DNS alone. Submit the sitemap only after that confirmation and a separate instruction to submit.
