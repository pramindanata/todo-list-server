const mongoose = require('mongoose');
const dbConfig = require('../config/db');

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.uri, {
  useNewUrlParser: true,
});

module.exports = mongoose;
