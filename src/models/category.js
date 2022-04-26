const pool = require('../config/db')
const select = ()=>{
    return new Promise((resolve, reject)=>{
        pool.query("SELECT * FROM category", (err, result)=>{
            if(!err){
                resolve(result.rows)
            }else{
                reject(new Error(err))
            }
        })
    })
  
}
const insert = ({id, name})=>{
    return new Promise ((resolve, reject)=>{
        pool.query("INSERT INTO category(id, name)VALUES($1, $2)", [id, name], (err, result)=>{
            if(!err){
                resolve(result)
            }else{
               reject(new Error(err))
            }
        })
    })
    
}

const deleteCategory = (id) =>{
    return pool.query("DELETE FROM category WHERE id = $1", [id])
    
}

module.exports = {
    select,
    insert,
    deleteCategory
}