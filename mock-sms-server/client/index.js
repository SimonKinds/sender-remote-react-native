const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:9137/sms');

ws.on('open', () => {
  ws.send(JSON.stringify({to: 'me', msg: 'ON 1,2 1234'}));
});

ws.on('message', (msg) => {
  console.log(msg);
});

ws.on('close', (code, reason) => {
  console.log('Closing socket with code: ' + code + ' and reason: ' + reason);
});

setTimeout(() => {}, 3000);
