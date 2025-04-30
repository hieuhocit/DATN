// Redux
import { createSlice } from "@reduxjs/toolkit";

// Types
import { Course } from "@/types";

// Utils
import {
  getCartFromLocalStorage,
  saveCartToLocalStorage,
} from "@/utils/localStorage";

export interface CartState {
  courses: Course[];
}

const initialState: CartState = {
  courses: getCartFromLocalStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState: initialState,
  reducers: {
    addCourseToCart: (state, action) => {
      const course = action.payload;
      const existingCourse = state.courses.find((c) => c._id === course._id);
      if (existingCourse) {
        return;
      } else {
        state.courses.push({ ...course, quantity: 1 });
        saveCartToLocalStorage(state.courses);
      }
    },
    removeCourseFromCart: (state, action) => {
      const courseId = action.payload;
      state.courses = state.courses.filter((c) => c._id !== courseId);
      saveCartToLocalStorage(state.courses);
    },
    clearCart: (state) => {
      state.courses = [];
      saveCartToLocalStorage([]);
    },
    replaceCart: (state, action) => {
      state.courses = action.payload;
      saveCartToLocalStorage(state.courses);
    },
  },
});

export const { addCourseToCart, removeCourseFromCart, clearCart, replaceCart } =
  cartSlice.actions;
export default cartSlice.reducer;
