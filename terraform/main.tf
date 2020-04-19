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

resource "aws_route53_record" "main" {
  name    = "smogon-data"
  zone_id = "Z3K5R41ZR8SSIW"
  type    = "A"
  ttl     = 300
  records = ["161.35.106.62"]
}
