import http from 'http';
import ws from 'ws';
import NewSetupSocket from './src/stomp.js';

Object.assign(global, { WebSocket: ws });

// const NewSetupSocket = require('./src/stomp');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World');
});

server.listen(port, hostname, async () => {
  NewSetupSocket.onConnect();
  console.log(`Server running at http://${hostname}:${port}/`);
});
