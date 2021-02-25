exports.getProduct = (req, res, next) => {
  res.json([
    {
      id: 1,
      product: "Gula Aren",
      price: 20000,
    },
    {
      id: 2,
      product: "Gula Putih",
      price: 10000,
    },
  ]);
};

exports.createProduct = (req, res, next) => {
  const product = req.body.product;
  const price = req.body.price;
  res.json({
    message: "Create Data Success",
    data: [
      {
        id: 1,
        product: product,
        price: price,
      },
    ],
  });
};
