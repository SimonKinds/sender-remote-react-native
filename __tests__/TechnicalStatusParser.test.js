import {getValues} from '../common/TechnicalStatusParser';

test('Parse ID', () => {
  expect(getValues('ID: Test123')[0]).toEqual({field: 'ID', value: 'Test123'});
});

test('Parse multiple fields', () => {
  expect(getValues('ID: Test59209658,Typ: Airborne DC Dual'))
  .toEqual(
    [
      {field: 'ID', value: 'Test59209658'},
      {field: 'Typ', value: 'Airborne DC Dual'}
    ]
  );
});

test('Removes whitespace after comma', () => {
  expect(getValues('ID: Test59209658, Typ: Airborne DC Dual'))
  .toEqual(
    [
      {field: 'ID', value: 'Test59209658'},
      {field: 'Typ', value: 'Airborne DC Dual'}
    ]
  );
})