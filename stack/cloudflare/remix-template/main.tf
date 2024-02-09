variable "api_token" {
  # TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
  type = string
}

variable "account_id" {
  type = string
}

locals {
  account_id = var.account_id
}

provider "cloudflare" {
  api_token = var.api_token
}

resource "cloudflare_workers_kv_namespace" "store_kv" {
  account_id = local.account_id
  title      = "STORE_KV"
}

resource "cloudflare_workers_kv_namespace" "store_kv_preview" {
  account_id = local.account_id
  title      = "STORE_KV_preview"
}

# https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/pages_project
resource "cloudflare_pages_project" "remix" {
  account_id        = local.account_id
  name              = "remix-template"
  production_branch = "main"

  deployment_configs {
    preview {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-04-11"
      compatibility_flags                  = []
      d1_databases                         = {}
      durable_object_namespaces            = {}
      environment_variables                = {}
      fail_open                            = true
      r2_buckets                           = {}
      usage_model                          = "bundled"
      kv_namespaces                        = {
        STORE_KV = cloudflare_workers_kv_namespace.store_kv_preview.id
      }
    }
    production {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-04-11"
      compatibility_flags                  = []
      d1_databases                         = {}
      durable_object_namespaces            = {}
      environment_variables                = {}
      fail_open                            = true
      r2_buckets                           = {}
      usage_model                          = "bundled"
      kv_namespaces = {
        STORE_KV = cloudflare_workers_kv_namespace.store_kv.id
      }
    }
  }
}

