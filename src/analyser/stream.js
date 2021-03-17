const controls = require('./controls');
const server = require('./server');

const data = {
    bands: {
        low: 0,
        mid: 0,
        high: 0,
    },
    spectrum: new Array(16),
};

module.exports.update = function (frequencyData) {
    // Parse spectrum
    data.spectrum.fill(0);
    const spectrumSegmentSize = Math.ceil(frequencyData.length / data.spectrum.length);
    for (let i = 0; i < frequencyData.length; i++) {
        data.spectrum[Math.floor(i / spectrumSegmentSize)] += frequencyData[i] / spectrumSegmentSize;
    }
    for (let i = 0; i < data.spectrum.length; i++) {
        data.spectrum[i] = Math.round(data.spectrum[i]);
    }
    
    // Parse bands
    data.bands.low = 0;
    data.bands.mid = 0;
    data.bands.high = 0;
    for (let i = 0; i < data.spectrum.length; i++) {
        const n = data.spectrum[i];
        if (i >= controls.bands.low.min && i < controls.bands.low.max) {
            data.bands.low += n;
        }
        if (i >= controls.bands.mid.min && i < controls.bands.mid.max) {
            data.bands.mid += n;
        }
        if (i >= controls.bands.high.min && i < controls.bands.high.max) {
            data.bands.high += n;
        }
    }
    data.bands.low = Math.round(data.bands.low / (controls.bands.low.max - controls.bands.low.min) * controls.bands.low.multiply);
    data.bands.mid = Math.round(data.bands.mid / (controls.bands.mid.max - controls.bands.mid.min) * controls.bands.mid.multiply);
    data.bands.high = Math.round(data.bands.high / (controls.bands.high.max - controls.bands.high.min) * controls.bands.high.multiply);

    // Emit values
    server.emit('stream', data);
}