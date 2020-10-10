const express = require('express')
const router = express.Router()
const checkStatus = require('../middlewares/checkEditorStatus')
const getPosts = require('../controllers/getPost')
const registerEditor = require('../controllers/registerEditor')
const auth = require('../controllers/authorisation')



// registration for editors
router.post('/register', registerEditor)

// autorisation for editors
router.post('/login', auth)

// after editor has been logged / check self status page
router.get('/', checkStatus)

// list of all posts for this editor
router.get('/posts', getPosts)

// view and modify specific post
router.get('/posts/:id', getPosts)


module.exports = router;