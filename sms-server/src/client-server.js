// @flow

import WebSocket from 'ws';
import phone from 'phone';
import Twilio from 'twilio';

import ConnectionManager from './connection-manager';

const ErrorMissingParameters = { code: 4000, msg: 'Missing Parameters' };
const ErrorInvalidNumber = { code: 4001, msg: 'Invalid phone number' };
const ErrorTwilio = { code: 4002 };

const twilioAccountSid = 'ACecf79338050536dc44b41b9f24307424';
const twilioAuthToken = process.env.TWILIO_AUTH_TOKEN;

if (!twilioAuthToken) {
  console.error('No twilio auth token defined!');
  process.exit(1);
}

export default function ClientServer(connectionManager: ConnectionManager) {
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
}

function sendSms(to: string, message: string, ws: any) {
  const client = new Twilio(twilioAccountSid, twilioAuthToken);

  client.messages.create({
    body: message,
    to,
    from: '+46765193221',
    statusCallback: 'http://kindstrom.io:9138/sms/status'
  }).error((e) => {
    console.log('Twilio could not send message: ' + e);
    ws.close(ErrorTwilio.code, e);
  })
}