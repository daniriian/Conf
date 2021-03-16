// gets data in dd.mm.yyyy format and returns same data in YYYY-MM-DD format
// to be used in axios methods
export const format_data = (data) => {
  console.log(data);
  let sd = data.split('.');
  let YMD_Date = sd[2] + '-' + sd[1] + '-' + sd[0];
  console.log(YMD_Date);
  return YMD_Date;
};

export const isResponseOk = (response) => {
  if (response.status >= 200 && response.status <= 299) {
    return response.json();
  } else {
    throw Error(response.statusText);
  }
};
