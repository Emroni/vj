const portAudio = require('naudiodon');
const socket = require('./socket');
const {stream: log} = require('./log');

// Prepare segments
const low = {
    max: 100,
    min: 0,
};
const mid = {
    max: 5000,
    min: 500,
};
const high = {
    max: 16384,
    min: 10000,
};

// Get segments multipliers
low.multiplier = 1 / ((low.max - low.min) * 256);
mid.multiplier = 1 / ((mid.max - mid.min) * 256);
high.multiplier = 1 / ((high.max - high.min) * 256);

// Create AudioIO
const ai = new portAudio.AudioIO({
    inOptions: {
        channelCount: 1,
        closeOnError: false,
        deviceId: -1,
        maxQueue: 1,
        sampleFormat: 32,
        sampleRate: 44100,
    },
});

// Samples
ai.on('data', (buffer) => {
    // Reset values
    low.value = 0;
    mid.value = 0;
    high.value = 0;

    // Add buffer values
    for (let i = 0; i < buffer.length; i++) {
        const n = buffer[i];
        if (i >= low.min && i < low.max) {
            low.value += n;
        }
        if (i >= mid.min && i < mid.max) {
            mid.value += n;
        }
        if (i >= high.min && i < high.max) {
            high.value += n;
        }
    }

    // Emit final values
    socket.emit('stream', {
        low: low.value * low.multiplier,
        mid: mid.value * mid.multiplier,
        high: high.value * high.multiplier,
    });
});

// Run
ai.start();
log('[Running]');