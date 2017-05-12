// @flow
import _ from 'lodash';

type ParsedStatus = {field: string, value: string};

export function getValues(response: string): Array<ParsedStatus> {
  const splits = response.split(',');

  return _.map(splits, (split) => {
    const matches = /\s*(.+):\s*(.+)/g.exec(split);
    return {field: matches[1], value: matches[2]};
  });
}