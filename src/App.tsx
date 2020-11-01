import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import throttle from 'lodash.throttle';

import './App.css';
import { setFilter, filterSelector, fetchCities } from './store/citiesSlice';
import FilterInput from './components/FilterInput';
import FilteredCitiesList from './components/FilteredCitiesList';

function App() {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);

  useEffect(() => {
    dispatch(fetchCities({ offset: 0, limit: 10, filter }));
  }, [filter, dispatch]);

  // eslint-disable-next-line
  const onFilterChanged = useCallback(
    throttle((filter: string) => dispatch(setFilter(filter)), 500),
    []
  );

  return (
    <div>
      <h1>Favorite Cities App</h1>
      <FilterInput onFilterChanged={onFilterChanged} />
      <FilteredCitiesList />
    </div>
  );
}

export default App;
