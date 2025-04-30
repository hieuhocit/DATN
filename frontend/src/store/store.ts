// Redux
import { configureStore } from "@reduxjs/toolkit";

// Reduces
import { themeReducer } from "@features/theme/index";
import { accountReducer } from "@features/account/index";
import { cartReducer } from "@features/cart/index";

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    account: accountReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
