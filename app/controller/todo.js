const express = require('express');
const moment = require('moment');

const Todo = require('../model/todo');
const todoReqValidation = require('../middleware/todoReqValidation');

const apiService = require('../service/api');
const { authenticate } = require('../service/auth');
const { validateObjectId } = require('../service/mongo');

const router = express.Router();

/**
 * Show a list of all resource.
 */
router.get('/', authenticate(), async (req, res, next) => {
  const { user } = req;

  try {
    // eslint-disable-next-line no-underscore-dangle
    const posts = await Todo.find({ user: user._id }, '_id title completed completedAt');

    apiService.sendJson(res, true, null, posts);
  } catch (err) {
    next(err);
  }
});

/**
 * Store a resource.
 */
router.post('/', authenticate(), todoReqValidation.store, async (req, res, next) => {
  const { body: data, user } = req;

  try {
    let todo = await Todo.create({
      title: data.title,
      // eslint-disable-next-line no-underscore-dangle
      user: user._id,
    });

    todo = {
      // eslint-disable-next-line no-underscore-dangle
      _id: todo._id,
      title: todo.title,
      completed: todo.completed,
      completedAt: todo.completedAt,
    };

    apiService.sendJson(res, true, 'New post added', todo);
  } catch (err) {
    next(err);
  }
});

/**
 * Toggle todo completed status.
 */
router.put('/:id/toggle', authenticate(), async (req, res, next) => {
  const { id } = req.params;

  validateObjectId(id, res);

  try {
    const todo = await Todo.findOne({ _id: id });
    let data = {};

    if (!todo) {
      return apiService.sendJsonWithCode(res, 404, false, 'Todo not found');
    }

    if (!todo.completed) {
      data = {
        completed: true,
        completedAt: moment().format('Y-MM-DD HH:mm:ss'),
      };
    } else {
      data = {
        completed: false,
        completedAt: null,
      };
    }

    await todo.update(data);

    return apiService.sendJson(res, true, 'Todo updated');
  } catch (err) {
    return next(err);
  }
});

/**
 * Delete a resource.
 */
router.delete('/:id', authenticate(), async (req, res, next) => {
  const { id } = req.params;

  validateObjectId(id, res);

  try {
    const todo = await Todo.findOneAndDelete({ _id: id });

    if (!todo) {
      return apiService.sendJsonWithCode(res, 404, false, 'Todo not found');
    }

    return apiService.sendJson(res, true, 'Todo removed');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
