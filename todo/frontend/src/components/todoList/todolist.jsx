import React, { useState, useEffect } from 'react';
import Todo from '../todo/todo';
import { getData } from '../../utils/utils';
import { Table } from 'react-bootstrap';

const TodoList = ({ ...props }) => {
  const [todos, setTodos] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setTodos(response, status);
        setHasChanged(false);
      }
    };
    getData(myCallback, 'GET', 'http://127.0.0.1:8000/api/todos/');
  }, [hasChanged, props.refresh]);

  const handleOnDelete = () => {
    setHasChanged(true);
  };

  const handleModifica = (id) => {
    const selected_todo = todos.filter((todo) => todo.id === id)[0];
    props.modifica(selected_todo);
  };

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>Data</th>
          <th>Interval orar</th>
          {/* <th>Ora Stop</th> */}
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
              todo_id={item.id}
              ora_start={item.start_time}
              ora_stop={item.end_time}
              data={item.data}
              caller={item.caller.id_echipament.nume}
              destinatar={item.call_to}
              efectuat={item.completed}
              adaugat_de={item.adaugat_de.nume + ' ' + item.adaugat_de.prenume}
              user_location={item.adaugat_de.instanta.nume}
              key={index}
              onDelete={handleOnDelete}
              onModifica={handleModifica}
            />
          );
        })}
      </tbody>
    </Table>
  );
};

export default TodoList;
