require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const appConfig = require('./config/app');
const corsConfig = require('./config/cors');

const errorHandler = require('./app/middleware/errorHandler');
const router = require('./app/controller/index');

const app = express();

app.use(cors({
  origin: corsConfig.origin,
}));
app.use(bodyParser.json());
app.use(router);
app.use(errorHandler);

app.listen(appConfig.port, () => {
  console.log(`Started on port ${appConfig.port}`);
});
