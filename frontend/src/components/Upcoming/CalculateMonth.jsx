export const getDurationInMonths = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const months =
    (end.getFullYear() - start.getFullYear()) * 12 +
    (end.getMonth() - start.getMonth());

  return `${months} Months`;
};
