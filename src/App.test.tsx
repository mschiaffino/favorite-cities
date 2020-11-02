import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';

import App from './App';
import { store } from './store';

test('renders app outer box', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const appOuterBox = screen.getByTestId('app-outer-box');
  expect(appOuterBox).toBeInTheDocument();
});
