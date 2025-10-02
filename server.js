const express = require("express");
const { createBullBoard } = require("@bull-board/api");
const { BullAdapter } = require("@bull-board/api/bullAdapter");
const { ExpressAdapter } = require("@bull-board/express");
const Queue = require("bull");

const queue = new Queue("n8n", { redis: { host: "redis", port: 6379 } });

const serverAdapter = new ExpressAdapter();
createBullBoard({
  queues: [new BullAdapter(queue)],
  serverAdapter,
});

const app = express();
serverAdapter.setBasePath("/ui");
app.use("/ui", serverAdapter.getRouter());

app.listen(3002, () => {
  console.log("Bull Board running on http://localhost:3002/ui");
});
