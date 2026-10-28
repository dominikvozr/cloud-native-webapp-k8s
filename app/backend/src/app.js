const os = require('node:os');
const express = require('express');
const config = require('./config');
const metrics = require('./metrics');
const state = { ready: true };
const app = express();

app.disable('x-powered-by');
app.use(metrics.middleware);

app.get('/healthz', (req, res) => res.json({ status: 'ok' }));

app.get('/readyz', (req, res) => {
  if (!state.ready) return res.status(503).json({ status: 'shutting down' });
  res.json({ status: 'ready' });
});

app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.register.contentType);
  res.send(await metrics.register.metrics());
});

app.get('/api/info', (req, res) => {
  res.json({
    message: config.message,
    version: config.version,
    hostname: os.hostname(),
  });
});

function requireAdmin(req, res, next) {
  if (!config.adminToken || req.get('authorization') !== `Bearer ${config.adminToken}`) {
    return res.status(401).json({ error: 'unauthorized' });
  }
  next();
}

// Returns 500 on purpose, used to verify the error rate alert.
app.get('/api/admin/error', requireAdmin, (req, res) => {
  res.status(500).json({ error: 'simulated failure' });
});

app.use((req, res) => res.status(404).json({ error: 'not found' }));

module.exports = { app, state };
