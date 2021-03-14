const app = require('express')();
const http = require('http');
const {socket: log} = require('./log');

// Run server
const httpServer = http.Server(app);
httpServer.listen(3001, () => log('[Ready]'));

// Run socket.io
const io = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
        methods: [
            'GET',
        ],
    },
});

// On each socket connection
io.on('connect', (socket) => {
    log('[Connected]');
    socket.on('disconnect', () => log('{Disconnected}'));
});

// Emit to all sockets
module.exports.emit = (type, data) => {
    io.emit(type, data);
};