# README
```
terraform init -backend-config your-backend.tfbackend
source your-cloudflare-credentials.sh
echo ${CLOUDFLARE_API_TOKEN}
TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
pnpm run deploy
```
