module.exports = {
  debug: process.env.APP_DEBUG || true,
  env: process.env.APP_ENV || 'dev',
  name: process.env.APP_NAME || 'My Express',
  port: process.env.APP_PORT || 3000,
  url: process.env.APP_URL || 'localhost:3000',
};
