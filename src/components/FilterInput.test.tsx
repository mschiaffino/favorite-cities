import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import FilterInput from './FilterInput';

describe('FilterInput', () => {
  test('should render the input', () => {
    render(<FilterInput onFilterChanged={jest.fn()} />);
    expect(screen.getByRole('textbox')).toBeDefined();
  });

  test('should trigger onFilterChanged', () => {
    const onFilterChanged = jest.fn();
    render(<FilterInput onFilterChanged={onFilterChanged} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Argentina' },
    });
    expect(onFilterChanged).toHaveBeenCalledWith('Argentina');
  });
});
