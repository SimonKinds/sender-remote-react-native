// @flow

const express = require('express');

const app = express();
const expressWs = require('express-ws')(app);

type Command = 'ON' | 'OFF' | 'LIMITS' | 'TEMP' | 'HUMID' | 'MEAS' | 'STATUS' | 'SW' | 'PIN'

app.ws('/sms', (ws, request) => {
  ws.on('open', () => {
    console.log('open on server');
  });
  ws.on('message', (msg: string) => {
    // can't ensure that the request is valid
    const request: {to: ?string, msg: ?string} = JSON.parse(msg);
    if (request.to == null || request.msg == null) {
      console.log('missing parameters');
      return ws.close(4000, 'Missing parameters');
    } 
    sendSms(request.to, request.msg, ws);
  });
});

// don't care about mimicking a third party API for sending the actual SMS
// just pretend that we're sending it
function sendSms(to: string, message: string, ws: any): void {
  let type: Command;
  const lwrCaseMsg = message.toUpperCase();
  if (lwrCaseMsg.includes('ON')) {
    type = 'ON';
  } else if (lwrCaseMsg.includes('OFF')) {
    type = 'OFF';
  } else if (lwrCaseMsg.includes('OFF')) {
    type = 'OFF';
  } else if (lwrCaseMsg.includes('LIMITS')) {
    type = 'LIMITS';
  } else if (lwrCaseMsg.includes('TEMP')) {
    type = 'TEMP';
  } else if (lwrCaseMsg.includes('HUMID')) {
    type = 'HUMID';
  } else if (lwrCaseMsg.includes('MEAS')) {
    type = 'MEAS';
  } else if (lwrCaseMsg.includes('STATUS')) {
    type = 'STATUS';
  } else if (lwrCaseMsg.includes('SW')) {
    type = 'SW';
  } else if (lwrCaseMsg.includes('PIN')) {
    type = 'PIN';
  } else {
    return errorType(message, ws);
  }

  console.log('Sending ' + message + ' to ' + to);

  setTimeout(messageSent,1000, ws);
  setTimeout(messageDelivered, 2000, ws);
  setTimeout(messageResponse, 3000, type, ws);
}

function errorType(msg: string, ws: any) {
  ws.close(4000, 'Invalid message ' + msg);
}

function messageSent(ws: any) {
  ws.send('sent');
}

function messageDelivered(ws: any)  {
  ws.send('delivered');
}

function messageResponse(type: Command, ws: any) {
  let response: string;
  switch (type) {
    case 'ON':
      response = 'OK, output control executed';
      break;
    case 'OFF':
      response = 'OK, output control executed';
      break;
    case 'LIMITS':
      response = 'OK, limits set: +15C, +30C';
    case 'TEMP':
      response = 'IN04=!+26C,IN05=-15C,IN06=+13C';
      break;
    case 'HUMID':
      response = 'Humidity: IN03=+16%';
      break;
    case 'MEAS':
      response = 'Measurements: IN01=76, IN03=+16%, IN04=!+26C,IN05=-15C, IN06=+13C, IN07=1293'
      break;
    case 'STATUS':
      response = 'Status: IN01=76, IN02=1, IN03=+16%, IN04=!+26C,IN05=-15C, IN06=+13C, IN07=1293, IN08=0'
      break;
    case 'SW':
      response = 'Test59209658,Typ: Airborne DC Dual     SS    SW: 1.16.58, Signal: 17, Switch: 2, Power: OK, Battery: OK, Tamper: OK, IP: OK'
      break;
  }
  ws.send(response);
  ws.close(1000, 'message sent to sender, and response sent back to client');
}

app.listen(9137, 'localhost');