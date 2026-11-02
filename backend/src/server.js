const http = require('node:http');
const { createApp } = require('./app');
const { config } = require('./config');

const app = createApp();
const server = http.createServer(app);

server.listen(config.port, '0.0.0.0', () => {
  console.log(JSON.stringify({ level: 'info', msg: 'backend listening', port: config.port }));
});

// Docker sends SIGTERM when it stops a container. Finish current requests, then exit.
for (const signal of ['SIGTERM', 'SIGINT']) {
  process.on(signal, () => {
    server.close(() => process.exit(0));
  });
}
