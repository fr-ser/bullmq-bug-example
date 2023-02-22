import { Job, Queue, Worker } from "bullmq";
import IORedis from "ioredis";

async function main() {
  let redisConnection = new IORedis.Cluster(
    [{ host: "localhost", port: 6379 }]
    // workaround
    // { redisOptions: {} }
  );
  const options = { connection: redisConnection, prefix: `{queueName}` };

  async function jobFunction(job: Job) {
    console.log("job ran");
  }

  const queue = new Queue("queueName", options);
  const worker = new Worker("queueName", jobFunction, options);

  const addedJob = await queue.add("job", {});
  console.log("addedJob", addedJob.id);

  console.log("state of job", await addedJob.getState());

  await queue.close();
  await worker.close();
  redisConnection.disconnect();
}

main()
  .then(() => console.log("done"))
  .catch((err) => {
    throw err;
  });
