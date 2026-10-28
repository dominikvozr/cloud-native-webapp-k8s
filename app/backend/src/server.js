const config = require('./config');
const { app, state } = require('./app');

const server = app.listen(config.port, () => {
  console.log(JSON.stringify({ msg: 'listening', port: config.port, version: config.version }));
});

function shutdown(signal) {
  console.log(JSON.stringify({ msg: 'shutting down', signal }));
  state.ready = false;
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(1), 10_000).unref();
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
