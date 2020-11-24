import React, { useState, useEffect } from 'react';
import Todo from '../todo/todo';
import { getTodos } from '../../utils/utils';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setTodos(response, status);
      }
    };
    getTodos(myCallback);
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Ora Start</th>
          <th>Ora Stop</th>
          <th>Data</th>
          <th>Apelant</th>
          <th>Destinatar(i)</th>
          <th>Efectuat</th>
          <th>Adaugată de</th>
          <th>Modifică</th>
          <th>Şterge</th>
        </tr>
      </thead>
      <tbody>
        {todos.map((item, index) => {
          console.log(typeof item.data);
          return (
            <Todo
              ora_start={item.start_time}
              ora_stop={item.end_time}
              data={item.data}
              caller={item.caller}
              destinatar={item.call_to}
              key={index}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default TodoList;
