require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const productRouter = require('./routes/productRouter')

const port = process.env.PORT || 5000

app.use(express.json())
app.use("api/v1/products" ,productRouter)

app.get("/", (req, res) => {
    res.status(200).json("OK")
})

const start = async () => {
    try {
        await mongoose.connect(process.env.MANGO_URI)
        app.listen(port, console.log(`Server is listening on port ${port}...`))
    } catch (error) {
        console.log(error);
    }
}

start()

