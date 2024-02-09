#!/usr/bin/env bash
app_name=nextjs-app

function ship() { # Ship the app to the registry.
  tag=${1-${app_name}}
  build ${tag}
  push ${tag}
}

function build() { # Build the image.
  tag=${1-${app_name}}
  docker build -t ${tag} .
}

function push() { # Push the image to the local registry.
  tag=${1-${app_name}}
  docker tag ${tag} registry.local:5000/${tag}
  docker push registry.local:5000/${tag}
}

function port-forward-localstack() { # Port forward to the localstack.
  source ./k3s.env
  awspod=$(kubectl get pod -l app.kubernetes.io/name=localstack -o jsonpath='{.items[0].metadata.name}')
  kubectl port-forward ${awspod} 4566
}

function port-forward-postgres() { # Port forward to the postgres.
  source ./k3s.env
  pgpod=$(kubectl get pod -l app.kubernetes.io/name=postgresql -o jsonpath='{.items[0].metadata.name}')
  kubectl port-forward ${pgpod} 5432
}

#
# Unsupported
#
#function delete-image() {
#  tag=${1-${app_name}}
#  curl -i \
#    -H "Accept: application/vnd.docker.distribution.manifest.v2+json" \
#    localhost:5000/v2/${tag}/manifests/latest \
#    | grep Docker-Content-Digest \
#    | awk '{print $2}' | tr -d '\r' \
#    | while read digest; do
#      curl -X DELETE localhost:5000/v2/${tag}/manifests/${digest}
#    done
#}

function usage() {
cat<<EOH
Usage: $0 <command>

  Commands:
EOH
  cat $0 | grep -E 'function [a-z-]+.*#' | sed -E 's/^function //; s/\(.*#/,/; s/^//' | column -s, -t | sed 's/^/    /' | sort
  echo
}

if [ $# -eq 0 ]; then
  usage
  exit 1
fi

$*
