const User = require('../models/userSchema');
const jwt = require("jsonwebtoken");

//user authentication
exports.isAuthenticated = async(req, res, next)=>{
    try {
        
        const { token } = req.cookies;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Please log in first !!!"
            })
        }

        const decoded = await jwt.verify(token, process.env.SECRET_KEY);

        req.user = await User.findById(decoded._id);

        next();

    } catch (error) {
        res.status(501).json({
            success: false,
            message: error.message
        })        
    }
}

//user role (authorization)
exports.authorizeRole = (...roles)=>{
    return (req, res, next)=>{
        if(!roles.includes(req.user.role)){
            return res.status(401).json({
                success: false,
                message: `${req.user.role} is not allowed to the access the resources !!!`
            })
        }

        next();
    }
}