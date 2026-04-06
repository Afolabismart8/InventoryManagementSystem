const mongoose = require ("mongoose")

const productSchema = new mongoose.Schema({
        name :{type:String,
              required:true },
        price:{type:Number,
              required:true },
        quantity:{type:Number,
             default:0 }
}, {timestamps:true });

//create Model
const Product = new mongoose.model("product", productSchema);

//Export Module
module.exports = Product ;