/* Receiving-service contract is documented in docs/custom-inquiry.md. */
(() => {
  'use strict';
  class InquiryError extends Error {
    constructor(code) { super(code); this.code = code; }
  }
  window.CustomInquiryTransport = {
    async submit(inquiry, files, config = window.WAHALI_CUSTOM_INQUIRY_CONFIG) {
      if (!config.endpoint?.trim()) throw new InquiryError('notConfigured');
      const endpoint = new URL(config.endpoint, location.href);
      if (endpoint.protocol !== 'https:' && !['localhost', '127.0.0.1'].includes(endpoint.hostname)) {
        throw new InquiryError('notConfigured');
      }
      const body = new FormData();
      body.append('inquiry', JSON.stringify(inquiry));
      files.forEach(file => body.append('files', file, file.name));
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), config.timeoutMs);
      try {
        const response = await fetch(endpoint.href, {
          method: 'POST', body, signal: controller.signal, credentials: 'same-origin'
        });
        if (!response.ok) throw new InquiryError(response.status === 413 ? 'serverSize' : 'sendFailed');
        const result = await response.json().catch(() => null);
        // A 200 HTML fallback or empty response must never count as receipt.
        if (result?.success !== true) throw new InquiryError('unconfirmed');
        return {reference: typeof result.reference === 'string' ? result.reference.slice(0, 120) : ''};
      } catch (error) {
        if (error instanceof InquiryError) throw error;
        throw new InquiryError(error.name === 'AbortError' ? 'timeout' : 'sendFailed');
      } finally {
        clearTimeout(timer);
      }
    }
  };
})();
