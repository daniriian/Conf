import React from 'react';

const format_data = (data) => {
  return data;
};

const Todo = (props) => {
  let ora_start = props.ora_start.substr(0, 5);
  let ora_stop = props.ora_stop.substr(0, 5);
  return (
    <tr>
      <td>{ora_start}</td>
      <td>{ora_stop}</td>
      <td>{format_data(props.data)}</td>
      <td>{props.caller}</td>
      <td>
        <table>
          <tbody>
            {props.destinatar.map((dest, index) => {
              return (
                <tr key={index}>
                  <td>{dest.nume}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </td>
    </tr>
  );
};

export default Todo;
