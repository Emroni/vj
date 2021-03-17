const server = require('./server');

const data = {
    spectrum: new Array(16),
};

let spectrumSegmentSize;

module.exports.init = function (analyser) {
    spectrumSegmentSize = Math.ceil(analyser.frequencyBinCount / data.spectrum.length);
}

module.exports.update = function (frequencyData) {
    // Reset values
    data.spectrum.fill(0);

    // Add buffer values
    for (let i = 0; i < frequencyData.length; i++) {
        data.spectrum[Math.floor(i / spectrumSegmentSize)] += frequencyData[i] / spectrumSegmentSize;
    }

    // Round values
    for (let i = 0; i < data.spectrum.length; i++) {
        data.spectrum[i] = Math.round(data.spectrum[i]);
    }

    // Emit values
    server.emit('stream', data);
}