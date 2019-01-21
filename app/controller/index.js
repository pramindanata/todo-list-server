const express = require('express');

const authController = require('./authController');
const postController = require('./postController');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});
router.use('/', authController);
router.use('/posts', postController);

module.exports = router;
