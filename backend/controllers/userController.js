import {User} from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


// register function
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        // Check if all required fields are provided
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false,
            });
        }

        // Check if the file is uploaded
        const file = req.file;
        if (!file) {
            return res.status(400).json({
                message: "Profile photo is required",
                success: false,
            });
        }

        // Convert the uploaded file to data URI
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        // Check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "User already exists with this email",
                success: false,
            });
        }

        // Hash the password
        const hashPassword = await bcrypt.hash(password, 10);

        // Create the new user
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashPassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url,
            },
        });

        return res.status(201).json({
            message: "Account created successfully.",
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
        });
    }
};

// login function
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        // Validate request data
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        // Find user by email
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        // Compare password
        const isMatchPassword = await bcrypt.compare(password, user.password);
        if (!isMatchPassword) {
            return res.status(400).json({
                message: "Invalid email or password",
                success: false
            });
        }

        if(role != user.role) {
            return res.status(400).json({
                message:"Account doesn't exist with current role"
            })
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id }, // payload should be the user's ID or other relevant info
            process.env.JWT_SECRET_KEY, // fixed typo
            { expiresIn: "1d" } // token expires in 1 day
        );

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        // Return response with cookie
        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite:'strict' }).json({
            message: `Welcome back ${user.fullname}`,
            user,
            success: true
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server Error",
            success: false
        });
    }
};

// Logout function
export const logout = async(req, res) => {
    try {
        return res.status(200).cookie("token", "", {maxAge:0}).json({
            message:"User logout successfully", 
            success:true
        })

    } catch (error) {
        console.log(error);
    }
};

// profile update
export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;
        
        const file = req.file;
        // cloudinary ayega idhar
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
        const userId = req.id; // middleware authentication
        let user = await User.findById(userId);

        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if(fullname) user.fullname = fullname
        if(email) user.email = email
        if(phoneNumber)  user.phoneNumber = phoneNumber
        if(bio) user.profile.bio = bio
        if(skills) user.profile.skills = skillsArray
      
        // resume comes later here...
        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url // save the cloudinary url
            user.profile.resumeOriginalName = file.originalname // Save the original file name
        }

        await user.save();

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        }

        return res.status(200).json({
            message:"Profile updated successfully.",
            user,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}