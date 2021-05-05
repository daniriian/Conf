export const format_date = (date) => {
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  let ddmmyyyy = dd + "/" + mm + "/" + yyyy;
  let yyyymmdd = yyyy + "-" + mm + "-" + dd;
  return { ddmmyyy: ddmmyyyy, yyyymmdd: yyyymmdd };
};
