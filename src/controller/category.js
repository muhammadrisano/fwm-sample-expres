const { json } = require('express/lib/response')
// const pool = require('../config/db')
const categoryModel = require('../models/category')

exports.getCategory = async(req, res, next)=>{
    try {
        const result = await categoryModel.select()
        res.status(200).json({
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'internal server error'
        })
    }
}

exports.insertCategory = (req, res, next)=>{
    const {id, name} = req.body

    const data = {
        id,
        name
    }
    categoryModel.insert(data)
    .then((result)=>{
        res.status(201).json({
            data
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({
            message: 'internal server erorr'
        })
    })
}
// exports.updateCategory = (req, res, next)=>{
//     const id = req.params.id
//     const name = req.body.name

//     pool.query("UPDATE category SET name = $1 WHERE id= $2", [name, id], (err, result)=>{
//         if(!err){
//             res.json({
//                 message: result
//             })
//         }else{
//             res.status(500).json({
//                 message: 'internal server error'
//             })
//         }
//     })
// }

exports.deleteCategory = (req, res, next)=>{
    const id = req.params.id
    categoryModel.deleteCategory(id)
    .then((result)=>{
        res.json({
            message: 'data berhasil di hapus'
        })
    })
    .catch((error)=>{
        console.log(error);
        res.status(500).json({
            message: 'internal server error'
        })
    })
    
    // pool.query("DELETE FROM category WHERE id = $1", [id], (err, result)=>{
    //     if(!err){
    //         res.json({
    //             message: result
    //         })
    //     }else{
    //         res.json({
    //             message: 'internal server error'
    //         })
    //     }
    // })
}