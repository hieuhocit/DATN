import {
  themeModeSelector,
  toggleTheme as changeThemeMode,
} from '@/features/theme';
import { useAppDispatch, useAppSelector } from './useStore';

export const useTheme = () => {
  const theme = useAppSelector(themeModeSelector);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(changeThemeMode());
  };

  return {
    theme,
    toggleTheme,
  };
};
