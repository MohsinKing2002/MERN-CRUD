const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Username must be provided !!"]
    },
    avatar: {
        public_id: String,
        url: String
    },
    email: {
        type: String,
        required: [true, "Email must be provided !!"],
        unique: [true, "Email must be unique !!"]
    },
    phone:{
        type: Number,
        required: [true, "Phone must be provided !!"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, "Password must be of atleast 6 characters !!"],
        select: false
    }, 
    messages: [
        {
            type: String,
        }
    ],
    role: {
        type: String,
        default: "user"
    }
})

//hash password
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
    }

    next();
})

//check password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

//genarating user token
userSchema.methods.genarateToken = function(){
    return jwt.sign({_id: this._id}, process.env.SECRET_KEY);
}

module.exports = mongoose.model("User", userSchema);