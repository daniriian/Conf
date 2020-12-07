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
  const [apelanti, setApelanti] = useState([]);
  const [callerDataReady, setCallerDataReady] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('08:10');
  const [stepIndex, setStepIndex] = useState(1);
  const [callTo, setCallTo] = useState([])

  const handleNext = () => {
    if (stepIndex < 3) {
      setStepIndex(stepIndex + 1);
    }
  };

  const handlePrev = () => {
    if (stepIndex > 1) {
      setStepIndex(stepIndex - 1);
    }
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
    // console.log('getting active terminals from form', data)
    console.log("CALL TO = ", data)
    setCallTo(data)
  }

  useEffect(() => {
    //incarca lista de apelanti din bd utilizand axios
    // console.log('UseEffect from modalForm');
    axios
      .get('http://127.0.0.1:8000/api/todos/callers/')
      .then((response) => {
        setApelanti(response.data);
        setTimeout(function () {
          setCallerDataReady(true);
        }, 100);
      })
      .catch((err) => alert(err));
    return () => {
      setStepIndex(1);
    };
  }, [visible]);

  return (
    <Modal show={visible} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Adaugă Videoconferinţă</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="exampleForm.SelectCustom">
            <Form.Label>{steps[stepIndex]}</Form.Label>

            {stepIndex === 1 ? (
              callerDataReady ? (
                <Form.Control as="select" custom>
                  {apelanti.map((apelant, index) => {
                    return (
                      <option key={index}>{apelant.id_echipament.nume}</option>
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
                  <CallTolist activeTerminals={callTo} getActiveTerminals={handleGetActiveTerminals} />
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
          Înainte
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddConferenceForm;
