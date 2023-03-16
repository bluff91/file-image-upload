require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const productRouter = require('./routes/productRouter')
const ErrorHandlerMiddlware = require('./middleware/error-handler')
const NotFoundMiddlware = require('./middleware/not-found')
const fileUpload = require('express-fileupload') 
const cloudinary = require('cloudinary').v2

app.use(express.static('./public'))
app.use(express.json())

app.use(fileUpload({useTempFiles:true}))
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
})

app.use("/api/v1/products" ,productRouter)


app.use(NotFoundMiddlware)
app.use(ErrorHandlerMiddlware)


const port = process.env.PORT || 5000
const start = async () => {
    try {
        await mongoose.connect(process.env.MANGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()

