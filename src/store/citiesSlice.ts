import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '.';
import { citiesApi } from '../api/citiesApi';
import { ApiResponse, CityInfo } from '../types';

const sliceName = 'cities';

type citiesSliceState = {
  filter: string;
  filteredResults: {
    [filter: string]: {
      geoNameIds: number[];
      total: number;
    };
  };
  cities: { [geoNameId: number]: CityInfo };
};

export const initialState: citiesSliceState = {
  filter: '',
  filteredResults: {},
  cities: {},
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

// #endregion Async thunks

// #region Reducers

// Redux toolkit uses Immer library internally, which lets us write code that
// "mutates" some data, but actually applies the updates immutably. We do not
// need to return the state in the combineReducers, but it´s done
// to simplify unit testing

export const setFilterReducer = (
  state: citiesSliceState,
  action: PayloadAction<string>
): citiesSliceState => {
  state.filter = action.payload;
  return state;
};

export const fetchCitiesFulfilledReducer = (
  state: citiesSliceState,
  action: PayloadAction<{
    offset: number;
    filter: string;
    response: ApiResponse;
  }>
): citiesSliceState => {
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

// #endregion Reducers

export const citiesSlice = createSlice({
  name: sliceName,
  initialState,
  reducers: {
    setFilter: setFilterReducer,
  },
  extraReducers: {
    [fetchCities.fulfilled.toString()]: fetchCitiesFulfilledReducer,
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

// #endregion Selectors
