import each from 'jest-each';
import formFormatter from './formFormatter';

const dateData = [
  ['1418803200000', '12/17/2014'],
  ['12', '12'],
  ['1', '1'],
  ['', ''],
  ['12/17/2014', '12/17/2014'],
  ['123', '12/31/1969'],
  ['12/1', '12/1'],
  ['12/', '12/'],
  ['01/1/2010', '1/1/2010'],
];

const percentData = [
  ['4', '4%'],
  [4, '4%'],
  ['40%', '40%'],
  ['0', '0%'],
  ['', '0%'],
];

const percentData2 = [
  ['4%', 4],
  ['0%', 0],
  ['4', '4'],
  ['', ''],
];

const currencyData = [
  [4, '$4.00'],
  [4.0, '$4.00'],
  [4000, '$4,000.00'],
  ['$4.00', '$4.00'],
  ['4', '$4.00'],
  ['4.00', '$4.00'],
  ['$1,000.00', '$1,000.00'],
  ['$1,000', '$1,000.00'],
  ['1,000', '$1,000.00'],
];

const currencyData2 = [
  ['$4.00', 4.0],
  ['$4', 4.0],
  ['4.00', 4],
  ['4', 4],
  [4, 4],
  ['$1,320.00', 1320.0],
];

describe('formats date strings to display date strings', () => {
  each(dateData).test('%s --> %s', (first, second) => {
    expect(formFormatter(first, ['date'])).toEqual(second);
  });
  it('raises error when a number is passed', () => {
    expect(() => formFormatter(4, ['date'])).toThrow();
  });
  it('raises error when a boolean is passed', () => {
    expect(() => formFormatter(true, ['date'])).toThrow();
  });
  it('raises error when a object is passed', () => {
    expect(() => formFormatter({ test: true }, ['date'])).toThrow();
  });
});

describe('formats display date strings to date strings', () => {
  each(dateData.slice(0, 4)).test('%s <-- %s', (first, second) => {
    expect(formFormatter(second, ['date'], false)).toEqual(first);
  });
  it('does not format timestamps', () => {
    expect(formFormatter('1418803200000', ['date'], false)).toEqual(
      '1418803200000'
    );
  });
});

describe('formats percent values to display percent strings', () => {
  each(percentData).test('%s --> %s', (first, second) => {
    expect(formFormatter(first, ['percent'])).toEqual(second);
  });
});
describe('formats display percent strings to percent values', () => {
  each(percentData2).test('%s --> %s', (first, second) => {
    expect(formFormatter(first, ['percent'], false)).toEqual(second);
  });
});

describe('formats values to display currency strings', () => {
  each(currencyData).test('%s --> %s', (first, second) => {
    expect(formFormatter(first, ['currency'])).toEqual(second);
  });
});

describe('formats display currency strings to currency values', () => {
  each(currencyData2).test('%s --> %s', (first, second) => {
    expect(formFormatter(first, ['currency'], false)).toEqual(second);
  });
});
