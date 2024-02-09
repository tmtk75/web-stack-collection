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
    key = "terraform/github/tmtk75/web-stack-collection/cloudflare/remix-template/terraform.tfstate"
  }

  required_providers {
    cloudflare = {
      source  = "cloudflare/cloudflare"
      version = "~> 4"
    }
  }
}
