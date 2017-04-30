const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:9137/sms');

ws.on('open', () => {
  ws.send(JSON.stringify({from: 'asdasd', to: 'baba'}));
});

setTimeout(() => {}, 3000);
