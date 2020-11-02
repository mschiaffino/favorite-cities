import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import throttle from 'lodash.throttle';
import { Box } from '@material-ui/core';

import './App.css';
import {
  setFilter,
  filterSelector,
  fetchCities,
  fetchPreferred,
} from './store/citiesSlice';
import FilterInput from './components/FilterInput';
import FilteredCitiesList from './components/FilteredCitiesList';

function App() {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);

  useEffect(() => {
    dispatch(fetchCities({ offset: 0, limit: 50, filter }));
  }, [filter, dispatch]);

  useEffect(() => {
    dispatch(fetchPreferred());
  }, [dispatch]);

  // eslint-disable-next-line
  const onFilterChanged = useCallback(
    throttle((filter: string) => dispatch(setFilter(filter)), 500),
    []
  );

  return (
    <Box margin={3} width={500}>
      <h1>Favorite Cities App</h1>
      <Box marginBottom={1}>
        <FilterInput onFilterChanged={onFilterChanged} />
      </Box>
      <FilteredCitiesList />
    </Box>
  );
}

export default App;
