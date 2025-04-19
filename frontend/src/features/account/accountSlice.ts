// Redux
import { createSlice } from '@reduxjs/toolkit';

// Types
import { User } from '@/types';

export interface AccountState {
  isLoggedIn: boolean;
  user: User | null;
}

const initialState: AccountState = {
  isLoggedIn: false,
  user: null,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,
  reducers: {
    setAccountLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.user = action.payload;
    },
    setAccountLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.user = null;
    },
  },
});

export const { setAccountLoggedIn, setAccountLoggedOut } = themeSlice.actions;
export default themeSlice.reducer;
