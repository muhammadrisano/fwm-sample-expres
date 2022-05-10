const express = require('express')
const router = express.Router()
const categoryRoute = require('./category')
const productRoute = require('./products')
const usersRoute = require('./users')

router
  .use('/category', categoryRoute)
  .use('/products', productRoute)
  .use('/users', usersRoute)

module.exports = router
