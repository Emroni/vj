const portAudio = require('naudiodon');
const socket = require('./socket');
const {stream: log} = require('./log');

// Prepare spectrum
const spectrum = new Array(100);
const spectrumSegmentSize = Math.ceil(16384 / spectrum.length);

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
    spectrum.fill(0);

    // Add buffer values
    for (let i = 0; i < buffer.length; i++) {
        spectrum[Math.floor(i / spectrumSegmentSize)] += buffer[i] / spectrumSegmentSize;
    }

    // Round values
    for (let i = 0; i < spectrum.length; i++) {
        spectrum[i] = Math.round(spectrum[i]);
    }

    // Emit values
    socket.emit('spectrum', spectrum);
});

// Run
ai.start();
log('[Running]');