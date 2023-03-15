require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const productRouter = require('./routes/productRouter')
const ErrorHandlerMiddlware = require('./middleware/error-handler')
const NotFoundMiddlware = require('./middleware/not-found')
const fileUpload = require('express-fileupload')


app.use(express.static('./public'))
app.use(express.json())
app.use(fileUpload())

app.use("/api/v1/products" ,productRouter)

app.use(ErrorHandlerMiddlware)
app.use(NotFoundMiddlware)





//app.use(ERRORS)

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

