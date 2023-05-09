import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './redusers';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// бібліотека persist
const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['filters'],
};
// бібліотека persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// запимуємо у стор 
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
