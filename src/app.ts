import * as http from 'http';
import { Socket } from 'net';
import * as WebSocket from 'ws';
import { setupWSConnection } from './utils.js';

const wss = new WebSocket.Server({ noServer: true });

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 1234;

const server = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/plain' });
  response.end('okay');
});

wss.on('connection', setupWSConnection);

server.on('upgrade', (request, socket, head) => {
  // You may check auth of request here..
  wss.handleUpgrade(request, socket as Socket, head, (ws, request) => {
    console.log(
      'Client %s:%s connected',
      request.socket.remoteAddress,
      request.socket.remotePort
    );
    ws.on('close', (code: number, reason: string) => {
      console.log(
        'Client %s:%s closed',
        request.socket.remoteAddress,
        request.socket.remotePort
      );
    });
    
    wss.emit('connection', ws, request);
  });
});

server.listen({ host, port });

console.log('Hello binote-y!');
console.log(`running at '${host}' on port ${port}`);
