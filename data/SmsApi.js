const protocol = 'ws://';
const host = '10.0.2.2:9137';
const path = '/sms';

export type ResponseEvent = 'sent' | 'delivered' | 'response';

export function sendSms(to: string, msg: string, callback: (event: ResponseEvent, msg?: string) => void) {
  console.log('opening to ' + protocol + host + path);
  const ws = new WebSocket(protocol + host + path);

  ws.onopen = () => {
    console.log('open!');
    ws.send(JSON.stringify({ to, msg }));
  };

  ws.onmessage = (response) => {
    const parsedResponse: { event: ResponseEvent, msg?: string } = JSON.parse(response.data);
    callback(parsedResponse.event, parsedResponse.msg);
  };
}