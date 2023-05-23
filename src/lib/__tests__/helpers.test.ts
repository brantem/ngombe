import { calcPercentage } from 'lib/helpers';

test('calcPercentage', () => {
  expect(calcPercentage(10, 20)).toEqual(50);
  expect(calcPercentage(10, 30)).toEqual(33);
});
