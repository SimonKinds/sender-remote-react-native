const protocol = 'ws://';
const host = '10.0.2.2:9137';
const path = '/sms';

export function sendSms(to, msg, callback) {
  console.log('opening to ' + protocol + host + path);
  const ws = new WebSocket(protocol + host + path);

  ws.onopen = () => {
    console.log('open!');
    ws.send(JSON.stringify({ to, msg }));
  };

  ws.onmessage = (response) => {
    const parsedResponse= JSON.parse(response.data);
    callback(parsedResponse.event, parsedResponse.msg);
  };
}
