const express = require('express')
const router = express.Router()


const { getAllProducts, createProduct } = require('../controllers/productController')
const { uploadProductImage } = require("../controllers/uploadsController")

router.get('/', getAllProducts)
router.post('/', createProduct)

router.post('/uploads', uploadProductImage)

module.exports = router