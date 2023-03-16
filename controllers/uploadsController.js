const {StatusCodes} = require('http-status-codes')
const path = require('path')
const CustomError = require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')



const uploadProductImageLocal = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('Error, no image selected')
    }
    if (!req.files.image.mimetype.includes('image') ) {
        throw new CustomError.BadRequestError('Error, invalid file type. Select an image')
    }
    if (req.files.image.size > 1024 * 1024) {
        throw new CustomError.BadRequestError('Error, file size is too large')
    }
    const productImage = req.files.image
    const imagePath = path.join(__dirname, "../public/uploads/"+`${productImage.name}`)
    await productImage.mv(imagePath)
    return res.status(StatusCodes.OK).json({image:{src: `/public/uploads/${productImage.name}`}})
}

const uploadProductImageCloudinary = async (req, res) => {
    if (!req.files) {
        throw new CustomError.BadRequestError('Upload an image')
    }
    if (!req.files.image.mimetype.includes('image')) {
        throw new CustomError.BadRequestError('Wrong fromat, please upload an image')
    }
    if (req.files.image.size > 1024 * 1024) {
        throw new CustomError.BadRequestError('Image size is too large')
    }
 
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath, {
        use_filename:true,
        folder: 'file-upload-images'
    })
    fs.unlinkSync(req.files.image.tempFilePath)
    res.status(StatusCodes.CREATED).json({src:result.secure_url})
}

module.exports = {uploadProductImageLocal, uploadProductImageCloudinary}