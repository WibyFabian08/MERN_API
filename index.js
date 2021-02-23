const express = require('express');
const app = express();

const routesMahasiswa = require('./src/routes/mahasiswa');
const routesProduct = require('./src/routes/product');

app.use('/', routesMahasiswa);
app.use('/barang', routesProduct);

app.listen(4000);