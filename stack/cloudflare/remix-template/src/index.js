//
// minimal worker: https://developers.cloudflare.com/workers/get-started/guide/
//
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
