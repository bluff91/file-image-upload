const mongoose = require('mongoose')


const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please provide a name"],
        unique:true,
    },
    price:{
        type:Number,
        required:[true, "Please provide a price"],
        min:0,
    },
    image:{
        type:String,
        required:[true]
    }
})

module.exports = mongoose.model('Product', productSchema)