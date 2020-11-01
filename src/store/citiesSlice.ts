import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type citiesSliceState = {
  filter: string;
};

const initialState: citiesSliceState = {
  filter: '',
};

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

export const citiesSlice = createSlice({
  name: 'cities',
  initialState,
  reducers: {
    setFilter: setFilterReducer,
  },
});

export const { setFilter } = citiesSlice.actions;
