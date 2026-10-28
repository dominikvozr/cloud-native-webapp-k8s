const { version } = require('../package.json');

module.exports = {
  port: Number(process.env.PORT) || 3000,
  version: process.env.APP_VERSION || version,
  message: process.env.APP_MESSAGE || 'Hello from backend',
  adminToken: process.env.ADMIN_TOKEN || '',
};
