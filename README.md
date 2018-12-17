# Smogon Usage Stats

I just wanted to create a simple website which would give the same modern feel for looking at usage stats that we had
in [Sweeper Calc](http://sweepercalc.com/stats/).

## The Future

I could integrate new tech or niceties such as Sweeper Calc and Break My Team. One thing at a time though.

## Local Development

I use Docker cause why not :D

- `docker build -t usage_stats:x.y.z .`
- `docker run -d -P --name web usage_stats:x.y.z`
- `docker ps`
- Open a browser and use either localhost:port or dockerhost:port and boom website.