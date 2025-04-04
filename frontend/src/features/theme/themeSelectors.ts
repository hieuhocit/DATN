// Redux
import { RootState } from '@/store/store';
import { createSelector } from '@reduxjs/toolkit';

const themeSelector = (state: RootState) => state.theme;
const themeModeSelector = createSelector(themeSelector, (theme) => theme.mode);

export { themeSelector, themeModeSelector };
