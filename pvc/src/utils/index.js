export const format_date = (date) => {
  console.log(
    "*****************************************************************************",
    date
  );
  let dd = String(date.getDate()).padStart(2, "0");
  let mm = String(date.getMonth() + 1).padStart(2, "0"); //January is 0!
  let yyyy = date.getFullYear();

  let ddmmyyyy = dd + "." + mm + "." + yyyy;
  let yyyymmdd = yyyy + "-" + mm + "-" + dd;
  return { ddmmyyyy: ddmmyyyy, yyyymmdd: yyyymmdd };
};

export const getNextHalfHour = (time) => {
  let year = time.getFullYear();
  let month = time.getMonth();
  let day = time.getDate();
  let hour = time.getHours();
  let minutes = time.getMinutes();

  if (minutes < 30) {
    minutes = 30;
  } else {
    minutes = 0;
    if (hour < 23) {
      hour++;
    } else {
      hour = 0;
    }
  }

  let nextHour = new Date(year, month, day, hour, minutes);

  return nextHour;
};
