import React from 'react';
import './App.css';

import FilterInput from './components/FilterInput';

function App() {
  const onFilterChanged = (filter: string) => {
    console.log(filter);
  };
  return (
    <div>
      <h1>Favorite Cities App</h1>
      <FilterInput onFilterChanged={onFilterChanged} />
    </div>
  );
}

export default App;
