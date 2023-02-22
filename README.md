# BullMQ bug example

When using a Redis cluster, we need to create the IORedis connection manually.
When doing so and not providing "redisOptions", bullMQ fails to get a redis version.

## Steps to reproduce

0. Install stuff (docker, node, npm packages). Node used for this example 16.15.0
1. Start redis cluster: `docker compose up`
2. Run code: `npx ts-node example.ts`
3. See the error: "TypeError: Invalid Version: null"
4. Uncomment the "workaround" in the code and run again
5. See no error.
