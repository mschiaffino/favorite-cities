import { configureStore } from '@reduxjs/toolkit';

import { citiesSlice } from './citiesSlice';

export const store = configureStore({
  reducer: {
    [citiesSlice.name]: citiesSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
