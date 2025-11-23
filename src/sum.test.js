const sum = require('./sum');

test('adds 1+2 to get 3', () => {
  expect(sum(1, 2)).toBe(3);
});