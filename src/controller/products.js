let products = [
  {
    id: 1,
    name: "baju",
    price: 0,
    stock: 0,
  },
];

const insert = (req, res, next) => {
  const { id, stock, name, price } = req.body;

  products.push({
    id,
    name,
    stock,
    price,
  });
  res.json({
    message: "data berhasil ditambahkan",
  });
};

const update = (req, res, next) => {
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
const deleteProduct = (req, res, next) => {
  const id = req.params.idproduct;
  products = products.filter((item) => item.id != id);

  res.json({
    message: "adata berhasil di hapus dengan id = " + id,
  });
};
const getProduct = (req, res, next) => {
  res.json({
    data: products,
  });
};

module.exports = {
    getProduct,
    delete : deleteProduct,
    update,
    insert
}
