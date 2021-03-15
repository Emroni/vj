const Analyser = require('audio-analyser');
const { AudioIO } = require('naudiodon');
const socket = require('./socket');
const {stream: log} = require('./log');

// Create Analyser
const analyser = new Analyser({
    fftSize: 256,
    frequencyBinCount: 256 / 2,
    channel: 1,
    bufferSize: 44100,
});

// Create AudioIO
const ai = new AudioIO({
    inOptions: {
        channelCount: 1,
        closeOnError: false,
        deviceId: -1,
        maxQueue: 1,
        sampleFormat: 32,
        sampleRate: 44100,
    },
});

// Prepare spectrum
const frequencyData = new Uint8Array(analyser.frequencyBinCount);
const spectrum = new Array(16);
const spectrumSegmentSize = Math.ceil(analyser.frequencyBinCount / spectrum.length);

// Parse data
ai.on('data', () => {
    // Get data
    analyser.getByteFrequencyData(frequencyData);

    // Reset values
    spectrum.fill(0);

    // Add buffer values
    for (let i = 0; i < frequencyData.length; i++) {
        spectrum[Math.floor(i / spectrumSegmentSize)] += frequencyData[i] / spectrumSegmentSize;
    }

    // Round values
    for (let i = 0; i < spectrum.length; i++) {
        spectrum[i] = Math.round(spectrum[i]);
    }

    // Emit values
    socket.emit('spectrum', spectrum);
});

// Run
ai.pipe(analyser);
ai.start();
log('[Running]');