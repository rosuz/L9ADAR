const express = require('express');
// const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/user.routes');
const prisma = require('./prisma.js');

// One database connection pool for the whole process.
// const prisma = new PrismaClient();

function createApp() {
  const app = express();

  // We sit behind the gateway. Trust its X-Forwarded-* headers so that
  // req.ip and req.protocol describe the real visitor, not the gateway.
  app.set('trust proxy', 1);

  // Reject request bodies bigger than 100 kilobytes.
  app.use(express.json({ limit: '100kb' }));

  // Liveness: the process is running. Does not touch the database.
  app.get('/api/health/live', (_req, res) => {
    res.json({ status: 'ok' });
  });

  // Readiness: the process can do its job. Checks the database.
  app.get('/api/health/ready', async (_req, res) => {
    try {
      await prisma.$queryRaw`SELECT 1`;
      res.json({ status: 'ready' });
    } catch (error) {
      console.error(JSON.stringify({ level: 'error', msg: 'database check failed' }));
      res.status(503).json({ status: 'not_ready' });
    }
  });

  // Feature Routes
  app.use('/api/users', userRoutes);

  // Anything under /api that no route handled.
  app.use((_req, res) => {
    res.status(404).json({ error: { code: 'NOT_FOUND', message: 'Not found' } });
  });

  return app;
}

module.exports = { createApp };


