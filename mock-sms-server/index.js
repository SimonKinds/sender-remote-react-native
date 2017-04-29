const express = require('express');

const app = express();
const expressWs = require('express-ws')(app);

app.ws('/sms', (ws, request) => {
  ws.on('message', (data, flags) => {
    const {to} = data;
    console.log(to);
  });
});

app.listen(9137, 'localhost');