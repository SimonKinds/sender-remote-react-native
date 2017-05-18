// @flow

import express from 'express';
import bodyParser from 'body-parser';
import WebSocket from 'ws';
import phone from 'phone';
import Twilio from 'twilio';

import ConnectionManager from './connection-manager';

type TwilioMessageStatus = 'sent' | 'delivered' | 'received';
type TwilioStatusUpdate = {To: string, SmsStatus: TwilioMessageStatus};
type TwilioResponse = {From: string, SmsStatus: TwilioMessageStatus, Body: string};
type ClientResponse = {event: TwilioMessageStatus, msg?: string};

const ErrorMissingParameters = { code: 4000, msg: 'Missing Parameters' };
const ErrorInvalidNumber = { code: 4001, msg: 'Invalid phone number' };

const twilioAccountSid = 'ACecf79338050536dc44b41b9f24307424';
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

if (!twilioAuthToken) {
  console.error('No twilio auth token defined!');
  process.exit(1);
}

const connectionManager = new ConnectionManager();

const httpPort = 9138;
const websocketPort = 9137;
const websocketServer = new WebSocket.Server({ port: websocketPort });

websocketServer.on('connection', (ws) => {
  let number: ?string;

  ws.on('message', (message) => {
    const request: { to: ?string, msg: ?string } = JSON.parse(message);
    if (request.to == null || request.msg == null) {
      console.log('missing parameters');
      return ws.close(ErrorMissingParameters.code,
        ErrorMissingParameters.msg);
    }

    const { to, msg } = request;

    if (phone(to).length == 0) {
      console.log(to + ' is an invalid phone number');
      return ws.close(ErrorInvalidNumber.code, ErrorInvalidNumber.msg);
    }

    connectionManager.pushConnection(to, ws);
    number = to;

    sendSms(phone(to)[0], msg, ws);
  });

  ws.on('close', () => {
    console.log('Closing connection');
    if (number) {
      connectionManager.popConnection(number);
    }
  });
});

function sendSms(to: string, message: string, ws: any) {
  const client = new Twilio(twilioAccountSid, twilioAuthToken);

  client.messages.create({
    body: message,
    to,
    from: '+46765193221',
    statusCallback: 'http://kindstrom.io:' + httpPort + '/sms/status'
  })
  .then();
}

const app = express();
// twilio response body is urlencoded
app.use(bodyParser.urlencoded());

app.post('/sms/response', (request: any, response: any) => {
  console.log('Twilio response');
  const body: TwilioResponse = request.body;

  const ws = connectionManager.get(body.From);
  if (ws) {
    const res: ClientResponse = {event: body.SmsStatus, msg: body.Body};
    console.log('Sending response to client: ' + JSON.stringify(res));
    ws.send(JSON.stringify(res))
  }
  // send back no content to make Twilio debugger happy
  response.status(204).end();
});

app.post('/sms/status', (request: any, response: any) => {
  console.log('Twilio status update');
  const body: TwilioStatusUpdate = request.body;

  const ws = connectionManager.get(body.To);
  if (ws) {
    const res: ClientResponse = {event: body.SmsStatus};
    console.log('Sending status to client: ' + JSON.stringify(res));
    ws.send(JSON.stringify(res));
  }

  response.status(204).end();
});

app.listen(httpPort, () => {
  console.log('Started server on ' + httpPort);
});