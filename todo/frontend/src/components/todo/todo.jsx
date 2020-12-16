import React from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const format_data = (data) => {
  let sd = data.split('-');
  let YMD_Date = sd[2] + '.' + sd[1] + '.' + sd[0];
  return YMD_Date;
};

const Todo = (props) => {
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
        // console.log(response);
        response.status === 200 ? props.onDelete() : console.log('Nu e 200');
      });
  };


  const handleCheckChange = () => {
    console.log("Checked clicked")
  }

  return (
    <tr>
      <td>{ora_start}</td>
      <td>{ora_stop}</td>
      <td>{format_data(props.data)}</td>
      <td>{props.caller}</td>
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
            <Form.Check.Input type="checkbox" checked={props.efectuat} onChange={handleCheckChange} />
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
