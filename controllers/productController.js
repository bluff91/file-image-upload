const Product = require('../models/Product')
const {StatusCodes} = require('http-status-codes')

const getAllProducts = async (req, res) => {
    const product = await Product.find({}).select("-__v")
    res.status(StatusCodes.OK).json({products:product, nrHits:product.length})
}

const createProduct = async (req, res) => {
    const product = await Product.create(req.body)
    res.status(StatusCodes.CREATED).json(product)
}

module.exports = {
    getAllProducts,
    createProduct
}