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