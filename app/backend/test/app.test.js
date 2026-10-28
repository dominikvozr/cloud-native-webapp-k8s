const { test, before, after } = require('node:test');
const assert = require('node:assert');

process.env.ADMIN_TOKEN = 'test-token';
const { app } = require('../src/app');

let server;
let base;

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once('listening', resolve));
  base = `http://127.0.0.1:${server.address().port}`;
});

after(() => server.close());

test('GET /healthz returns ok', async () => {
  const res = await fetch(`${base}/healthz`);
  assert.strictEqual(res.status, 200);
});

test('GET /api/info returns message and version', async () => {
  const body = await (await fetch(`${base}/api/info`)).json();
  assert.ok(body.message);
  assert.ok(body.version);
});

test('GET /metrics exposes request counter', async () => {
  await fetch(`${base}/api/info`);
  const text = await (await fetch(`${base}/metrics`)).text();
  assert.match(text, /http_requests_total\{method="GET",route="\/api\/info",status="200"\}/);
});

test('admin endpoint requires token', async () => {
  const denied = await fetch(`${base}/api/admin/error`);
  assert.strictEqual(denied.status, 401);

  const allowed = await fetch(`${base}/api/admin/error`, {
    headers: { authorization: 'Bearer test-token' },
  });
  assert.strictEqual(allowed.status, 500);
});
