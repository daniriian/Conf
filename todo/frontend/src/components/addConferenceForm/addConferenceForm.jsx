import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import DateTimeSelector from '../dateTimeSelector/dateTimeSelector';
import CallTolist from '../callToList/call_to_list';

import axios from 'axios';

const steps = {
  1: 'Apelant',
  2: 'Data si intervalul orar',
  3: 'Destinatar(i)',
};

const AddConferenceForm = ({ handleClose, visible }) => {
  const [apelantiList, setApelantiList] = useState([]);
  const [callerDataReady, setCallerDataReady] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('08:10');
  const [stepIndex, setStepIndex] = useState(1);
  const [callTo, setCallTo] = useState([]);
  const [caller, setCaller] = useState(null);

  const handleNext = () => {
    if (stepIndex < 3) {
      setStepIndex(stepIndex + 1);
    } else {
      // console.log(
      //   'Apelanti=',
      //   caller,
      //   'Data=',
      //   selectedDate,
      //   'StartTime-',
      //   startTime,
      //   'EndTime=',
      //   endTime,
      //   'Lista Apelati=',
      //   callTo
      // );
    }
  };

  const handlePrev = () => {
    if (stepIndex > 1) {
      setStepIndex(stepIndex - 1);
    }
  };

  const handleCaller = (e) => {
    const callerId = +e.target.value;
    if (callerId > 0) {
      setCaller(+e.target.value);
    } else setCaller(null);
  };

  const handleRetrieveDate = (date) => {
    //todo
    //get data from form and send it to server
    console.log('-*-*-*-*-*-*-*', date);
  };

  const handleGetDateStartTimeEndTime = ({ date, start, end }) => {
    setSelectedDate(date);
    setStartTime(start);
    setEndTime(end);
  };

  const handleGetActiveTerminals = (data) => {
    setCallTo(data);
  };

  useEffect(() => {
    //incarca lista de apelanti din bd utilizand axios
    axios
      .get('http://127.0.0.1:8000/api/todos/callers/')
      .then((response) => response.data)
      .then((data) => {
        // data.unshift(null)
        setApelantiList(data);
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
                  {apelantiList.map((apelant, index) => {
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
                retrieveDate={handleRetrieveDate}
                getDateStartTimeEndTime={handleGetDateStartTimeEndTime}
              />
            ) : (
              <CallTolist
                activeTerminals={callTo}
                setActiveTerminals={handleGetActiveTerminals}
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
