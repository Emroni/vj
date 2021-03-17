import socket from '../../socket';

const bands = {
    low: document.getElementById('spectrum-band-low'),
    mid: document.getElementById('spectrum-band-mid'),
    high: document.getElementById('spectrum-band-high'),
};

const canvas = document.getElementById('spectrum');
const ctx = canvas.getContext('2d');

socket.on('controls', (controls) => {
    bands.low.style.left = (controls.bands.low.min / 16 * 100) + '%';
    bands.low.style.width = ((controls.bands.low.max - controls.bands.low.min) / 16 * 100) + '%';
    bands.mid.style.left = (controls.bands.mid.min / 16 * 100) + '%';
    bands.mid.style.width = ((controls.bands.mid.max - controls.bands.mid.min) / 16 * 100) + '%';
    bands.high.style.left = (controls.bands.high.min / 16 * 100) + '%';
    bands.high.style.width = ((controls.bands.high.max - controls.bands.high.min) / 16 * 100) + '%';
});

socket.on('stream', (stream) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';

    ctx.beginPath();

    const width = canvas.width / stream.spectrum.length;

    stream.spectrum.forEach((segment, index) => {
        const y = canvas.height * (1 - segment / 255);
        ctx.moveTo(width * index, y);
        ctx.lineTo(width * (index + 1), y);
    });

    ctx.stroke();
});