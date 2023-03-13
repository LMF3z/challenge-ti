export const showDateAndHoursFromISOString = (date: Date): string => {
  const newDateISO = new Date(date).toISOString();
  const newDate =
    newDateISO.split('T')[0] + ' ' + newDateISO.split('T')[1].split('.')[0];
  return newDate;
};
