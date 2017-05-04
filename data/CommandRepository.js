const on = {type: 'on', description: 'Toggle output on'};
const off = {type: 'off', description: 'Toggle output off'};
const limits = {type: 'limits', description: 'Set warn limits on input'};
const temp = {type: 'temperature', description: 'Get temperature measurements'};
const humid = {type: 'humidity', description: 'Get humidity measurements'};
const meas = {type: 'measurements', description: 'Get all input measurements'};
const status = {type: 'status', description: 'Get all input and output measurements'};
const sw = {type: 'sw', description: 'Get technical information'};
const pin = {type: 'pin', description: 'Update PIN'};

export async function getCommands() {
  return [on, off, limits, temp, humid, meas, status, sw, pin];
}