const numberific = require('./numberific');

test('integer with no options returns integer as string', () => {
  expect(numberific(1)).toBe('1');
  expect(numberific(10)).toBe('10');
  expect(numberific(42)).toBe('42');
});

test('float with no options returns float as string', () => {
  expect(numberific(1.0)).toBe('1');
  expect(numberific(10.0)).toBe('10');
  expect(numberific(42.21)).toBe('42.21');
});

test('default decimal separator', () => {
  expect(numberific(1.1)).toBe('1.1');
  expect(numberific(1.01)).toBe('1.01');
  expect(numberific(1.001)).toBe('1.001');
  expect(numberific(1.0001)).toBe('1.0001');
});

test('custom decimal separator', () => {
  expect(numberific(42.21, { separator: '.' })).toBe('42.21');
  expect(numberific(42.21, { separator: ',' })).toBe('42,21');
  expect(numberific(42.21, { separator: '😀' })).toBe('42😀21');
});

test('default thousands delimiter', () => {
  expect(numberific(1)).toBe('1');
  expect(numberific(10)).toBe('10');
  expect(numberific(100)).toBe('100');
  expect(numberific(1000)).toBe('1,000');
  expect(numberific(10000)).toBe('10,000');
  expect(numberific(100000)).toBe('100,000');
  expect(numberific(1000000)).toBe('1,000,000');
  expect(numberific(10000000)).toBe('10,000,000');
  expect(numberific(100000000)).toBe('100,000,000');
  expect(numberific(1000000000)).toBe('1,000,000,000');
});

test('custom thousands delimiter', () => {
  expect(numberific(1000, { delimiter: '.' })).toBe('1.000');
  expect(numberific(1000, { delimiter: '😀' })).toBe('1😀000');
});

test('delimits thousands only for numbers bigger than minimum length', () => {
  expect(numberific(1, { minBeforeApplyingDelimiter: 10000 })).toBe('1');
  expect(numberific(10, { minBeforeApplyingDelimiter: 10000 })).toBe('10');
  expect(numberific(100, { minBeforeApplyingDelimiter: 10000 })).toBe('100');
  expect(numberific(1000, { minBeforeApplyingDelimiter: 10000 })).toBe('1000');
  expect(numberific(10000, { minBeforeApplyingDelimiter: 10000 })).toBe('10,000');
  expect(numberific(100000, { minBeforeApplyingDelimiter: 10000 })).toBe('100,000');
});

test('precision behavior when rounding', () => {
  expect(numberific(1.23456789, { precision: 0 })).toBe('1');
  expect(numberific(1.23456789, { precision: 1 })).toBe('1.2');
  expect(numberific(1.23456789, { precision: 2 })).toBe('1.23');
  expect(numberific(1.23456789, { precision: 5 })).toBe('1.23457');

  expect(numberific(1, { precision: 1 })).toBe('1.0');
  expect(numberific(1, { precision: 2 })).toBe('1.00');
});

