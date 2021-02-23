const express = require('express');
const router = express.Router();

const mahasiswaController = require('../controllers/mahasiswa');

// read
router.get('/mahasiswa', mahasiswaController.getMahasiswa)

// create

// update

// delete

module.exports = router;
