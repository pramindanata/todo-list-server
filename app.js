require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const errorHandler = require('./app/middleware/errorHandler');
const router = require('./app/controller/index');

const { PORT } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Started on port ${PORT}`);
});
