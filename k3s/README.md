# README
This repository provides a collection for web frontend stacks and deployment onto kubernetes.
- k8s manifests example.
- Installation of middlewares with Helm.
- TBD


# Getting Started
## Prepare local registry
You need a local registry to be available.

Please add `insecure-registries` to your docker-desktop if you use.

`Preferences` -> `Docker engine`.
```
  "insecure-registries": [
    "registry.local:5000"
  ]
```

Also edit your `/etc/hosts` to add an entry.

```
$ cat /etc/hosts
...
127.0.0.1 registry.local
```

## Launch k3s and registry
```
[0]$ source k3s.env # To set K3S_TOKEN
[0]$ docker compose -f compose.k3s.yml -f compose.registry.yml up
```
You can see `./kubeconfig.yaml`

Check if it's ready for k3s and registry.
```
# To set KUBECONFIG
[1]$ source k3s.env
[1]$ kubectl get pods -A
NAMESPACE     NAME                                     READY   STATUS      RESTARTS   AGE
kube-system   coredns-77ccd57875-wplbt                 1/1     Running     0          3h58m
...

% curl -X GET http://registry.local:5000/v2/_catalog
{"repositories":[]}
```

## Prepare helm
There are a few middlewares.
```
[1]$ helm repo add bitnami https://charts.bitnami.com/bitnami

# postgresql
[1]$ helm install my-postgres oci://registry-1.docker.io/bitnamicharts/postgresql -f values-postgresql.yaml

# localstack
[1]$ helm install my-aws localstack-charts/localstack
```
```
[1]$ pgpod=$(kubectl get pod -l app.kubernetes.io/name=postgresql -o jsonpath='{.items[0].metadata.name}')
[1]$ kubectl port-forward ${pgpod} 5432
Forwarding from 127.0.0.1:5432 -> 5432
Forwarding from [::1]:5432 -> 5432

[2]$ PGPASSWORD=abc123 psql -q -h localhost -U postgres -d postgres
postgres=#
```

# Next
See each sub directory like ../stack/nextjs/app-router-prisma.

