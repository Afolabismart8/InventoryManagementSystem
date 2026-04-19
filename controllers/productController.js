const Product = require ("../models/productModel");
const cloudinary = require ("../middlewares/cloudinaryMiddlewares");
const User = require("../models/userModel");
const sendEmail = require("../middlewares/emailSender");


exports.createProductwithEmail = async (req, res) => {
  try {const { name, price } = req.body;

    const product = new Product({ name, price });
    await product.save();

    // Get all admins
    const admins = await User.find({ role: "admin" });
    const adminEmails = admins.map(a => a.email);

    // Send email
    const subject = "New Product Created";
    const message = `
      <h3>New Product Alert 🚀</h3>
      <p>A new product has been created:</p>
      <ul>
        <li><strong>Name:</strong> ${product.name}</li>
        <li><strong>Price:</strong> ${product.price}</li>
      </ul>
    `;

    if (adminEmails.length > 0) {
      await sendEmail(adminEmails, subject, message);
    }

    return res.status(201).json({
      message: "Product created and admins notified",
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};

//UpateProductImage
exports.updateProductImage = async () => {
    try { const productId = req.params.id;
        const product = await Product.findById({productId});
        if (!product) {
            return res.status(400).json({status:"Error", Message:"Product Not Found"});
        }
        if (product.image){
            const publicId = product.image.split("/").pop().split(".")[0];
            await cloudinary.uploader.destory(`products/${publicId}`);
        }
        //save new image
        product.image =req.file.path;
        await product.save();
        res.status(200).json({status:"Success", Message:"ProductImage Upated Successfully"})

    }
    catch (error){
         return res.status(500).json({status:"Error", Message:"Internal Server Error"})
    }
}

//create Product
//exports.createProduct = async (req,res) =>{
   // const product = await Product.create(req.body);
   // res.status(201).json( product)};


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
