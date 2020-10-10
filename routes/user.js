const express = require('express');
const router = express.Router();
const getNews = require('../controllers/getNews');
const getPost = require('../controllers/getPost')
const addComment = require('../controllers/addComment')

// list of all news
router.get('/', getPost)

// news details
router.get('/news/:id', getNews)

// add comment

router.post('/news/:id', addComment)

module.exports = router;