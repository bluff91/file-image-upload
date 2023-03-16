const express = require('express')
const router = express.Router()


const { getAllProducts, createProduct } = require('../controllers/productController')
const { uploadProductImageLocal, uploadProductImageCloudinary } = require("../controllers/uploadsController")

router.get('/', getAllProducts)
router.post('/', createProduct)

router.post('/uploadslocal', uploadProductImageLocal)
router.post('/uploads', uploadProductImageCloudinary)
uploadProductImageCloudinary

module.exports = router