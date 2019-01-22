const express = require('express');

const authController = require('./auth');
const todoController = require('./todo');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});
router.use('/', authController);
router.use('/todos', todoController);

module.exports = router;
