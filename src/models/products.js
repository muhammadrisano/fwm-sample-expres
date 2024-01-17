const pool = require('../config/db')
const getProductById = (id) => {
  return pool.query('SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id WHERE products.id = $1', [id])
}

const create =({name, description, price, stock, id_category, photo})=>{
  return pool.query("INSERT INTO products(name, description, price, stock, id_category, photo)VALUES($1, $2, $3, $4, $5, $6)", [name, description, price, stock, id_category, photo])
}

const getProduct = ({limit, offset, sort, sortBy}) =>{
  return pool.query(`SELECT products.*, category.name AS name_category FROM products INNER JOIN category ON products.id_category = category.id ORDER BY ${sort || 'products.name'} ${sortBy} LIMIT $1 OFFSET $2`, [limit, offset])
}
const countProducts = ()=>{
  return pool.query('SELECT COUNT(*) AS total FROM products')
}
module.exports = {
  getProductById,
  create,
  getProduct,
  countProducts
}
