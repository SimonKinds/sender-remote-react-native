// @flow

const express = require('express');

const app = express();
const expressWs = require('express-ws')(app);

type Command = 'ON' | 'OFF' | 'LIMITS' | 'TEMPERATURE' | 'HUMIDITY' | 'MEASUREMENTS' | 'STATUS' | 'SW' | 'PIN';
type CommandRequest = {to: string, type: Command, pin: string, body: ?string};

app.ws('/sms', (ws, request) => {
  ws.on('open', () => {
    console.log('open on server');
  });
  ws.on('message', (msg: string) => {
    // can't ensure that the request is valid
    const smsRequest: {to: ?string, type: ?Command, pin: ?string, body: ?string} = JSON.parse(msg);
    if (smsRequest.to == null || smsRequest.type == null || smsRequest.pin == null) {
      return errorMissingRequiredFields(smsRequest, ws);
    }
    if (requiresBody(smsRequest.type) && smsRequest.body == null) {
      errorMissingBody(ws);
    }
  });
});

function errorMissingRequiredFields(request: { to: ?string, type: ?Command, pin: ?string}, ws: any): void {
  let missingFields: Array<string> = [];
  if (request.to == null) {
    missingFields.push('to');
  }
  if (request.type == null) {
    missingFields.push('type');
  }
  if (request.pin == null) {
    missingFields.push('pin');
  }

  let msg: string = 'Missing the following required fields: ';
  missingFields.forEach(field => msg += field);
  ws.close(400, msg)
}

function requiresBody(type: Command) {
    switch(type) {
      case 'ON':
      case 'OFF':
      case 'LIMITS':
      case 'PIN':
        return true;
      default:
        return false;
    }
}

function errorMissingBody(ws: any): void {
  ws.close(400, 'Body is required for this command');
}

function onCommand(request: {to: string, type: Command, body: string}): void {
  // TODO: send the sms somehow
}

// don't care about mimicking a third party API for sending the actual SMS
// just pretend that we're sending it
function sendSms(to: string, message: string, ws: any): void {
  console.log('Sending ' + message + 'to ' + to);
  
  setTimeout(messageSent, 1000, ws);
  setTimeout(messageDelivered, 2000, ws);
}

function messageSent(ws: any) {
  ws.send('sent');
}

function messageDelivered(ws: any)  {
  ws.send('delivered');
}

app.listen(9137, 'localhost');