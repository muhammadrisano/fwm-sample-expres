const express = require('express')

const app = express()


// let products =[
//     {
//         id: 1,
//         name: 'baju',
//         price: 0,
//         stock: 0
//     }
// ]

let user = []

app.use(express.json())

app.get('/helo', (req, res, next)=>{
    res.send('hello word')
})

app.get('/products', (req, res, next)=>{
    res.json({
        data: products
    })
})

app.post('/products', (req, res, next)=>{
    // console.log(req.body);
    // const id = req.body.id
    // const stock = req.body.stock
    // const price = req.body.price
    // const name = req.body.name
    const {id,stock, name, price} = req.body

    products.push({
        id,
        name,
        stock,
        price
    })
    res.json({
        message: 'data berhasil ditambahkan'
    })
})

app.put('/products/:id', (req, res, next)=>{
    const {name, price, stock} = req.body
    const id = req.params.id

    products = products.map((item)=>{
        if(item.id ===id){
            const result = {
                id,
                name,
                price,
                stock
            }
            return result
        }else{
            return item
        }
    })
    res.json({
        message: 'data berhasil di update'
    })
})

app.delete('/products/:idproduct', (req, res, next)=>{
    const id = req.params.idproduct
    products = products.filter((item)=>item.id != id)
    
    res.json({
        message: 'adata berhasil di hapus dengan id = '+ id
    })
})

app.listen(4000, ()=>{
    console.log('Server starting on port 4000');
})