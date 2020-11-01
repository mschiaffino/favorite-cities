import { filterSelector, setFilterReducer } from './citiesSlice';

describe('citiesSlice', () => {
  describe('setFilterReducer', () => {
    test('should set filter', () => {
      const initialState = { filter: '' };
      const actionPayload = { type: 'setFilter', payload: 'Argentina' };

      const updatedState = setFilterReducer(initialState, actionPayload);

      expect(updatedState).toEqual({ filter: 'Argentina' });
    });
  });

  describe('filterSelector', () => {
    test('should return filter value', () => {
      const rootState = { cities: { filter: 'Buenos Aires' } };

      expect(filterSelector(rootState)).toBe('Buenos Aires');
    });
  });
});
