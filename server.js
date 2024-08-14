const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Socket.io connection handling
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('joinGame', (data) => {
        console.log(`${data.name} joined the game`);
        // Handle joining logic, e.g., broadcast to other players
        io.emit('playerJoined', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        // Handle disconnection logic
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
