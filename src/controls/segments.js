import socket from '../socket';

const canvas = document.getElementById('segments');
const ctx = canvas.getContext('2d');

socket.on('stream', (data) => {
    const low = canvas.height * (1 - data.low);
    const mid = canvas.height * (1 - data.mid);
    const high = canvas.height * (1 - data.high);
    const width = canvas.width / 3;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#fff';

    ctx.beginPath();

    ctx.moveTo(0, low);
    ctx.lineTo(width, low);

    ctx.moveTo(width, mid);
    ctx.lineTo(width * 2, mid);

    ctx.moveTo(width * 2, high);
    ctx.lineTo(width * 3, high);

    ctx.stroke();
});