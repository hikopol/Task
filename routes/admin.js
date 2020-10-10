const express = require('express')
const router = express.Router()
const getNews = require('../controllers/getNews')
const getPosts = require('../controllers/getPost')
const getEditors = require('../controllers/getEditors')
const auth = require('../controllers/authorisation')

// list of all news
router.get('/', getNews)

// list of all posts 
router.get('/posts', getPosts)

// view and modify specific post
router.get('/posts/:id', getPosts)

// allow rights for editors
router.get('/editors', getEditors)

// autorisation for admins
router.post('/login', auth)


module.exports = router;