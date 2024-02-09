# README
This directory serves an example for cloudflare pages with drizzle to use d1 database.

# How to deploy
Assuming
* `wrangler` is availale to be authenticated with enough permissions.
* `terraform` >~ 1.7

```[console]
$ corepack enable pnpm
$ pnpm i
```

## Set up
Prepare an API token.
<https://dash.cloudflare.com/profile/api-tokens>
```[bash]
# bash
CLOUDFLARE_API_TOKEN=<your-api-token>
```

Create `env.auto.tfvars` like
```
account_id     = "<your-account-id>"  # npx wrangler whoami shows it.
#d1_database_id = "(optional: when to import)"
```

```[console]
$ terraform apply
...

$ terraform show
resource "cloudflare_d1_database" "drizzle" {
    account_id = "<your-account-id>"
    id         = "33139a7f-053a-47d2-9ab5-45b287834b60"
    name       = "drizzle-sample"
...
```

Replace the `database_id` of `[[d1_databases]]` in `wrangler.toml` with your `database_id`.

```
$ pnpm run deploy
```

## Drizzle part
```[console]
$ npx drizzle-kit generate:sqlite
$ npx wrangler d1 migrations apply drizzle-sample --local
$ npx wrangler d1 migrations apply drizzle-sample --remote
```

## Development
```[console]
$ pnpm run dev
```
Visit <http://localhost:5173/users>.

## Preview
```[console]
$ pnpm run preview
```
Visit <http://localhost:8788/users>.


## Drizzle studio
```
$ export DATABASE_URL=$(ls -trh `find .wrangler -name '*.sqlite'` | tail -1)

# The value is like this .wrangler/state/v3/d1/miniflare-D1DatabaseObject/e9a9b56c7ed8b3e1438446583d1d47d9fd2984f685a6f6fad4b2b2798105992c.sqlite

$ npx drizzle-kit stuio

...

Drizzle Studio is up and running on https://local.drizzle.studio
```
Visit <https://local.drizzle.studio>

