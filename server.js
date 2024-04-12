const express=require("express")
const path=require('path')
const http=require('http')
const app=express();
const port=3001;
const socket = require("socket.io")

const server = http.createServer(app)
app.use(express.static(path.join(__dirname,"public")))

const io=socket(server)
io.on("connection", (socket)=>{
  console.log("a user connected")
socket.on("chatMsg",(m)=>{
  io.emit("message",m)
})
  socket.on("disconnect",()=>{
    io.emit("message","A user has left!")
  })

  socket.broadcast.emit("message","User has join")
  socket.emit("message","Welcome")
})

server.listen(port,()=>{
  console.log(`server is running on port ${port}`);
})