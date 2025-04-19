// Redux
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

const accountSelector = (state: RootState) => state.account;

const isLoggedInSelector = createSelector(
  accountSelector,
  (account) => account.isLoggedIn
);

const userSelector = createSelector(accountSelector, (account) => account.user);

export { accountSelector, isLoggedInSelector, userSelector };
