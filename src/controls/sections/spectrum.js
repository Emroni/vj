import socket from '../../socket';

const bands = {
    low: {
        min: 0,
        max: 0,
        overlay: document.getElementById('spectrum-band-low'),
    },
    mid: {
        min: 0,
        max: 0,
        overlay: document.getElementById('spectrum-band-mid'),
    },
    high: {
        min: 0,
        max: 0,
        overlay: document.getElementById('spectrum-band-high'),
    },
};

const canvas = document.getElementById('spectrum');
const ctx = canvas.getContext('2d');

socket.on('controls', (controls) => {
    // Update band values
    bands.mid.min = controls.bands.mid.min;
    bands.mid.max = controls.bands.mid.max;
    bands.low.min = controls.bands.low.min;
    bands.low.max = controls.bands.low.max;
    bands.high.min = controls.bands.high.min;
    bands.high.max = controls.bands.high.max;

    // Update overlays
    bands.low.overlay.style.left = (controls.bands.low.min / 16 * 100) + '%';
    bands.low.overlay.style.width = ((controls.bands.low.max - controls.bands.low.min) / 16 * 100) + '%';
    bands.mid.overlay.style.left = (controls.bands.mid.min / 16 * 100) + '%';
    bands.mid.overlay.style.width = ((controls.bands.mid.max - controls.bands.mid.min) / 16 * 100) + '%';
    bands.high.overlay.style.left = (controls.bands.high.min / 16 * 100) + '%';
    bands.high.overlay.style.width = ((controls.bands.high.max - controls.bands.high.min) / 16 * 100) + '%';
});

socket.on('stream', (stream) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const segmentWidth = canvas.width / stream.spectrum.length;

    // Draw segments
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    stream.spectrum.forEach((segment, index) => {
        const y = canvas.height * (1 - segment / 255);
        ctx.moveTo(segmentWidth * index, y);
        ctx.lineTo(segmentWidth * (index + 1), y);
    });
    ctx.stroke();

    // Draw bands
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f00';
    ctx.beginPath();
    const low = canvas.height * (1 - stream.bands.low / 255);
    ctx.moveTo(segmentWidth * bands.low.min, low);
    ctx.lineTo(segmentWidth * bands.low.max, low);
    ctx.stroke();

    ctx.strokeStyle = '#0f0';
    ctx.beginPath();
    const mid = canvas.height * (1 - stream.bands.mid / 255);
    ctx.moveTo(segmentWidth * bands.mid.min, mid);
    ctx.lineTo(segmentWidth * bands.mid.max, mid);
    ctx.stroke();

    ctx.strokeStyle = '#00f';
    ctx.beginPath();
    const high = canvas.height * (1 - stream.bands.high / 255);
    ctx.moveTo(segmentWidth * bands.high.min, high);
    ctx.lineTo(segmentWidth * bands.high.max, high);
    ctx.stroke();

});