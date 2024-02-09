variable "api_token" {
  # TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
}

variable "account_id" {
  // You can see with "npx wrangler whoami".
  type = string
}

variable "d1_database_id" {
  // You can see with "npx wrangler d1 list".
  type = string
}

variable "team_name" {
  //
  // used to retrieve public key.
  // https://${team_name}.cloudflareaccess.com/cdn-cgi/access/certs
  //
  //   Zero Trust -> settings. You can see your team domain.
  //     https://one.dash.cloudflare.com/${your_account_id}/settings/custom_pages
  //
  type = string
}

provider "cloudflare" {
  api_token = var.api_token
}

locals {
  account_id = var.account_id
  d1_database = {
    production = var.d1_database_id
  }
}

resource "cloudflare_d1_database" "drizzle" {
  account_id = local.account_id
  name       = "drizzle-sample"
}

#import {
#  to = cloudflare_d1_database.drizzle
#  id = "${local.account_id}/${local.d1_database.production}"
#}

# https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/pages_project
resource "cloudflare_pages_project" "drizzle" {
  account_id        = local.account_id
  name              = "remix-drizzle"
  production_branch = "main"

  deployment_configs {
    preview {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-04-14"
      compatibility_flags                  = []
      d1_databases                         = {
        "drizzle-sample" = cloudflare_d1_database.drizzle.id
      }
      durable_object_namespaces            = {}
      environment_variables                = {
        "TEAM_NAME" = var.team_name
      }
      fail_open                            = true
      r2_buckets                           = {}
      usage_model                          = "standard"
      kv_namespaces                        = {}
    }
    production {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-04-14"
      compatibility_flags                  = []
      d1_databases                         = {
        "drizzle-sample" = cloudflare_d1_database.drizzle.id
      }
      durable_object_namespaces            = {}
      environment_variables                = {
        "TEAM_NAME" = var.team_name
      }
      fail_open                            = true
      r2_buckets                           = {}
      usage_model                          = "standard"
      kv_namespaces =                      {}
    }
  }

}

#import {
#  to = cloudflare_pages_project.drizzle
#  id = "${local.account_id}/remix-drizzle"
#}

