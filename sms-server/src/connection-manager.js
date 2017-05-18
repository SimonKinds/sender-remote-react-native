// @flow

export default class ConnectionManager {
  connections: {[number: string]: ?WebSocket};

  constructor() {
    this.connections = {};
  }

  pushConnection(number: string, ws: WebSocket) {
    this.connections[number] = ws;
  }

  popConnection(number: string) {
    this.connections[number] = null;
  }

  get(number: string) {
    return this.connections[number];
  }
}