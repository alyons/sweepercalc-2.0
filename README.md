# Sweeper Calc 2.0

Sweeper Calc wasn't kept up with, and I wanted a small project to build that would make me have to do a few different 
forms of development.

## Versions
### Version 1.X - Smogon Data Viewer

 - View all of the data from all of the metagames played on Smogon over the it's lifetime
 - Ability


## How to Run

 - Node 12.x
 - npm i
 - npm run buildDev
 - npm start

## Building for Deployment

Use [this video](https://www.youtube.com/watch?v=z525kfneC6E) as a basis for building the application.

1. Create a Lightsail Ubuntu Container with `lightsail-compose.sh` as the launch script
2. Create a Loadbalancer and attach it to the container
3. Map Route53 to the Load Balancer with the correct url
4. Create a Certificate in Lightsail (you cannot use ACM with Lightsail)
