export const getDate = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDate();
  const month = currentDate.getMonth() + 1;
  const year = currentDate.getFullYear();

  const formattedDay = day < 10 ? '0' + day : day;
  const formattedMonth = month < 10 ? '0' + month : month;

  const formattedDate = formattedDay + '/' + formattedMonth + '/' + year;
  return formattedDate;
};
