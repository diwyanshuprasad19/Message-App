const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    name:{
        type : String,
        required : true,
    },
    image:{
        type : String,
        required : true,
    },
    message:{
        type : String,
        required : true,
    },    
    time:{
        type: Date, 
        required : true,
    },
},{
    timestamps:true
});
const Chat = mongoose.model("ChatData",ChatSchema);
module.exports = Chat;
