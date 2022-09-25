const mongoose = require('mongoose');

exports.connectDB = ()=>{
    mongoose.connect(process.env.DB)
    .then(res => console.log(`Database is connected with host : ${res.connection.host}`))
    .catch(err => console.log(err));
}