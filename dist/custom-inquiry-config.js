/* Public configuration only. Never put mail/API secrets in this file. */
window.WAHALI_CUSTOM_INQUIRY_CONFIG = {
  endpoint: '', // Configure a receiving service before enabling online delivery.
  timeoutMs: 20000,
  files: {
    extensions: ['jpg', 'jpeg', 'png', 'pdf', 'ai', 'eps', 'svg'],
    maxCount: 10,
    maxBytesEach: 10 * 1024 * 1024,
    maxBytesTotal: 25 * 1024 * 1024
  },
  // Enquiry ranges, not MOQ promises. These are the only quantity choices.
  quantityOptions: [
    {value: 'undecided', label: 'Not Decided Yet'},
    {value: 'under-100', label: 'Less than 100 pieces'},
    {value: '100-300', label: '100–300 pieces'},
    {value: '301-1000', label: '301–1000 pieces'},
    {value: 'over-1000', label: 'Over 1000 pieces'},
    {value: 'custom', label: 'Custom Quantity'}
  ],
  contact: {email: 'zqq202266@gmail.com', whatsapp: '85294603714'}
};
