import React from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './todo.scss';

// import { format_data } from '../../utils/utils';

const Todo = (props) => {
  const history = useHistory();

  let ora_start = props.ora_start.substr(0, 5);
  let ora_stop = props.ora_stop.substr(0, 5);

  const handleDelete = (e, todo_id) => {
    e.preventDefault();
    //send delete request
    axios
      .delete(
        'http://127.0.0.1:8000/api/todos/delete/',
        { data: { id: todo_id } },
        { headers: { 'Content-Type': 'application/json' } }
      )
      .then((response) => {
        response.status === 200 ? props.onDelete() : console.log('Nu e 200');
      });
  };

  const handleCheckChange = () => {};

  const handleModificaTodo = (todo_id) => {
    //voi returna un obiect care sa contina todo de modificat
    props.onModifica(todo_id);
  };

  const handleRowClick = (e, todo_id) => {
    e.preventDefault();
    history.push('/videoconferinte/detalii/' + todo_id);
  };

  return (
    <tr>
      <td>{props.data}</td>
      <td>
        {ora_start} - {ora_stop}
      </td>
      {/* <td>{ora_stop}</td> */}
      <td>
        {props.caller}
        <div className="caller">
          <a href="/" onClick={(e) => handleRowClick(e, props.todo_id)}>
            detalii
          </a>
        </div>
      </td>
      <td>
        <Table striped bordered hover size="sm">
          <tbody>
            {props.destinatar.map((dest, index) => {
              return (
                <tr key={index}>
                  <td>{dest.nume}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </td>
      <td>
        <div className="mb-3">
          <Form.Check type="checkbox" isValid>
            <Form.Check.Input
              type="checkbox"
              checked={props.efectuat}
              onChange={handleCheckChange}
            />
          </Form.Check>
        </div>
      </td>
      <td>
        <div>{props.adaugat_de}</div>
        <div>{props.user_location}</div>
      </td>
      {/* Adaugat de */}
      <td>
        <Button
          variant="primary"
          onClick={() => handleModificaTodo(props.todo_id)}
        >
          Modifică
        </Button>
      </td>
      {/* Buton modifica */}
      <td>
        <Button
          variant="danger"
          onClick={(e) => handleDelete(e, props.todo_id)}
        >
          Şterge {props.todo_id}
        </Button>
      </td>
      {/* Buton sterge */}
    </tr>
  );
};

export default Todo;
