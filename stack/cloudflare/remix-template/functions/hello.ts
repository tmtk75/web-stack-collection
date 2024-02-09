//
// https://developers.cloudflare.com/pages/functions/typescript/
//
export const onRequest: PagesFunction<Env> = async (context) => {
  console.log("hello world");
  const v = await context.env.STORE_KV.get("hello");
  return new Response(
    JSON.stringify(context, null, "  ") + `hello's value: ${v}`
  );
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  return new Response("it's a post");
};
