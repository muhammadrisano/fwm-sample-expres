require('dotenv').config()
// const productController =  require('./src/controller/products')
// const commonMid = require('./src/middlewares/common')
// const categoryController = require('./src/controller/category')
// const getProduct = require('./src/controller/products')
const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const mainRoute = require('./src/routes')
const path = require('path')
const createError = require('http-errors')

// const categoryRouter = require('./src/routes/category')
// const productsRouter = require('./src/routes/products')

// const
// const commonMid = require('./src/middlewares/common')
// www.api.risano.com/v1/products
// www.api.risano.com/v1/category

// www.api.risano.com/v2/category
const app = express()
const PORT = process.env.PORT || 5000
// middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())
app.use(morgan('dev'))

// app.use(commonMid.myCors)
// app.use(cors())
// app.use('/coba',commonMid.myMiddle)
// // app.use(myMiddle)

// app.get('/helo',commonMid.myMiddle, (req, res, next)=>{
//     res.send('hello word')
// })

// products
// app.get('/products',getProduct)
// app.post('/products', commonMid.validate, productController.insert)
// app.put('/products/:id', productController.update)
// app.delete('/products/:idproduct',productController.delete)

// category

// app.get('/category', categoryController.getCategory)
// app.post('/category', categoryController.insertCategory)
// app.put('/category/:id', categoryController.updateCategory)
// app.delete('/category/:id', categoryController.deleteCategory)

// router
app.use('/v1', mainRoute)
// app.use('/category', categoryRouter)
// app.use('/products', productsRouter)
// console.log(path.join(__dirname, '/img'));

app.use('/img', express.static(path.join(__dirname, '/upload')))


app.all('*', (req, res, next)=>{

  next(new createError.NotFound())
})


app.use((err, req, res, next)=>{
  const messageError = err.message || 'Internal Server Error'
  const statuError = err.status || 500
  const formatError = {
    status: 'Success',
    statusCode:  statuError,
    data: {
      message: messageError
    }
  }
  res.status(statuError).json(formatError)
})

app.listen(PORT, () => {
  console.log(`Server starting on port ${PORT}`)
})

// eslint
// https://npm.io/package/eslint-config-standard
