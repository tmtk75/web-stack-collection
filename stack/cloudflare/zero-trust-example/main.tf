#
# https://developers.cloudflare.com/api/
#
variable "api_token" {
  # TF_VAR_api_token=${CLOUDFLARE_API_TOKEN} terraform plan
}

variable "account_id" {
  type = string
}

variable "application_id" {
  type = string
}

variable "github_client_id" {
  type = string
}

variable "github_client_secret" {
  type = string
}

provider "cloudflare" {
  api_token = var.api_token
}

locals {
  account_id = var.account_id
}

// https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/access_application
resource "cloudflare_access_application" "main" {
  // Need a permission: Access: Apps and Policies:Edit
  account_id                 = local.account_id # It's required that an account_id or zone_id is provided and in most cases using either is fine. However, if you're using a scoped access token, you must provide the argument that matches the token's scope. For example, an access token that is scoped to the "example.com" zone needs to use the zone_id argument.
  name                       = "zero-trust-sample"
  domain                     = "remix-drizzle.pages.dev"
  type                       = "self_hosted"
  session_duration           = "24h"
  auto_redirect_to_identity  = false
  enable_binding_cookie      = false
  http_only_cookie_attribute = true
  same_site_cookie_attribute = "none"
  logo_url                   = "https://www.memodify.com/favicon256x256.svg"
}

import {
  to = cloudflare_access_application.main
  id = "${local.account_id}/${var.application_id}"
}

#
# https://developers.cloudflare.com/cloudflare-one/api-terraform/access-with-terraform/
# https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/access_policy
#
# Allowing access to `test@example.com` email address only
resource "cloudflare_access_policy" "email_policy" {
  application_id = cloudflare_access_application.main.id
  #zone_id        = "0da42c8d2132a9ddaf714f9e7c920711"
  name       = "zero-trust-sample"
  precedence = "1"
  decision   = "allow"

  include {
    email = ["ktmtmks@gmail.com"]
  }
  require {
    ip = [
      "113.35.165.3/32"
    ]
    #any_valid_service_token = false
    #certificate             = false
    #device_posture          = []
    #email                   = []
    #email_domain            = []
    #everyone                = false
    #geo                     = []
    #group                   = []
    #ip_list       = []
    #login_method  = []
    #service_token = []
  }
}

import {
  to = cloudflare_access_policy.email_policy
  id = "account/${local.account_id}/${cloudflare_access_application.main.id}/0c63658a-60cb-470a-adce-d1910010cd85"
}

## Allowing `test@example.com` to access but only when coming from a
## specific IP.
#resource "cloudflare_access_policy" "test_policy2" {
#  application_id = cloudflare_access_application.main.id
#  zone_id        = "0da42c8d2132a9ddaf714f9e7c920711"
#  name           = "staging policy"
#  precedence     = "1"
#  decision       = "allow"
#
#  include {
#    email = ["test@example.com"]
#  }
#
#  require {
#    ip = ["192.168.1.1"]
#  }
#}

// Access: Organizations, Identity Providers, and Groups:Edit
resource "cloudflare_access_identity_provider" "pin_login" {
  account_id = local.account_id
  name       = "PIN login"
  type       = "onetimepin"
}

import {
  to = cloudflare_access_identity_provider.pin_login

  # NOTE: The ID is contained in the URL of the identity provider in the Cloudflare dashboard.
  #   https://one.dash.cloudflare.com/${your_account_id}/settings/authentication/idp/edit/583b1135-59e4-4dca-86c6-675522a59c72
  id = "${local.account_id}/583b1135-59e4-4dca-86c6-675522a59c72"
}

// Access: Organizations, Identity Providers, and Groups:Edit
resource "cloudflare_access_identity_provider" "github" {
  account_id = local.account_id
  name       = "GitHub"
  type       = "github"
  config {
    client_id                  = var.github_client_id
    client_secret              = var.github_client_secret
    attributes                 = []
    claims                     = []
    conditional_access_enabled = false
    pkce_enabled               = false
    scopes                     = []
    sign_request               = false
    support_groups             = false
  }
}

import {
  to = cloudflare_access_identity_provider.github

  # NOTE: The ID is contained in the URL of the identity provider in the Cloudflare dashboard.
  #   https://one.dash.cloudflare.com/${your_account_id}/settings/authentication/idp/edit/48107188-3246-457f-a5a9-9fd1a5927125
  id = "${local.account_id}/48107188-3246-457f-a5a9-9fd1a5927125"
}

