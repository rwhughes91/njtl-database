import io from 'socket.io-client';

const socket = io('https://new-jersey-database-server.herokuapp.com/');

export default socket;
