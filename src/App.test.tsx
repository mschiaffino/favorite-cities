import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import App from './App';
import { store } from './store';

test('renders title header', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const h1 = screen.getByText(/Favorite Cities App/i);
  expect(h1).toBeInTheDocument();
});
