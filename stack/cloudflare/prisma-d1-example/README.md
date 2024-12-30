# README
## Getting Started locally
ref: <https://zenn.dev/slowhand/articles/c043f67f60731d>

Create local D1 database with wrangler.
```
% DB_NAME=prisma-demo-db
% pnpm dlx wrangler d1 migrations create $DB_NAME user

 ⛅️ wrangler 3.99.0
-------------------

✔ No migrations folder found. Set `migrations_dir` in your wrangler.toml file to choose a different path.
Ok to create /path/to/web-stack-collection/stack/cloudflare/prisma-d1-example/migrations? … yes
✅ Successfully created Migration '0001_user.sql'!

The migration is available for editing here
/path/to/web-stack-collection/stack/cloudflare/prisma-d1-example/migrations/0001_user.sql
```

Update the migration file.
```
% pnpm dlx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma

[+] Added tables
  - User

[*] Changed the `User` table
  [+] Added unique index on columns (email)

% pnpm dlx prisma migrate diff --from-empty --to-schema-datamodel ./prisma/schema.prisma --script --output migrations/0001_user.sql
```

## Migration locally
Apply the migration locally.
```
pnpm dlx wrangler d1 migrations apply $DB_NAME --local
```

Insert seed data.
```
% pnpm dlx wrangler d1 execute $DB_NAME --local --file=seed.sql
```


## Deploy on Cloudflare Workers
```
terraform init -backend-config your-backend.tfbackend
source your-cloudflare-credentials.sh
echo ${CLOUDFLARE_API_TOKEN}
TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
```


## Migration remotely
Apply the migration remotely.
```
pnpm dlx wrangler d1 migrations apply $DB_NAME --remote
```

Insert seed data.
```
% pnpm dlx wrangler d1 execute $DB_NAME --local --file=seed.sql
```


## Deploy remotely
```
pnpm run deploy
```
Visit your workers-and-pages, https://dash.cloudflare.com/.
You'll see a response in JSON from the worker.
