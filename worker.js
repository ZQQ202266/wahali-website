// Preserve product paths and query parameters when migrating domains.
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (["wahaliqq.com", "www.wahaliqq.com", "hkdfyne.com"].includes(url.hostname)) {
      url.hostname = "www.hkdfyne.com";
      url.protocol = "https:";
      url.port = "";
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  }
};
