// Redux
import { RootState } from "@/store/store";
import { createSelector } from "@reduxjs/toolkit";

const accountSelector = (state: RootState) => state.account;

const isLoggedInSelector = createSelector(
  accountSelector,
  (account) => account.isLoggedIn
);

const userSelector = createSelector(accountSelector, (account) => account.user);

const enrollmentsSelector = createSelector(
  accountSelector,
  (account) => account.enrollments
);

export {
  accountSelector,
  isLoggedInSelector,
  userSelector,
  enrollmentsSelector,
};
