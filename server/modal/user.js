const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    image:{
        type : String,
        required : true,
    },
},{
    timestamps:true
});
const User = mongoose.model("UserData",UserSchema);
module.exports = User;
