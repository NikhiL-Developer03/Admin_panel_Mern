const User = require("../models/user")
const bcrypt = require("bcrypt");
const jwt  =  require("jsonwebtoken")


exports.signIn = async (req, res) => {
    try {
        const {
            name,
            mobileNo,
            designation,
            email,
            gender,
            course,
            imageUrl,
            password,
            role
        } = req.body;

        // Validate required fields
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required"
            });
        }
        if (!mobileNo) {
            return res.status(400).json({
                success: false,
                message: "Mobile number is required"
            });
        }
        if (!designation) {
            return res.status(400).json({
                success: false,
                message: "Designation is required"
            });
        }
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        if (!gender) {
            return res.status(400).json({
                success: false,
                message: "Gender is required"
            });
        }
        if (!course) {
            return res.status(400).json({
                success: false,
                message: "Course is required"
            });
        }
        if (!imageUrl) {
            return res.status(400).json({
                success: false,
                message: "Image URL is required"
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }
        if (!role) {
            return res.status(400).json({
                success: false,
                message: "Role is required"
            });
        }

        // Check if user already exists
        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        // Hash the password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password, 10);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: "Error in password hashing"
            });
        }

        // Create the user
        const user = await User.create({
            name,
            mobileNo,
            designation,
            email,
            gender,
            course,
            imageUrl,
            password: hashedPassword,
            role
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        });

    } catch (error) {
        console.error("Error in sign-in:", error);
        return res.status(500).json({
            success: false,
            message: "User not created, please try again"
        });
    }
};

exports.logIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate required fields
        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required"
            });
        }
        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required"
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Password verification
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        // Prepare user data for token payload
        const userData = {
            role: user.role,
            email: user.email,
            id: user._id
        };

        // Generate JWT token

        const token = jwt.sign(userData, process.env.JWT_SCERET, { expiresIn: "1h" });

        // Successful login response
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            body: {
                token,
                user: {
                    name: user.name,
                    email: user.email,
                    role: user.role,
                    id: user._id
                }
            }
        });

    } catch (error) {
        console.error("Error in login:", error);
        return res.status(500).json({
            success: false,
            message: "Login failed, please try again"
        });
    }
};