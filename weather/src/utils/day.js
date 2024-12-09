/**
 * based on the date string, return the day of the week
 */
export const getDayByDate = (dateString) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
};
