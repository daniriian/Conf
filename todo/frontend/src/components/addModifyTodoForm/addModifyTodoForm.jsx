import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';

import CallersList from '../callersList/callersList';
import DateTimeSelector from '../dateTimeSelector/dateTimeSelector';
import CallTolist from '../callToList/call_to_list'

const AddModifyForm = (props) => {
  const [step, setStep] = useState(0);
  const [todo, setTodo] = useState({
    caller: '',
    data: '',
    ora_start: '',
    ora_stop: '',
    call_to: [],
  });

  const handle_NextAddModifyBtn = () => {
    if (step < 2) {
      setStep(step + 1);
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
    newTodo.caller = id;
    setTodo(newTodo);
  };

  const handleGetDateStartTimeEndTime = (param) => {
    const newTodo = { ...todo }
    const key = (Object.keys(param)[0])
    newTodo[key] = (Object.values(param)[0])
    console.log(newTodo)
    setTodo(newTodo)
  }

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
            ora_start={todo.ora_start}
            ora_stop={todo.ora_stop}
          />
        ) : (
              <div>
                <p>Aici vine lista de call_to</p>
                <CallTolist />
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
