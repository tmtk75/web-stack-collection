export async function Server1() {
  const v = await fetch("https://example.com/", {});
  const body = (await v.text()).slice(0, 10);
  return (
    <div>
      <div>server-1</div>
      <div>{body}</div>
    </div>
  );
}
