// @flow

const express = require('express');

const app = express();
const expressWs = require('express-ws')(app);

type Command = 'ON' | 'OFF' | 'TEMPERATURE' | 'HUMIDITY' | 'MEASUREMENTS' | 'STATUS' | 'SW' | 'PIN';

app.ws('/sms', (ws, request) => {
  ws.on('open', () => {
    console.log('open on server');
  });
  ws.on('message', (msg: string) => {
    const smsRequest: {to: string, type: Command, body: string} = JSON.parse(msg);
    switch(smsRequest.type) {
      case 'ON':

    }
  });
});

function sendOnCommand() {

}

app.listen(9137, 'localhost');