import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { citiesApi } from './api/citiesApi';
import './App.css';

import FilterInput from './components/FilterInput';
import { setFilter } from './store/citiesSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    citiesApi.fetchCities();
  }, []);

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
