import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import DateTimeSelector from '../dateTimeSelector/dateTimeSelector';
import CallTolist from '../callToList/call_to_list';

import axios from 'axios';

const postUrl = 'http://127.0.0.1:8000/api/todos/create/';

const steps = {
  1: 'Apelant',
  2: 'Data si intervalul orar',
  3: 'Destinatar(i)',
};

const AddConferenceForm = ({ handleClose, visible, caller, selectedDate, startTime, endTime, callTo, ...props }) => {
  const [callersList, setCallersList] = useState([]);
  const [callerDataReady, setCallerDataReady] = useState(false);
  const [stepIndex, setStepIndex] = useState(1);


  const obj = {
    id: 0,
    caller: caller,
    start_time: startTime,
    end_time: endTime,
    data: selectedDate,
    call_to: callTo,
    completed: false,
    adaugat_de: 6,
  };

  const handleNext = () => {
    if (stepIndex < 3) {
      setStepIndex(stepIndex + 1);
    } else {
      obj.data = obj.data.toISOString().substring(0, 10);

      //sending post request to server at http://127.0.0.1:8000/api/todos/create/
      axios
        .post(postUrl, obj, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          return response.status;
        })
        .then((status) => {
          status === 201 ? props.handleVisible() : console.log('err');
        })
        .catch((err) => console.log(err));
    }
  };

  const handlePrev = () => {
    if (stepIndex > 1) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleCaller = (e) => {
    const callerId = +e.target.value;
    props.onSelectCallerChange(callerId)
  };

  // const handleRetrieveDate = (date) => {
  //   //todo
  //   //get data from form and send it to server
  //   console.log('-*-*-*-*-*-*-*', date);
  // };

  const handleGetDateStartTimeEndTime = (arr) => {
    props.onHandleGetDateStartTimeEndTime(arr)

  };



  useEffect(() => {
    //incarca lista de apelanti din bd utilizand axios
    axios
      .get('http://127.0.0.1:8000/api/todos/callers/')
      .then((response) => response.data)
      .then((data) => {
        // data.unshift(null)
        setCallersList(data);
        setCallerDataReady(true);
      })
      .catch((err) => alert(err));
    return () => {
      setStepIndex(1);
    };
  }, [visible]);

  return (
    <Modal
      show={visible}
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Adaugă Videoconferinţă</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>{steps[stepIndex]}</Form.Label>

            {stepIndex === 1 ? (
              callerDataReady ? (
                <Form.Control as="select" custom onChange={handleCaller}>
                  <option value={0}>Alegeti...</option>
                  {callersList.map((apelant, index) => {
                    return (
                      <option key={index} value={apelant.id}>
                        {apelant.id_echipament.nume}
                      </option>
                    );
                  })}
                </Form.Control>
              ) : (
                  <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                  </Spinner>
                )
            ) : stepIndex === 2 ? (
              //afisez form pentru data si interval orar
              <DateTimeSelector
                getDateStartTimeEndTime={handleGetDateStartTimeEndTime}
              />
            ) : (
                  <CallTolist
                    activeTerminals={callTo}
                    setActiveTerminals={props.getActiveTerminals}
                  />
                )}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Renunţă
        </Button>
        {stepIndex > 1 ? (
          <Button variant="primary" onClick={handlePrev}>
            Înapoi
          </Button>
        ) : (
            ''
          )}
        <Button variant="primary" onClick={handleNext}>
          {stepIndex === 3 ? 'Adaugă' : 'Înainte'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddConferenceForm;

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
