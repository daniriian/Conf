import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import DateTimeSelector from '../dateTimeSelector/dateTimeSelector';

import axios from 'axios';

const steps = {
    1: 'Apelant',
    2: 'Data si intervalul orar',
    3: 'Destinatar(i)',
};

const AddConferenceForm = ({ handleClose, visible }) => {
    const [dataReady, setDataReady] = useState(false);
    const [apelanti, setApelanti] = useState([]);
    const [stepIndex, setStepIndex] = useState(1);

    const handleNext = () => {
        console.log('next');
        if (stepIndex < 3) {
            setStepIndex(stepIndex + 1);
        }
    };

    const handlePrev = () => {
        console.log('next');
        if (stepIndex > 1) {
            setStepIndex(stepIndex - 1);
        }
    };

    const handleDateChange = () => {
        console.log("fdsafdfsfasdgfvfgfd gf gwggf ghrtw htrw hg")
    }

    useEffect(() => {
        //incarca lista de apelanti din bd utilizand axios
        axios
            .get('http://127.0.0.1:8000/api/todos/callers/')
            .then((response) => {
                setApelanti(response.data);
                setTimeout(function () {
                    setDataReady(true);
                }, 100);
            })
            .catch((err) => alert(err));
    }, []);

    return (
        <Modal show={visible}>
            <Modal.Header closeButton onClick={handleClose}>
                <Modal.Title>Adaugă Videoconferinţă</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form>
                    <Form.Group controlId="exampleForm.SelectCustom">
                        <Form.Label>{steps[stepIndex]}</Form.Label>

                        {stepIndex === 1 ? (
                            dataReady ? (
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
                        ) : (
                                //afisez form pentru data si interval orar
                                <DateTimeSelector handleDateChange={() => console.log('--******************************')} />
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
