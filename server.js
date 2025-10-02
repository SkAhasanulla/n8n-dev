const express = require('express');
const { createBullBoard } = require('bull-board');
const { BullMQAdapter } = require('bull-board/bullMQAdapter');
const { Queue } = require('bullmq');
const Redis = require('ioredis');

const REDIS_HOST = process.env.REDIS_HOST || 'redis';
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const connection = new Redis({
  host: REDIS_HOST,
  port: REDIS_PORT
});

// Change queue names if your n8n uses different keys (default n8n queue names should work)
const defaultQueueName = 'main'; // adjust as needed

const queue = new Queue(defaultQueueName, { connection });

const app = express();

const { router } = createBullBoard([new BullMQAdapter(queue)]);
app.use('/bull-board', router);

app.get('/', (req, res) => {
  res.send('<h2>Bull Board</h2><p>Visit <a href="/bull-board">/bull-board</a></p>');
});

const port = process.env.PORT || 3002;
app.listen(port, () => console.log(`Bull Board running on http://0.0.0.0:${port}/bull-board`));
