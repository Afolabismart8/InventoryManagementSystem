const mongoose = require ("mongoose");
const userschema = new mongoose.Schema ({
    name:{type:String,
        required: true },
    email:{type:String,
        required:true }
});
//EXPORT MODEL
module.exports = new mongoose.model ("user", userschema);