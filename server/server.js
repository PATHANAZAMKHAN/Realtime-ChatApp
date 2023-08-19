const { Server } = require("socket.io");
const express = require('express');
const cors = require('cors');
const http = require('http');

const app =  express();
app.use(cors())

const server = http.createServer(app);

const port = process.env.PORT || 5000;

const io = new Server(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods:['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowedHeaders:['chatroom'],
      credentials:true
    },
  });

io.on("connection", (socket) => {
  console.log("User connected " + socket.id)

  socket.on('join-room', (room)=>{
    socket.join(room);
    const roomMembers = io.sockets.adapter.rooms.get(room);
    const allUsers = Array.from(roomMembers);
    socket.emit('connected_users', allUsers)
  })

  socket.on('send-message',(data)=>{
    socket.broadcast.to(data.messageRoom).emit("receive-message", data)
    
  })

  socket.on('disconnect',()=>{
    console.log("User disconnected " + socket.id)
  })

});

server.listen(port,()=>{
    console.log("Server Started on http://localhost:5000")
})
