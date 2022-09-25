const User = require('../models/userSchema');
const cloudinary = require('cloudinary');

//register user
exports.registerUser = async(req, res)=>{
    try {
        
        const {name, email, phone, password, avatar} = req.body;

        const exists = await User.findOne({email});
        if(exists){
            return res.status(401).json({
                success: false,
                message: "Email already exists !!!"
            })
        }

        const myCloud = await cloudinary.v2.uploader.upload(avatar, {
            folder: "crud_users"
        });

        const user = await User.create({
            name, email, phone, password, avatar:{public_id: myCloud.public_id, url: myCloud.secure_url}
        });

        res.status(200).json({
            success: true,
            user,
            message: "User Registered Successfully !!"
        })


    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}


//login user
exports.loginUser = async(req, res)=>{
    try {
        
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found !!"
            })
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({
                success: false,
                message: "Invalid login credentials !!!"
            })
        }

        const token = await user.genarateToken();

        const options = {
            expires: new Date(Date.now() + 30*24*60*60*1000),
            httpOnly: true
        }

        res.status(200).cookie("token", token, options).json({
            success: true,
            message: "User Logged in successfully !!",
            token,
            user
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })        
    }
}


//get user details
exports.myProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            user
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}


//log out user
exports.logoutUser = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id);

        let options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }

        res.status(200).cookie("token", null, options).json({
            success: true,
            message: "User logged out successfully !!"
        })
        
    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })        
    }
}


//update profile
exports.updateProfile = async (req, res) => {
    try {

        const {name, email, phone, avatar} = req.body;

        const user = await User.findById(req.user._id);

        if(avatar){
            await cloudinary.v2.uploader.destroy(user.avatar.public_id);

            const myCloud = await cloudinary.v2.uploader.upload(avatar, {
                folder: "crud_users"
            })

            user.avatar.public_id = myCloud.public_id;
            user.avatar.url = myCloud.secure_url;
        }

        if(name){
            user.name = name;
        }
        if(email){
            user.email = email;
        }
        if(phone){
            user.phone = phone;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully !!",
            user
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

//contact route
exports.contactUs = async(req, res)=>{
    try {

        const {message} = req.body;
        if(!message){
            return res.status(400).json({
                success: false,
                message: "Message can't be empty !!"
            })
        }
        
        const user = await User.findById(req.user._id);

        user.messages.push(message);

        await user.save();

        res.status(200).json({
            success: true,
            message: "Message sent successfully !!"
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })        
    }
}


//delete profile
exports.deleteProfile = async(req, res)=>{
    try {

        const user = await User.findById(req.user._id);

        //remove user avatar form cloudinary
        await cloudinary.v2.uploader.destroy(user.avatar.public_id);
        
        await user.remove();

        const options = {
            expires: new Date(Date.now()),
            httpOnly: true
        }

        res.status(200).cookie("token", null, options).json({
            success: true,
            message: "User Deleted Successfully !!"
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })
    }
}

//get all users (** due search effect)
exports.getAllUsers = async(req, res)=>{
    try {
        
        const users = await User.find({
            name: { $regex: req.query.name, $options: "i" }
        });

        res.status(200).json({
            success: true,
            users
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })        
    }
}

//get a users admin
exports.deleteUser = async(req, res)=>{
    try {
        
        const user = await User.findById(req.params.id);
        if(!user){
            res.status(400).json({
                success: false,
                message: "User not found !!"
            })
        }

        await user.remove();

        res.status(200).json({
            success: true,
            message: "User deleted successfully !!"
        })

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })        
    }
}