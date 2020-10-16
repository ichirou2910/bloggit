const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const checkAuth = require('../middleware/check-auth');

router.get('/blog/:blog_id', commentController.getByBlog);

router.use(checkAuth);
router.post('/', commentController.create);

module.exports = router;
