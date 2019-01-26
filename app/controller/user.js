const express = require('express');

const apiService = require('../service/api');
const { authenticate } = require('../service/auth');

const router = express.Router();

/**
 * Show a list of all resource.
 */
router.get('/', authenticate(), (req, res) => {
  let { user } = req;

  user = {
    name: user.name,
    email: user.email,
  };

  apiService.sendJson(res, true, null, user);
});

module.exports = router;
