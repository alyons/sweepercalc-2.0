provider "aws" {
  version = "~> 2.0"
  region = "us-east-1"
}

terraform {
  backend "s3" {
    bucket = "lyons-terraform"
    key = "smogon_data"
    region = "us-east-1"
  }
}

resource "aws_s3_bucket" "main" {
  bucket = "smogon-data.platinumleo.com"
  policy = file("policy.json")

  website {
    index_document = "index.html"
  }
}

resource "aws_route53_record" "main" {
  zone_id = "Z3K5R41ZR8SSIW"
  name = "smogon-data"
  type = "A"
  alias {
    name = "s3-website-us-east-1.amazonaws.com"
    zone_id = "Z3AQBSTGFYJSTF"
    evaluate_target_health = false
  }
}
