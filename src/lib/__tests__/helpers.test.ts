import { calcPercentage } from 'lib/helpers';

test('calcPercentage', () => {
  expect(calcPercentage(0, 10)).toEqual(0);
  expect(calcPercentage(10, 0)).toEqual(0);
  expect(calcPercentage(10, 20)).toEqual(50);
  expect(calcPercentage(10, 30)).toEqual(33);
});
