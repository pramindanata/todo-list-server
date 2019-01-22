module.exports = {
  uri: process.env.DB_URI || 'mongodb://localhost:27017/express-app',
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
};
