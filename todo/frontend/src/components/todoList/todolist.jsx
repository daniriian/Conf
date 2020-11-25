import React, { useState, useEffect } from 'react';
import Todo from '../todo/todo';
import { getTodos } from '../../utils/utils';
import { Table } from 'react-bootstrap';

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
    <Table striped bordered hover size="sm">
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
          return (
            <Todo
              ora_start={item.start_time}
              ora_stop={item.end_time}
              data={item.data}
              caller={item.caller}
              destinatar={item.call_to}
              efectuat={item.completed}
              key={index}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default TodoList;
