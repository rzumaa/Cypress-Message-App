import React from 'react';
import { render } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect';
import Login from 'pages/Login/Login';

test('renders component', async => {
  const { getByText } = render(<Login />);
  expect(getByText('Zaloguj się!')).toBeInTheDocument();
});
