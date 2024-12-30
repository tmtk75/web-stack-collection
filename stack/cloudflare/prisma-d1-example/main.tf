variable "api_token" {
  # TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
  type = string
}

variable "account_id" {
  type = string
}

provider "cloudflare" {
  api_token = var.api_token
}

locals {
  account_id = var.account_id
}

resource "cloudflare_d1_database" "example" {
  account_id = local.account_id
  name       = "prisma-demo-db"
}

# https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/pages_project
resource "cloudflare_pages_project" "example" {
  account_id        = local.account_id
  name              = "prisma-d1-example"
  production_branch = "main"

  deployment_configs {
    preview {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-04-11"
      compatibility_flags                  = []
      d1_databases                         = {
        DB = cloudflare_d1_database.example.id
      }
      durable_object_namespaces            = {}
      environment_variables                = {}
      fail_open                            = true
      r2_buckets                           = {}
      usage_model                          = "bundled"
      kv_namespaces                        = {}
    }
    production {
      always_use_latest_compatibility_date = false
      compatibility_date                   = "2024-04-11"
      compatibility_flags                  = []
      d1_databases                         = {
        DB = cloudflare_d1_database.example.id
      }
      durable_object_namespaces            = {}
      environment_variables                = {}
      fail_open                            = true
      r2_buckets                           = {}
      usage_model                          = "bundled"
      kv_namespaces                        = {}
    }
  }
}

terraform {
  backend "s3" {
    #
    # terraform init -backend-config=my.tfbackend
    #
    #     $ cat my.tfbackend
    #     profile = "default"
    #     region = "ap-northeast-1"
    #     bucket = "my-terraform-state"
    #
    key = "terraform/github/tmtk75/web-stack-collection/cloudflare/prisma-d1-example/terraform.tfstate"
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}
