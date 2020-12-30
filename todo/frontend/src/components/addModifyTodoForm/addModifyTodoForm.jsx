import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';

import CallersList from '../callersList/callersList';
import DateTimeSelector from '../dateTimeSelector/dateTimeSelector';
import CallTolist from '../callToList/call_to_list';
import axios from 'axios';

const AddModifyForm = (props) => {
  const [step, setStep] = useState(0);
  const [todo, setTodo] = useState(props.todo);

  const postUrl = 'http://127.0.0.1:8000/api/todos/create/';

  const addTodo = async (todo) => {
    const res = await axios.post(postUrl, todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.status;
  };

  const handle_NextAddModifyBtn = () => {
    if (step < 2) {
      setStep(step + 1);
    } else if (step === 2) {
      if (props.actionType === 'ADD') {
        const newTodo = { ...todo };
        // newTodo.data = newTodo.data.toISOString().substring(0, 10);
        addTodo(newTodo)
          .then((status) => {
            if (status === 201) {
              props.onClose();
            }
          })
          .catch((err) => console.log(err));
      } else if (props.actionType === 'MODIFY') {
        console.log('Todo de modificat: ', todo);
        axios
          .put('http://localhost:8000/api/todos/' + todo.id, todo, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then((response) => console.log(response))
          .then(() => props.onClose())
          .catch((err) => console.log(err));
      }
    }
  };

  const handleBackBtn = () => {
    setStep(step - 1);
  };

  const handleOnChangeCaller = (id) => {
    const newTodo = { ...todo };
    newTodo.caller = +id;
    setTodo(newTodo);
  };

  const handleGetDateStartTimeEndTime = (param) => {
    const newTodo = { ...todo };
    const key = Object.keys(param)[0];
    newTodo[key] = Object.values(param)[0];
    setTodo(newTodo);
  };

  const handleChange = (dest) => {
    const newTodo = { ...todo };
    newTodo.call_to = dest;
    setTodo(newTodo);
  };

  return (
    <Modal
      show={true}
      onHide={props.onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.actionType === 'ADD' ? 'Adauga' : 'Modifica'} videoconferinta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 0 ? (
          <CallersList
            currentCaller={todo.caller}
            onChangeCaller={handleOnChangeCaller}
          />
        ) : step === 1 ? (
          <DateTimeSelector
            getDateStartTimeEndTime={handleGetDateStartTimeEndTime}
            data={todo.data}
            start_time={todo.start_time}
            end_time={todo.end_time}
          />
        ) : (
          <div>
            <p>Aici vine lista de call_to</p>
            <CallTolist
              selectedValues={todo.call_to}
              onChange={(dest) => handleChange(dest)}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Renunta
        </Button>
        {step > 0 ? (
          <Button variant="primary" onClick={handleBackBtn}>
            Inapoi
          </Button>
        ) : (
          ''
        )}
        <Button variant="primary" onClick={handle_NextAddModifyBtn}>
          {step === 2
            ? props.actionType === 'ADD'
              ? 'Adauga'
              : 'Modifica'
            : 'Inainte'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModifyForm;

//PUT REQUEST Format
// {
//     "caller": 2,
//     "start_time": "11:00:00",
//     "end_time": "12:20:00",
//     "data": "2020-10-30",
//     "call_to": [75, 65],
//     "completed": false,
//     "adaugat_de": 6
// }

// post format for adding todo
// [
//   {
//     id: 8,
//     caller: 1,
//     start_time: '08:50:00',
//     end_time: '10:00:00',
//     data: '2020-12-25',
//     call_to: [55, 65],
//     completed: false,
//     adaugat_de: 4,
//   },
// ];
