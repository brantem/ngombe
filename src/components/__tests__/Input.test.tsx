import { render } from '@testing-library/react';
import '@testing-library/jest-dom';

import Input from 'components/Input';

test('Input', () => {
  const { container } = render(<Input label="Label" />);
  expect(container).toMatchSnapshot();
});
