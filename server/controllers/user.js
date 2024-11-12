const User =  require("../models/user") // Make sure the path to the User model is correct
const bcrypt = require("bcrypt");
// Get User List with Pagination and Search
exports.getUserList = async (req, res) => {
    try {
        // Parse query parameters and ensure they're numbers
        const { page = 1, limit = 10, id, name } = req.query;
        const currentPage = Math.max(1, Number(page)); // Ensure currentPage is at least 1
        const pageSize = Math.max(1, Number(limit));  // Ensure pageSize is at least 1

        // Create a query object based on search criteria
        const query = { role: "User" }; // Only include users with the "User" role

        // Add filters to the query
        if (id) {
            query._id = id;
        }
        if (name) {
            query.name = { $regex: name, $options: "i" }; // Case-insensitive search by name
        }

        // Fetch users with pagination and search
        const users = await User.find(query)
            .skip((currentPage - 1) * pageSize) // Skip documents for pagination
            .limit(pageSize)                  // Limit the number of documents
            .exec();

        // Get the total count for pagination metadata
        const totalUsers = await User.countDocuments(query);

        // Calculate total pages
        const totalPages = Math.ceil(totalUsers / pageSize);

        // Send response with users and pagination metadata
        res.status(200).json({
            success: true,
            data: users,
            pagination: {
                totalUsers,
                currentPage,
                totalPages,
            },
        });
    } catch (error) {
        console.error("Error fetching user list:", error);
        res.status(500).json({
            success: false,
            message: "Server Error",
        });
    }
};


// controllers/userController.js



// Controller to fetch user details by ID
exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await User.findById(id);

    // Check if user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }

    // Return user data
    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error('Error fetching user details:', error);
    res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};


// Edit User
exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, mobileNo, designation, gender, course, imageUrl, role } = req.body;

        // Validate that the user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Update user fields only if provided in the request
        if (name) user.name = name;
        if (mobileNo) user.mobileNo = mobileNo;
        if (designation) user.designation = designation;
        if (gender) user.gender = gender;
        if (course) user.course = course;
        if (imageUrl) user.imageUrl = imageUrl;
        if (role) user.role = role;

        // Save updated user
        const updatedUser = await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (error) {
        console.error("Error in editUser:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update user, please try again"
        });
    }
};


// Delete User
exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if user exists
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Delete the user
        await User.findByIdAndDelete(id);


        return res.status(200).json({
            success: true,
            message: "User deleted successfully"
        });

    } catch (error) {
        console.error("Error in deleteUser:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete user, please try again"
        });
    }
};


// Ensure the correct path to your User model

exports.bulkCreateUsers = async (req, res) => {
    try {
        const users = req.body.users; // Expect an array of users in the request body

        // Validate input
        if (!Array.isArray(users) || users.length === 0) {
            return res.status(400).json({
                success: false,
                message: "An array of users is required"
            });
        }

        // Process each user
        const userPromises = users.map(async (user) => {
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
            } = user;

            // Check for required fields
            if (!name || !email || !password || !role || !designation || !gender || !course || !imageUrl) {
                throw new Error("All required fields must be provided for each user");
            }

            // Check if user already exists by email
            const isExist = await User.findOne({ email });
            if (isExist) {
                throw new Error(`User with email ${email} already exists`);
            }

            // Hash the password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Return the user data to be created
            return {
                name,
                mobileNo,
                designation,
                email,
                gender,
                course,
                imageUrl,
                password: hashedPassword,
                role
            };
        });

        // Resolve all promises and create users in bulk
        const usersToCreate = await Promise.all(userPromises);
        const createdUsers = await User.insertMany(usersToCreate);

        return res.status(201).json({
            success: true,
            message: "Users created successfully",
            users: createdUsers
        });

    } catch (error) {
        console.error("Error in bulkCreateUsers:", error);
        return res.status(500).json({
            success: false,
            message: error.message || "Failed to create users, please try again"
        });
    }
};


