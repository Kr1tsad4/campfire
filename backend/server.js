require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./src/config/db.js");
const app = require("./src/app.js");
const { chatSocketHandler } = require("./src/sockets/chat-socket.js");
connectDB();

const port = process.env.PORT;

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  chatSocketHandler(io, socket);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
