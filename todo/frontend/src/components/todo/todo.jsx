import React from 'react';
import { Form } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button'

const format_data = (data) => {
  let sd = data.split('-');
  let YMD_Date = sd[2] + '.' + sd[1] + '.' + sd[0];
  return YMD_Date;
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
            <Form.Check.Input type="checkbox" checked={props.efectuat} />
          </Form.Check>
        </div>

      </td>
      <td>
        <div>
          {props.adaugat_de}
        </div>
        <div>{props.user_location}</div>
      </td>    {/* Adaugat de */}
      <td><Button variant="primary">Modifică</Button></td>    {/* Buton modifica */}
      <td><Button variant="danger">Şterge</Button></td>    {/* Buton sterge */}
    </tr>
  );
};

export default Todo;
