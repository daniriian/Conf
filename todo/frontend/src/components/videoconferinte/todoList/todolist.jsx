import React, { useState, useEffect } from 'react';
// import Todo from '../../components/videoconferinte/todo/todo';
import Todo from '../todo/todo';
import { Table } from 'react-bootstrap';
import { format_data } from '../../../utils/utils';
import axios from 'axios';

const TodoList = ({ xdate, ...props }) => {
  const [todos, setTodos] = useState([]);
  const [hasChanged, setHasChanged] = useState(false);

  useEffect(() => {
    let url = '/api/todos';
    if (xdate) {
      url = url + '?data=' + format_data(xdate);
    }

    const sendGetRequest = async () => {
      const response = await axios.get(url);
      return response;
    };

    sendGetRequest()
      .then((res) => setTodos(res.data, res.status))
      .then(() => setHasChanged(false))
      .catch((err) => console.log(err));

    // getData(myCallback, 'GET', url);
  }, [hasChanged, props.refresh, xdate]);

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
          let fdata = new Date(item.data).toLocaleDateString('ro-RO');
          return (
            <Todo
              todo_id={item.id}
              ora_start={item.start_time}
              ora_stop={item.end_time}
              data={fdata}
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
