// @flow

import express from 'express';
import bodyParser from 'body-parser';
import WebSocket from 'ws';
import ConnectionManager from './connection-manager';

const twilioAccountSid = 'ACecf79338050536dc44b41b9f24307424';
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

if (!twilioAuthToken) {
  console.error('No twilio auth token defined!');
  process.exit(1);
}

const connectionManager = new ConnectionManager();

const websocketPort = 9137;
const websocketServer = new WebSocket.Server({ port: websocketPort });

websocketServer.on('connection', (ws) => {
  let number: ?string;

  ws.on('open', () => {
    console.log('Connection opened');
  });

  ws.on('message', (message) => {
    const request: { to: ?string, msg: ?string } = JSON.parse(message);
    if (request.to == null || request.msg == null) {
      console.log('missing parameters');
      return ws.close(4000, 'Missing parameters');
    }

    const { to, msg } = request;

    connectionManager.pushConnection(to, ws);
    number = to;

    sendSms(to, msg, ws);
  });

  ws.on('close', () => {
    if (number) {
      connectionManager.popConnection(number);
    }
  });
});

function sendSms(to: string, message: string, ws: any) {
  console.warn('Should send message with Twilio');
}

const httpPort = 9138;
const app = express();
// twilio response body is urlencoded
app.use(bodyParser.urlencoded());

app.post('/sms/response', (request: any, response: any) => {
  console.log(request.body);
  // send back no content to make Twilio debugger happy
  response.status(204).end();
});

app.listen(httpPort, () => {
  console.log('Started server on ' + httpPort);
});