import { io } from 'socket.io-client';

const params = new URLSearchParams(window.location.search);
const url = params.get('socket') || 'http://localhost:3001';
const connection = io(url);

export default connection;