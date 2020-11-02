import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import throttle from 'lodash.throttle';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import './App.css';
import {
  setFilter,
  filterSelector,
  fetchCities,
  fetchPreferred,
  loadingPreferredSelector,
} from './store/citiesSlice';
import FilterInput from './components/FilterInput';
import FilteredCitiesList from './components/FilteredCitiesList';
import PreferedCitiesList from './components/PreferedCitiesList';

function App() {
  const dispatch = useDispatch();
  const filter = useSelector(filterSelector);
  const loadingPreferred = useSelector(loadingPreferredSelector);

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
    <Box display="flex" marginY={3} flexWrap="wrap" data-testid="app-outer-box">
      <Box margin={3} width={500}>
        <Box marginBottom={1}>
          <FilterInput onFilterChanged={onFilterChanged} />
        </Box>
        <FilteredCitiesList />
      </Box>
      <Box margin={3} flexGrow={1}>
        <Box marginBottom={1}>
          <Box display="flex" alignItems="center">
            <Typography variant="h3">Your favorite cities</Typography>
            {loadingPreferred && (
              <Box marginLeft={2}>
                <CircularProgress size={20} />
              </Box>
            )}
          </Box>
        </Box>
        <Box maxHeight={300} overflow="auto">
          <PreferedCitiesList />
        </Box>
      </Box>
    </Box>
  );
}

export default App;
