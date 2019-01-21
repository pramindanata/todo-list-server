const mongodb = require('mongodb');

const validateObjectId = (id, res) => {
  const result = mongodb.ObjectID.isValid(id);

  if (!result) {
    res.status(400)
      .json({
        status: 'FAILED',
        message: 'Invalid data given',
      });
  }
};

module.exports = {
  validateObjectId,
};
