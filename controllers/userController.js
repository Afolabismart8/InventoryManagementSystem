const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const emailSender = require ("../middlewares/emailSender");

// Helper function to generate token
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

//REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phoneNumber } = req.body;

    // Validation
    if (!name || !email || !password || !phoneNumber) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    // Check existing phone
    const existingPhone = await User.findOne({ phoneNumber });
    if (existingPhone) {
      return res.status(400).json({
        message: "User with this phone number already exists",
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: passwordHash,
      role,
      phoneNumber,
    });

    return res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Unable to create user",
      error: error.message,
    });
  }
};

// LOGIN 
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Check user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user);

    // Send response (THIS WAS YOUR BIGGEST MISTAKE)
    return res.status(200).json({
      message: "Login successful",
      token,
      user,
    });
     const subject = "New Login Alert";
            const message = ` <h3>Hey ${user.name} 🚀</h3>
              <p>We just noticed a login into your accout:</p>
              <ul>
                <li><strong>Location:</strong> Lawanson Lagos</li>
                <li><strong>Device:</strong> Chrome 8.5</li>
              </ul>
            <p>Thank you for banking with us</p>
            `;
   await sendEmail(user.email, subject, message);
  } catch (error) {
    return res.status(500).json({
      message: "Unable to login",
      error: error.message,
    });
  }
};