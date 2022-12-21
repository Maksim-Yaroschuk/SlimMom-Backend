const isFutureDate = (date) => {
  const inputDay = new Date(date).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);

  return inputDay > today;
};

module.exports = isFutureDate;
