import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import CallersList from '../callersList/callersList';
import DateTimeSelector from '../dateTimeSelector/dateTimeSelector';
import CallTolist from '../callToList/call_to_list';
import axios from 'axios';

const AddModifyForm = (props) => {
  const [step, setStep] = useState(0);
  const [todo, setTodo] = useState({
    caller: '',
    data: '',
    start_time: '',
    end_time: '',
    call_to: [],
    completed: false,
    adaugat_de: 6,
  });

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
      console.log('Adaug Todo');
      const newTodo = { ...todo };
      newTodo.data = newTodo.data.toISOString().substring(0, 10);
      addTodo(newTodo)
        .then((status) => {
          console.log(status);
          if (status === 201) {
            props.onClose();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleBackBtn = () => {
    setStep(step - 1);
  };

  useEffect(() => {
    console.log('Mounting AddModifyForm', todo);

    return () => {
      console.log('cleaning up AddModifyForm');
    };
  }, [todo]);

  const handleOnChangeCaller = (id) => {
    const newTodo = { ...todo };
    newTodo.caller = +id;
    setTodo(newTodo);
  };

  const handleGetDateStartTimeEndTime = (param) => {
    const newTodo = { ...todo };
    const key = Object.keys(param)[0];
    newTodo[key] = Object.values(param)[0];
    console.log(newTodo);
    setTodo(newTodo);
  };

  const handleChange = (dest) => {
    console.log(dest);
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
