import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['auth/loginStart', 'auth/loginSuccess', 'auth/loginFailure', 'auth/logout'],
        ignoredActionPaths: ['meta.arg', 'payload.timestamp'],
        ignoredPaths: ['auth.error'],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

export default store;
