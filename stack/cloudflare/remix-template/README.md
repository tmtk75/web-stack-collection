# README
a remix app sample accessing kv.
this was created
```
npm create cloudflare@latest remix-template -- --framework=remix
```

How to deploy.
```
$ terraform init -backend-config your.tfbackend

$ TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan

Update wrangler.toml with issued IDs. You can see them with "npx wrangler kv:namespace list"

$ pnpm install && pnpm run deploy

No project specified. Would you like to create one or use an existing project?
  Create a new project
❯ Use an existing project
Select a project:
❯ remix-template

...

✨ Deployment complete! Take a peek over at https://dd68cc18.remix-template-1yk.pages.dev
```

You can open the URL.

It shows [null] because of values in the kv.
You can put a value for the key, `hello`.
``
$ npx wrangler kv:key put hello world --namespace-id 6f307ce11a7e45a3946f7dc646d09342
 ⛅️ wrangler 3.50.0 (update available 3.51.2)
-------------------------------------------------------
Writing the value "world" to key "hello" on namespace 6f307ce11a7e45a3946f7dc646d09342.
```
