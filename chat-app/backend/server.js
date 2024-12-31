const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const connectDb = require('./config/db')
const messageRoutes = require('./routes/messages')

//Load environmet variables
dotenv.config();

//Initialize express app and http server
const app = express();
const server = http.createServer(app);
const io = new Server(server);

//Connect to database
connectDb();

//Middleware to parse JSON data/log incoming requests
app.use(express.json());
app.use("/api/messages", messageRoutes);

//Websocket events
io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Listen for a message
    socket.on("sendMessage", async (data) => {
        try {
            const { username, content } = data;

            // Save message to database
            const newMessage = new Message({ username, content });
            await newMessage.save();

            // Broadcast the message to all clients
            io.emit("newMessage", newMessage);
        } catch (error) {
            console.error("Error saving message:", error);
        }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
