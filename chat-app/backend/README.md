Chat Application Backend - Node.js

Overview
This is the backend for a chat application built using Node.js, Express, Socket.io, and MongoDB. The app allows users to send and receive messages in real-time, while also providing REST API endpoints to retrieve and post messages.

Features
Real-Time Communication: Users can send and receive messages instantly using Socket.io.
REST API: Provides a set of endpoints to interact with messages.
GET /api/messages: Fetch all messages from the database.
POST /api/messages: Save a new message to the database.
MongoDB: Stores messages persistently in a MongoDB Atlas cloud database.
Node.js and Express: Handles the backend API and WebSocket connections.

Tech Stack
Node.js: JavaScript runtime for building the server.
Express: Web framework for building REST APIs.
Socket.io: Library for enabling real-time communication between clients and the server.
MongoDB: NoSQL database to store messages.
Mongoose: MongoDB object modeling for Node.js.
dotenv: Manages environment variables like database connection strings.

Project Setup
1. Clone the Repository
Clone the repository to your local machine:

git clone https://github.com/your-username/nodejs/chat-app/backend.git
cd nodejs/chat-app/backend

2. Install Dependencies
Install the necessary dependencies:
npm install

3. Setup Environment Variables
Create a .env file in the root directory of the project and add your MongoDB URI:

MONGO_URI=mongodb+srv://<db_username>:<db_password>@<cluster_name>.mongodb.net/<dbname>?retryWrites=true&w=majority
PORT=3000
Replace <db_username>, <db_password>, <cluster_name>, and <dbname> with your actual MongoDB Atlas credentials.

4. Connect to MongoDB
The backend uses MongoDB Atlas for data storage. The connection string from the .env file will be used by Mongoose to connect to your MongoDB instance.

Directory Structure
The project follows a modular structure for easy maintainability:
chat-app-backend/
├── server.js            # Main server file
├── .env                 # Environment variables
├── config/
│   └── db.js            # Database connection logic
├── models/
│   └── Message.js       # Message schema for MongoDB
├── routes/
│   └── messages.js      # API routes for message-related operations
└── package.json         # Project metadata and dependencies

API Endpoints
GET /api/messages
Fetch all messages from the database.

Request:
Method: GET
URL: /api/messages

Response:
Status: 200 OK
Body: An array of message objects:
[
  {
    "username": "John",
    "content": "Hello, World!",
    "timestamp": "2024-12-30T10:00:00.000Z"
  },
  {
    "username": "Jane",
    "content": "Hi there!",
    "timestamp": "2024-12-30T10:05:00.000Z"
  }
]

POST /api/messages
Save a new message to the database.

Request:
Method: POST
URL: /api/messages
Body (JSON):
{
  "username": "John",
  "content": "This is a test message"
}

Response:
Status: 201 Created
Body: The newly created message:
{
  "_id": "609c72ef7b3c8e2d6e6e1e4b",
  "username": "John",
  "content": "This is a test message",
  "timestamp": "2024-12-30T10:10:00.000Z"
}

Error Handling:
Missing required fields (username or content) will return a 400 Bad Request error with a message:
{
  "error": "Failed to save message"
}

Real-Time Communication (Socket.io)
In addition to the REST API, the backend supports real-time communication using Socket.io. When a user sends a message, it is broadcast to all connected clients.

WebSocket Events
sendMessage: Clients emit this event to send a message to the server. The message is broadcast to all connected clients via the newMessage event.
newMessage: Emitted by the server to all connected clients when a new message is sent.

Example Client-Side Communication:
Client sends a message:
socket.emit("sendMessage", { username: "John", content: "Hello, World!" });

Client receives the new message:
socket.on("newMessage", (message) => {
  console.log("New message:", message);
});

Running the Application
Start the Backend Server: Run the following command to start the server:
node server.js
The server will start on http://localhost:3000.

Test API Endpoints:
Use Postman or any API testing tool to test the GET and POST routes.