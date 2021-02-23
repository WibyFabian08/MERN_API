exports.getProduct = (req, res, next) => {
    res.json([
        {
            id: 1,
            product: 'Gula Aren',
            price: 20000
        },
        {
            id: 2,
            product: 'Gula Putih',
            price: 10000
        }
    ])
}