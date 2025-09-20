import ApiError from "../utils/apiError.js"
import ApiResponse from "../utils/apiResponse.js"
import { User } from "../model/neonNexa.users.model.js"
import AsyncHandler from "../utils/asyncHandler.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


//register user
const registerUser = AsyncHandler(async (req, res) => {
    //value from frontend
    const { name, email, password } = req.body;
    console.log("Request Body:", req.body);

    // Basic validation
    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required.");
    }

    if (!email.includes("@")) {
        throw new ApiError(401, "Email must contain '@'.");
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new ApiError(409, "User with this email already exists.");
    }

    // Create new user
    const newUser = await User.create({ name, email, password });

    // Exclude sensitive fields
    const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user.");
    }

    // Success response
    return res.status(200).json(
        new ApiResponse(200, createdUser, "User registered successfully.")
    );
});

// login user
const loginUser = AsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        throw new ApiError(400, "Email and password are required.");
    }

    // Check if user exists
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        throw new ApiError(401, "User not found with this email.");
    }

    // Compare password
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
        throw new ApiError(401, "Invalid password.");
    }

    // Generate JWT token
    const token = jwt.sign(
        { id: user._id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "1h" }
    );

    // Respond
    return res.status(200).json(
        new ApiResponse(200, {
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
            user,
            token
        }, "User logged in successfully.")
    );
});



export { registerUser, loginUser }