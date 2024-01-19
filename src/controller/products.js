const { response } = require("../helper/common");
const productModel = require("../models/products");
let products = [
  {
    id: 1,
    name: "baju",
    price: 0,
    stock: 0,
  },
];
// login

const insert = async(req, res) => {
  try {
    
 console.log(req.get('host'));
  // console.log(req.file);
  const { name, price, description, stock, id_category } = req.body;

  const data = { 
    name, 
    price, 
    description, 
    stock, 
    id_category,
    photo: `http://${req.get('host')}/img/${req.file.filename}`
  };
  await productModel.create(data)
  response(res, data, 201, 'berhasil di tambahkan')
} catch (error) {
  console.log(error);  
}
};

const detailProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await productModel.getProductById(id);
    res.json({
      data: result.rows[0],
    });
  } catch (error) {
    console.log(error);
  }

  //   http::/localhost:4000/product/2
};

const update = (req, res) => {
  const { name, price, stock } = req.body;
  const id = req.params.id;

  products = products.map((item) => {
    if (item.id === id) {
      const result = {
        id,
        name,
        price,
        stock,
      };
      return result;
    } else {
      return item;
    }
  });
  res.json({
    message: "data berhasil di update",
  });
};
const deleteProduct = (req, res) => {
  const id = req.params.idproduct;
  products = products.filter((item) => item.id !== id);

  res.json({
    message: "adata berhasil di hapus dengan id = " + id,
  });
};
const getProduct = async (req, res) => {
 const page = parseInt(req.query.page) || 1
 const limit = parseInt(req.query.limit) || 3
 const sort = req.query.sort || 'name'
 const sortBy = req.query.sortBy || 'ASC'
 const offset = (page - 1) * limit
 const {rows} = await productModel.getProduct({limit, offset, sort, sortBy})
const {rows:[count]} = await productModel.countProducts()
const totalData = parseInt(count.total)
const totalPage = Math.ceil(totalData/limit)
const pagination = {
  currentPage: page,
  limit,
  totalData,
  totalPage
}
response(res, rows, 200, 'Get Data Success', pagination)
};

module.exports = {
  getProduct,
  delete: deleteProduct,
  update,
  insert,
  detailProduct,
};
