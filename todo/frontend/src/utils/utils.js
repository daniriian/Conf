// export const getData = (callback, method, url) => {
//   const xhr = new XMLHttpRequest();
//   //const method = 'GET'; // "POST"
//   //const url = 'http://127.0.0.1:8000/api/todos/';
//   const responseType = 'json';
//   xhr.responseType = responseType;
//   xhr.open(method, url);
//   xhr.onload = function () {
//     callback(xhr.response, xhr.status);
//   };
//   xhr.onerror = function (e) {
//     console.log(e);
//     callback({ message: 'the request was an error' }, xhr.status);
//   };
//   xhr.send();
// };

export const format_data = (data) => {
  let sd = data.split("-");
  let YMD_Date = sd[2] + "." + sd[1] + "." + sd[0];
  return YMD_Date;
};
