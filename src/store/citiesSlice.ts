import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';
import { citiesApi } from '../api/citiesApi';
import { ApiResponse, CityInfo } from '../types';

const sliceName = 'cities';

export type CitiesSliceState = {
  filter: string;
  filteredResults: {
    [filter: string]: {
      geoNameIds: number[];
      total: number;
    };
  };
  cities: { [geoNameId: number]: CityInfo };
  preferred: { [geoNameId: number]: boolean };
  loadingPreferred: boolean;
};

export const initialState: CitiesSliceState = {
  filter: '',
  filteredResults: {},
  cities: {},
  preferred: {},
  loadingPreferred: false,
};

// #region Async thunks

export const fetchCities = createAsyncThunk(
  `${sliceName}/fetchCities`,
  async ({
    offset,
    limit,
    filter,
  }: {
    offset: number;
    limit: number;
    filter?: string;
  }) => {
    const response = await citiesApi.fetchCities(offset, limit, filter);
    return Promise.resolve({ offset, filter: filter || '', response });
  }
);

export const fetchPreferred = createAsyncThunk(
  `${sliceName}/fetchPreferred`,
  citiesApi.fetchPreferred
);

export const patchPreferred = createAsyncThunk(
  `${sliceName}/patchPreferred`,
  async ({ geoNameId, value }: { geoNameId: number; value: boolean }) => {
    await citiesApi.patchPreferred(geoNameId, value);
    return Promise.resolve({
      geoNameId,
      value,
    });
  }
);

// #endregion Async thunks

// #region Reducers

// Redux toolkit uses Immer library internally, which lets us write code that
// "mutates" some data, but actually applies the updates immutably. We do not
// need to return the state in the combineReducers, but it´s done
// to simplify unit testing

export const setFilterReducer = (
  state: CitiesSliceState,
  action: PayloadAction<string>
): CitiesSliceState => {
  state.filter = action.payload;
  return state;
};

export const fetchCitiesFulfilledReducer = (
  state: CitiesSliceState,
  action: PayloadAction<{
    offset: number;
    filter: string;
    response: ApiResponse;
  }>
): CitiesSliceState => {
  const { offset, filter } = action.payload;
  const { data, total } = action.payload.response;
  const lowerCaseFilter = filter.toLowerCase();

  if (!state.filteredResults[lowerCaseFilter]) {
    state.filteredResults[lowerCaseFilter] = {
      geoNameIds: [],
      total,
    };
  }
  data.forEach((city: CityInfo, index: number) => {
    state.cities[city.geonameid] = city;
    state.filteredResults[lowerCaseFilter].geoNameIds[index + offset] =
      city.geonameid;
  });

  return state;
};

export const fetchPreferredPendingReducer = (
  state: CitiesSliceState,
  action: any
) => {
  state.loadingPreferred = true;
  return state;
};

export const fetchPreferredFulfilledReducer = (
  state: CitiesSliceState,
  action: any
) => {
  const { data } = action.payload;
  for (const geoNameId of data) {
    state.preferred[geoNameId] = true;
  }
  state.loadingPreferred = false;
  return state;
};

export const patchPreferredFulfilledReducer = (
  state: CitiesSliceState,
  action: any
) => {
  const { geoNameId, value } = action.payload;
  state.preferred[geoNameId] = value;
  return state;
};

// #endregion Reducers

export const citiesSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: setFilterReducer,
  },
  extraReducers: {
    [fetchCities.fulfilled.toString()]: fetchCitiesFulfilledReducer,
    [fetchPreferred.pending.toString()]: fetchPreferredPendingReducer,
    [fetchPreferred.fulfilled.toString()]: fetchPreferredFulfilledReducer,
    [patchPreferred.fulfilled.toString()]: patchPreferredFulfilledReducer,
  },
});

// #region Action creators

export const { setFilter } = citiesSlice.actions;

// #endregion Action creators

// #region Selectors

export const filterSelector = (rootState: RootState) =>
  rootState[sliceName].filter;

export const totalSelector = (rootState: RootState) => {
  const currentFilter = rootState[sliceName].filter;
  return rootState[sliceName].filteredResults[currentFilter]?.total;
};

export const filteredResultsSelector = (rootState: RootState) => {
  const currentFilter = rootState[sliceName].filter;
  return rootState[sliceName].filteredResults[currentFilter]?.geoNameIds;
};

export const cityByIndexSelector = (index: number) => (
  rootState: RootState
) => {
  const geoNameId = filteredResultsSelector(rootState)[index];
  return rootState[sliceName].cities[geoNameId];
};

export const isPreferredSelector = (geoNameId: number) => (
  rootState: RootState
) => (geoNameId && rootState[sliceName].preferred[geoNameId]) || false;

export const preferredCitiesIdsSelector = (rootState: RootState) => {
  const { preferred } = rootState[sliceName];
  return Object.keys(preferred)
    .map((k) => parseInt(k, 10))
    .filter((k) => preferred[k]);
};

export const loadingPreferredSelector = (rootState: RootState) =>
  rootState[sliceName].loadingPreferred;

// #endregion Selectors
