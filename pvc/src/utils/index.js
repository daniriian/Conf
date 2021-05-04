export const format_date = (date) => {
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  let formated_date = dd + "/" + mm + "/" + yyyy;
  return formated_date;
};
