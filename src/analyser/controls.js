const merge = require('deepmerge');
const server = require('./server');

const data = module.exports = {
    bands: {
        low: {
            max: 1,
            min: 0,
            multiply: 1,
        },
        mid: {
            max: 8,
            min: 2,
            multiply: 1,
        },
        high: {
            max: 16,
            min: 10,
            multiply: 1,
        },
    },
};

server.on('connect', (socket) => {
    socket.emit('controls', data);

    socket.on('controls', (controls) => {
        updateBands(controls.bands);
        server.emit('controls', data);
    });
});

function updateBands(bands) {
    if (bands) {
        if (bands.low) {
            bands.low.min = (bands.low.min === undefined) ? data.bands.low.min : Math.min(bands.low.min, data.bands.low.max);
            bands.low.max = (bands.low.max === undefined) ? data.bands.low.max : Math.max(bands.low.max, data.bands.low.min);
        } else if (bands.mid) {
            bands.mid.min = (bands.mid.min === undefined) ? data.bands.mid.min : Math.min(bands.mid.min, data.bands.mid.max);
            bands.mid.max = (bands.mid.max === undefined) ? data.bands.mid.max : Math.max(bands.mid.max, data.bands.mid.min);
        } else if (bands.high) {
            bands.high.min = (bands.high.min === undefined) ? data.bands.high.min : Math.min(bands.high.min, data.bands.high.max);
            bands.high.max = (bands.high.max === undefined) ? data.bands.high.max : Math.max(bands.high.max, data.bands.high.min);
        }

        data.bands = merge(data.bands, bands);
    }
}