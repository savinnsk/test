export const genBilletDueAt = () => {
  const now = new Date();
  const threeDaysAhead = new Date(now.setDate(now.getDate() + 3));
  return threeDaysAhead.toDateString();
};
