const express = require('express');

const app = express();

app.use(() => {
    console.log('Halooo');
    console.log('tessss')
})

app.listen(4000);