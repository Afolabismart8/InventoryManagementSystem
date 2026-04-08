const User = require ("../models/userModel");
const jwt = require ("jsonwebtoken")
const bcrypt = require ("bcrypt");
//create user
exports.createUser = async (req,res) =>{
   try { const {name, email, password, role, phoneNumber} = req.body;
   if(req.body === null) res.status(400).json({Message:"All field required"});

   //check existingEmail
    const existingEmail = await User.findOne({email});
    if(existingEmail) {
      res.status(401).json({Message: "User with this Email already exist"})
    }

    //check existingPhone
    const existingphone = await User.findOne({phoneNumber});
    if(existingphone) {
      res.status(401).json({Message: "User with this phoneNumber already exist"})
    };

    //Hash Password
    const passwordHash = await bcrypt.hash (password , 10);
    //createNew user
    const user = await User.create ({
      name,
      email,
      password:passwordHash,
      role,
      phoneNumber
    });
    res.status(200).json({Message:"User Created Successfullly", user});
   }
   catch (error) {
      res.status(500).json({Message:"Unable to Create User"});
   };
};

    //login
exports.login = async (req,res) => {
   try {
      const {email , password} = req.body;
   const user = await User.findOne ({email});
   //validation
   if (!user) {
      res.status(402).json({Messege: "Invalid Credentials"});
   }

   //compare Password
   const isMatch = await bcrypt.compare (password, user.password)
   if (!isMatch) {
      res.status(404).json({Message: "Invalid Credentials"});
   } 

   //JWT Token Auth
   const token = jwt.sign ({
      id:user._id,
      role:user.role
   },
   process.env.JWT_SECRET,
   {expiresIn: "1hr"}
   );
   }
   catch (error) {
      res.status(500).json({Message: "Unable to Login"});
  }
};