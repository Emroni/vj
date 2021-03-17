const merge = require('deepmerge');
const server = require('./server');

const data = {
    bands: {
        low: {
            max: 1,
            min: 0,
            multiply: 1,
        },
        mid: {
            max: 40,
            min: 4,
            multiply: 1,
        },
        high: {
            max: 128,
            min: 80,
            multiply: 1,
        },
    },
};

server.on('connect', (socket) => {
    socket.emit('controls', data);

    socket.on('controls', (update) => {
        Object.entries(update)
            .forEach(([key, value]) => {
                data[key] = merge(data[key], value);
            });
        server.emit('controls', data);
    });
});