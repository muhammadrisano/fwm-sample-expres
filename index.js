require('dotenv').config()
const productController =  require('./src/controller/products')
const commonMid = require('./src/middlewares/common')
const categoryController = require('./src/controller/category')
const categoryRouter = require('./src/routes/category')
const productsRouter = require('./src/routes/products')
const getProduct = require('./src/controller/products')

const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000
// middleware
app.use( express.json())

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
app.use('/products', productsRouter )
app.use('/category', categoryRouter)

app.all('*', (req, res, next)=>{
    res.status(404).json({
        message: 'url not found'
    })
})
app.listen(PORT, ()=>{
    console.log(`Server starting on port ${PORT}`);
})