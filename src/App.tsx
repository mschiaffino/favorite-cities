import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.css';
import { citiesApi } from './api/citiesApi';
import { setFilter, filterSelector } from './store/citiesSlice';
import FilterInput from './components/FilterInput';

function App() {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);

  useEffect(() => {
    citiesApi.fetchCities(0, 10, filter);
  }, [filter]);

  const onFilterChanged = (filter: string) => {
    dispatch(setFilter(filter));
  };

  return (
    <div>
      <h1>Favorite Cities App</h1>
      <FilterInput onFilterChanged={onFilterChanged} />
    </div>
  );
}

export default App;
