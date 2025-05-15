const http = require('http');
const socketIO = require('socket.io');
const app = require('./server'); // Express app

const server = http.createServer(app);

const io = socketIO(server, {
  cors: {
    origin: "*", // adjust as needed
    methods: ["GET", "POST"]
  }
});

// Socket logic
require('./socket/chat')(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
