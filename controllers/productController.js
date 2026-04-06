const Product = require ("../models/productModel");

//create Product
exports.createProduct = async (req,res) =>{
    const product = await Product.create(req.body);
    res.status(201).json( product)
};

//get product
exports.getProduct = async (req,res) => {
    const product = await Product.find();
    res.send(product)
};
//get One 
exports.getOneProduct = async (req,res) =>{
    const product = await Product.findById(req.params.id);
    if (!product){res.status(400).json("No product found")}
    res.status(201).json(product);
};

//update
exports.updateProduct = async (req,res) =>{
    const product = await Product.findOneAndUpdate (req.params.id, req.body, ({new: true}));
    res.send(product);
};

//delete
exports.deleteProduct = async (req,res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json({Message: "Product deleted"});
}
