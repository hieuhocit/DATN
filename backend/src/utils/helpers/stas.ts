// Helper function for calculating percentage change
export const calculatePercentChange = (
  currentValue: number,
  previousValue: number
): number => {
  if (previousValue === 0) return currentValue > 0 ? 100 : 0;
  return Math.round(((currentValue - previousValue) / previousValue) * 100);
};

// Helper function to get date ranges
export const getDateRanges = () => {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();

  // For current week/previous week calculation
  const today = now.getDate();
  const dayOfWeek = now.getDay() || 7; // Convert Sunday (0) to 7

  const currentWeekStart = new Date(now);
  currentWeekStart.setDate(today - dayOfWeek + 1);
  currentWeekStart.setHours(0, 0, 0, 0);

  const previousWeekStart = new Date(currentWeekStart);
  previousWeekStart.setDate(previousWeekStart.getDate() - 7);

  const previousWeekEnd = new Date(currentWeekStart);
  previousWeekEnd.setDate(previousWeekEnd.getDate() - 1);
  previousWeekEnd.setHours(23, 59, 59, 999);

  return {
    currentWeekStart,
    previousWeekStart,
    previousWeekEnd,
    currentYear,
  };
};

// Helper to format month name in Vietnamese
export const getMonthName = (month: number): string => {
  return `Tháng ${month + 1}`;
};
