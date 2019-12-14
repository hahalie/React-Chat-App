import express, { Application } from "express";

import http from "http";

import socketio from "socket.io";

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");

const cors = require("cors");

const router: any = require("./router");

const PORT: string | 5000 = process.env.PORT || 5000;

const app: Application = express();

app.use(router);
app.use(cors);

const server: http.Server = http.createServer(app);

const io: socketio.Server = socketio(server);

io.on("connection", (socket: socketio.Socket) => {
    socket.on("join", ({ name, room }:any, callback: any) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if (error) return callback(error);
  
      socket.emit("message", {
        user: "admin",
        text: `${user.name}, welcome to the room #${user.room}`
      });
      socket.broadcast
        .to(user.room)
        .emit("message", { user: "admin", text: `${user.name}, has joined!` });
  
      socket.join(user.room);
  
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
  
      callback();
    });
  
    socket.on("sendMessage", (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit("message", { user: user.name, text: message });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
  
      callback();
    });
  
    socket.on("disconnect", () => {
      const user = removeUser(socket.id);
  
      if (user) {
        io.to(user.room).emit("message", {
          user: "admin",
          text: `${user.name} has left.`
        });
      }
    });
  });


server.listen(PORT, () => console.log(`Server is started on ${PORT}`));