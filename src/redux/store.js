import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { contactsReducer } from './contactsSlice';
import { filterReducer } from './filterSlice';
import { contactsApi } from './contactsApi';

export const store = configureStore({
  reducer: {
    // contacts: contactsReducer,
    filter: filterReducer,
    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(contactsApi.middleware),
});
