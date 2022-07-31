import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { filter } from './reduser';
import { contactsApi } from './api-service';

export const store = configureStore({
  reducer: { [contactsApi.reducerPath]: contactsApi.reducer, filter },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
  devTools: process.env.NODE_ENV === 'development',
});

setupListeners(store.dispatch);
