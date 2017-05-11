import _ from 'lodash';

export function getValues(response) {
  const splits = response.split(',');

  return _.map(splits, (split) => {
    const matches = /(.+):\s*(.+)/g.exec(split);
    return {field: matches[1], value: matches[2]};
  });
}