const express = require('express')
const router = express.Router()
const { register, login, profile } = require('../controller/users.js')
const { protect } = require('../middlewares/auth.js')

router
  .post('/register', register)
  .post('/login', login)
  .get('/profile', protect ,profile)

module.exports = router
