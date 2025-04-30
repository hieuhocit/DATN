// Redux
import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

const cartSelector = (state: RootState) => state.cart;

const coursesInCartSelector = createSelector(
  cartSelector,
  (cart) => cart.courses
);

export { coursesInCartSelector, cartSelector };
