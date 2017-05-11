import { getValues } from '../common/StatusParser';

test('Parse single status input', () => {
  expect(getValues('STATUS: IN01=3%')[0]).toEqual({ type: 'in', portNumber: 1, value: '3%' });
});

test('Parse single status output', () => {
  expect(getValues('STATUS: OUT03=0')[0]).toEqual({ type: 'out', portNumber: 3, value: '0' });
});

test('Parse multiple ports', () => {
  expect(getValues('STATUS: IN01=+5C, IN05=-10, OUT01=0, IN99=10%,OUT11=3'))
    .toEqual([
      { type: 'in', portNumber: 1, value: '+5C' },
      { type: 'in', portNumber: 5, value: '-10' },
      { type: 'in', portNumber: 99, value: '10%' },
      { type: 'out', portNumber: 1, value: '0' },
      { type: 'out', portNumber: 11, value: '3' }]);
});

test('Ports are sorted by type and then port numbers', () => {
  expect(getValues('STATUS: IN01=3, IN05=3, OUT99=1, IN02=1, OUT01=0'))
    .toEqual([
      { type: 'in', portNumber: 1, value: '3' },
      { type: 'in', portNumber: 2, value: '1' },
      { type: 'in', portNumber: 5, value: '3' },
      { type: 'out', portNumber: 1, value: '0' },
      { type: 'out', portNumber: 99, value: '1' }]);
});