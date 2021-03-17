const Analyser = require('audio-analyser');
const { AudioIO } = require('naudiodon');
const {log} = require('./log');
const stream = require('./stream');

// Create Analyser
const analyser = new Analyser({
    bufferSize: 44100,
    channel: 1,
    fftSize: 256,
    frequencyBinCount: 256 / 2,
});

// Create AudioIO
const ai = new AudioIO({
    inOptions: {
        channelCount: 1,
        closeOnError: false,
        deviceId: -1,
        maxQueue: 1,
        sampleFormat: 32,
        sampleRate: analyser.bufferSize,
    },
});

// Prepare data
const frequencyData = new Uint8Array(analyser.frequencyBinCount);
stream.init(analyser);

// On update
ai.on('data', () => {
    analyser.getByteFrequencyData(frequencyData);
    stream.update(frequencyData);
});

// Run
ai.pipe(analyser);
ai.start();
log('[Running]');