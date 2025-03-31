// Redux
import { configureStore } from '@reduxjs/toolkit';

// Reduces
import { themeReducer } from '@features/theme/index';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
