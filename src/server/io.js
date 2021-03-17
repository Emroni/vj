const app = require('express')();
const http = require('http');
const {io: log} = require('./log');

// Run server
const httpServer = http.Server(app);
httpServer.listen(3001, () => log('[Ready]'));

// Run socket.io
const io = module.exports = require('socket.io')(httpServer, {
    cors: {
        origin: '*',
        methods: [
            'GET',
        ],
    },
});

// On each socket connection
io.on('connect', (socket) => {
    log('[Client connected]');
    socket.on('disconnect', () => log('{Client disconnected}'));
});
