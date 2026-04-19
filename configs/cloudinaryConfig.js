const cloudinary = require ("cloudinary").v2;


cloudinary.config ({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    cloud_Api_Key:process.env.CLOUDINARY_API_KEYS,
    cloud_Api_secret:process.env.CLOUDINARY_API_SECRET
})