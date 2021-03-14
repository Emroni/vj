import socket from '../socket';

const canvas = document.getElementById('spectrum');
const ctx = canvas.getContext('2d');

socket.on('spectrum', (spectrum) => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';

    ctx.beginPath();

    const width = canvas.width / spectrum.length;

    spectrum.forEach((segment, index) => {
        const y = canvas.height * (1 - segment / 255);
        ctx.moveTo(width * index, y);
        ctx.lineTo(width * (index + 1), y);
    });

    ctx.stroke();
});