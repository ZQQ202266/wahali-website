# Product Customization / Custom Inquiry

## Existing project inspected

- Static HTML, CSS and browser JavaScript; no framework, build step or installed application dependencies.
- Cloudflare Workers serves `dist/` via `wrangler.jsonc`. There is currently no Worker script, inquiry API, database, mail sender or attachment storage.
- Shared UI: `client.js` renders the homepage navigation, search, language menu, cart, support widget and footer. `client.css`, `typography.css` and `visual-system.css` define the existing fonts and visual system.
- Avenir Next/system fallback for UI and Manrope for headings. No new fonts. Barlow Condensed remains limited to homepage banners.
- Product imagery comes from the existing 98-style catalogue (`catalogue/images/women-v2/`); the WAHALI logo is shared. No images were generated.

## Routes and files

- `/product-customization.html`: new canonical product-customization page.
- `/customisation.html`: existing site links render the same new page, with the homepage shell.
- `dist/custom-inquiry.js`: localized page markup, in-memory draft, validation, files and interaction.
- `dist/custom-inquiry.css`: page-scoped layout; does not change the global visual system.
- `dist/custom-inquiry-config.js`: public endpoint, quantity ranges, file limits and contact configuration.
- `dist/custom-inquiry-adapter.js`: real multipart transport adapter. No fake success path.

Existing standalone style files and other page components remain in the repository. The homepage customization preview remains independent and has not replaced its homepage module.

## Current functionality

- Required quantity selection; Custom Quantity reveals an integer input. Not Decided Yet is a valid selection. Ranges are enquiry guidance, not MOQ promises.
- Optional native date picker; local-calendar minimum date and validation reject past dates.
- Exactly Logo, Color, Label, Material and Package; multiple choices allowed.
- Click, keyboard and drag-and-drop multiple-file selection. Name, format, size and removal are shown.
- JPG/JPEG, PNG, PDF, AI, EPS, SVG. Default limit: 10 files, 10 MiB each, 25 MiB combined. Files with unapproved extensions or over limits are not added. Selected files stay in memory, never in localStorage.
- Required nonblank Full Name, required email format; optional company, country/region and WhatsApp.
- Pending state, duplicate-submit protection, timeout, HTTP failure, explicit receipt acknowledgment and preserved values/files after errors.
- English, Spanish, French and Portuguese; switching language keeps draft and files.
- Manual email/WhatsApp preparation uses the current contact address. Customers must attach selected files themselves to those messages.

## No real receiving service connected yet

`endpoint` is deliberately empty. A valid submit therefore displays **not sent**, preserves the draft/files, and performs no network request. Local file selection is not a completed server upload. The success message appears only after a configured receiving service returns an explicit successful acknowledgment.

The automated QA success/failure/timeout paths use a temporary browser fetch mock; no inquiry or customer message is sent during tests. No mock is present in production code.

## Receiving-service contract

Set `WAHALI_CUSTOM_INQUIRY_CONFIG.endpoint` to a verified HTTPS receiving endpoint, preferably a same-origin route such as `/api/custom-inquiries` after implementing it. That route does **not** currently exist. A static hosting fallback is not a receiving service.

POST `multipart/form-data` with:

- `inquiry`: JSON string with `schemaVersion`, `requestId`, `language`, `page`, `estimatedQuantity`, `customQuantity`, `targetDeliveryDate`, `customization`, `notes`, `contact`, `references`, and file metadata.
- `files`: repeated binary file parts with their original names.

Success response, only after actually accepting/persisting the inquiry and attachments or queuing delivery:

```json
{"success": true, "reference": "YOUR-INQUIRY-ID"}
```

Use a non-2xx response or `{"success": false}` on failure. A 200 HTML or empty response is treated as unconfirmed. HTTP 413 gives an attachment-size error. The request ID can be used for idempotency on the server.

## Configuration needed for actual receipt

1. A receiving endpoint and the agreed delivery/storage workflow. Gmail recipient `zqq202266@gmail.com` is already known; an email address alone is not an API.
2. If using email delivery, verified sender/service credentials stored only in backend secrets. Do not place credentials in public JS or Git.
3. Attachment storage, access policy and retention/deletion period; confirm per-file/combined/count limits. Backend must independently validate file signatures/types, sizes and payload fields; browser checks alone are insufficient.
4. Server-side anti-spam/rate limits, idempotency and operational delivery/error logs. Cross-origin services must configure CORS for the site.
5. Confirm the privacy/retention wording before enabling collection. Do not show receipt confirmation until the service confirms acceptance.

No third-party service, account, secret or paid resource was added by this change.
