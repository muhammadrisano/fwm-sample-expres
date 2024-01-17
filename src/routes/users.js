const express = require('express')
const router = express.Router()
const { register, login, profile, refreshToken } = require('../controller/users.js')
const { protect } = require('../middlewares/auth.js')

router
  .post('/register', register)
  .post('/login', login)
  .get('/profile', protect ,profile)
  .post('/refresh-token', refreshToken)

module.exports = router
