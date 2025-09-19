const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const Queue = require('bull');

// Setup the Bull Board UI using Express
const serverAdapter = new ExpressAdapter();
serverAdapter.setBasePath('/ui');

// This must match the queue name and prefix used by n8n
const jobsQueue = new Queue('jobs', {
  redis: {
    host: process.env.REDIS_HOST || 'redis',
    port: 6379,
  },
  prefix: 'bull' // <-- very important: this is what n8n uses
});

// Register queues with Bull Board
const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
  queues: [new BullAdapter(jobsQueue)],
  serverAdapter,
});

// Start the Express server
const app = express();
app.use('/ui', serverAdapter.getRouter());

app.listen(3002, () => {
  console.log('🚀 Bull Board is running at http://localhost:3002/ui');
});