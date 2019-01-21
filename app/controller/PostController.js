const express = require('express');

const Post = require('../model/post');
const postReqValidation = require('../middleware/postReqValidation');

const apiService = require('../service/api');
const { authenticate } = require('../service/auth');
const { validateObjectId } = require('../service/mongo');

const router = express.Router();

/**
 * Show a list of all resource.
 */
router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find({}, '_id title content')
      .populate('author', 'name email');

    apiService.sendJson(res, true, null, posts);
  } catch (err) {
    next(err);
  }
});

/**
 * Store a resource.
 */
router.post('/', authenticate(), postReqValidation.store, async (req, res, next) => {
  const { body: data, user } = req;

  try {
    await Post.create({
      title: data.title,
      content: data.content,
      // eslint-disable-next-line no-underscore-dangle
      author: user._id,
    });

    apiService.sendJson(res, true, 'New post added');
  } catch (err) {
    next(err);
  }
});

/**
 * Show a single resource.
 */
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  validateObjectId(id, res);

  try {
    const post = await Post.findOne({ _id: id }, '_id title content')
      .populate('author', 'name email');

    if (!post) {
      return apiService.sendJsonWithCode(res, 404, false, 'Post not found');
    }

    return apiService.sendJson(res, true, null, post);
  } catch (err) {
    return next(err);
  }
});

/**
 * Update a resource.
 */
router.put('/:id', authenticate(), postReqValidation.update, async (req, res, next) => {
  const { id } = req.params;
  const data = req.body;

  validateObjectId(id, res);

  try {
    const post = await Post.findOneAndUpdate({ _id: id }, {
      $set: {
        title: data.title,
        content: data.content,
      },
    });

    if (!post) {
      return apiService.sendJsonWithCode(res, 404, false, 'Post not found');
    }

    return apiService.sendJson(res, true, 'Post updated');
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
    const post = await Post.findOneAndDelete({ _id: id });

    if (!post) {
      return apiService.sendJsonWithCode(res, 404, false, 'Post not found');
    }

    return apiService.sendJson(res, true, 'Post removed');
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
