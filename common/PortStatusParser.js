// @flow
import _ from 'lodash';

type PortType = 'in' | 'out';
type ParsedPort = {type: PortType, portNumber: number, value: string, alarm: boolean};

export function getValues(response: string): Array<ParsedPort> {
  const splits = response.split(',');

  return _.sortBy(_.map(splits, (split: string): ParsedPort => {
    const matches = /.*(IN|OUT)(\d+)=(!)?(.+)/g.exec(split);
    const type = getType(matches[1]);
    const portNumber = parseInt(matches[2]);
    const value = matches[4];
    const alarm = matches[3] != undefined;
    return { type, portNumber, value, alarm };
  }), ['type', 'portNumber']);
}
function getType(val: string): PortType {
  if (val == 'IN') {
    return 'in';
  }
  return 'out';
}