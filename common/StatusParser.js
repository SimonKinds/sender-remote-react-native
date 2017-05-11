import _ from 'lodash';

export function getValues(response) {
  const splits = response.split(',');

  const types = _.map(splits, val => val.toLowerCase().includes('in') ? 'in' : 'out');
  const portNumbers = _.map(splits, val => getPortNumber(val));
  const values = _.map(splits, val => val.replace(/^[^=]+=/g, ''));

  const objectsAsLists = _.zip(types, portNumbers, values);

  const objects = _.map(objectsAsLists, list => ({ type: list[0], portNumber: list[1], value: list[2] }));

  // in before out, it's lexicographical order
  return _.sortBy(objects, ['type', 'portNumber']);
}

function getPortNumber(val) {
  const regex = /\D*(?:IN|OUT)(\d+)=.+/g;
  const matches = regex.exec(val);
  return parseInt(matches[1]);
}