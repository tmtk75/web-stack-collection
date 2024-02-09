# README
# Development
```
[0]$ source ./k3s.env
[0]$ awspod=$(kubectl get pod -l app.kubernetes.io/name=localstack -o jsonpath='{.items[0].metadata.name}')
[0]$ kubectl port-forward ${awspod} 4566

[1]$ source ./k3s.env
[1]$ aws s3 ls; echo $?
[1]$ aws s3api create-bucket --region ap-northeast-1 --bucket tmp-nextjs-app --create-bucket-configuration LocationConstraint=ap-northeast-1
{
    "Location": "http://tmp-nextjs-app.s3.localhost.localstack.cloud:4566/"
}
```
```
[2]$ source ./k3s.env
[2]$ pgpod=$(kubectl get pod -l app.kubernetes.io/name=postgresql -o jsonpath='{.items[0].metadata.name}')
[2]$ kubectl port-forward ${pgpod} 5432

[1]$ npm install
[1]$ npx prisma migrate dev --name init
[1]$ npx ts-node --compilerOptions '{"module":"commonjs"}' script.ts
[1]$ npx prisma studio # (optional) you can check with a web UI.
```
```
[1]$ npm run dev
   ...
   - Local:        http://localhost:3000
   - Environments: .env
   ...
```


# Deployment
Assuming k3s is running on the local machine. See ../

```
[1]$ docker build -t nextjs-app .
[1]$ docker tag nextjs-app registry.local:5000/nextjs-app
[1]$ docker push registry.local:5000/nextjs-app

[1]$ kubectl apply -k .
```

wait before long, then.
```
[1]$ curl --head localhost:80
HTTP/1.1 200 OK
Cache-Control: private, no-cache, no-store, max-age=0, must-revalidate
Content-Type: text/html; charset=utf-8
Date: Sat, 20 Apr 2024 07:51:07 GMT
Vary: RSC, Next-Router-State-Tree, Next-Router-Prefetch, Next-Url, Accept-Encoding
X-Powered-By: Next.js
```
