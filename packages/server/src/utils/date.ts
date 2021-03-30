export const generateDateStr = (timeStamp: number): string => {
  const date = new Date(timeStamp);
  const dateStr =
    ('00' + date.getDate()).slice(-2) +
    '/' +
    ('00' + (date.getMonth() + 1)).slice(-2) +
    '/' +
    date.getFullYear() +
    ' ' +
    ('00' + date.getHours()).slice(-2) +
    ':' +
    ('00' + date.getMinutes()).slice(-2);

  return dateStr;
};
