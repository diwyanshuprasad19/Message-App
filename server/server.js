const express = require("express");
const app = express();
const http  = require("http");
const {Server} = require("socket.io");
const cors = require("cors");
const mongoose = require('mongoose');
const ChatModel = require('./modal/chat');
const UserModel = require('./modal/user');
app.use(express.json());
app.use(cors());
const server =  http.createServer(app);



mongoose.connect("mongodb+srv://diwyanshuprasad:qwerty12345@cluster0.i7t88bc.mongodb.net/Message?retryWrites=true&w=majority",
{
    useNewUrlParser: true,
});




const io = new Server(server, {
  cors:{
    origin:"http://localhost:3000",
    methods:["GET","Post"],
  },
});


io.on("connection",(socket) =>{

  socket.on('chat', (message) => {
    console.log(`Received message from client: ${message}`);
  });

  socket.on('User Join', async(user) => {

  let  name= user.name.toLowerCase();
  let image= user.avatar;
  let userfind = await UserModel.findOne({ name:name });
  if (userfind) {
   let userupdate = await ChatModel.updateMany({name:name},{$set:{image:image}});
   console.log('user already there');
  }
  else{
    let usercreate = await new UserModel({name:name,image:image});
    let usersave = await usercreate.save();
   console.log('user successfully saved');
  }
  });

  socket.on('Sent',async(obj)=>{

let name = obj.name.toLowerCase();
let avatar= obj.avatar;
let message = obj.message;
const utcDate = new Date();

let messagecreate = await new ChatModel({name:name,image:avatar,message:message,time:utcDate});
    let messagesave = await messagecreate.save();
   console.log('message successfully saved');
  });

});



app.get("/retrievemessage",async(req,res)=>{

    try{
      let message = await ChatModel.find({});
      return res.send({type:'Success',message:message});
    }
    catch(err){
    res.send({type:'error',errors:err});
    }
    });


    app.post("/deletemessage",async(req,res)=>{
     const id = req.body.id;
      try{
        let messagedelete = await ChatModel.deleteOne({_id:id});
        return res.send({type:'Success'});
      }
      catch(err){
      res.send({type:'error',errors:err});
      }
      });


server.listen(3001,()=>{
  console.log("Server is Running");
})