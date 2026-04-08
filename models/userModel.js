const mongoose = require ("mongoose");

const userschema = new mongoose.Schema ({
    name:{type:String,required: true },
    email:{type:String,required:true,
        match:[ /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
            'Please use a valid email address']
     },

    password: {type:String,required:true,},
    role:{type:String, enum:["admin", "salesperson","storeKeeper"], default: "salesperson"},
    phoneNumber:{type:String, required: true}

}, {timeseries: true});

//EXPORT MODEL
module.exports =  mongoose.model ("user", userschema);