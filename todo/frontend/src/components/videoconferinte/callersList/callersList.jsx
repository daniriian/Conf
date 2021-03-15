import React, { useState, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';

import axios from 'axios';

const CallersList = (props) => {
  const [callers, setCallers] = useState([]);
  // const [selectedCaller, setSelectedCaller] = useState();
  const [isDbFetchReady, setIsDbFetchReady] = useState(false);

  useEffect(() => {
    //incarca lista de apelanti din bd utilizand axios
    axios
      .get('/api/todos/callers/')
      .then((response) => response.data)
      .then((data) => {
        // data.unshift(null)
        setCallers(data);
        setIsDbFetchReady(true);
      })
      .catch((err) => alert(err));
  }, []);

  const handleCaller = (e) => {
    const selectedCallerID = e.target.value;
    props.onChangeCaller(selectedCallerID);
  };

  return (
    <Form>
      <Form.Group controlId="exampleForm.SelectCustom">
        <Form.Label>Apelant</Form.Label>
        {isDbFetchReady ? (
          <Form.Control
            as="select"
            custom
            onChange={handleCaller}
            defaultValue={props.currentCaller || 0} //implicit value on component load
          >
            <option value={0}>Alegeti...</option>
            {callers.map((apelant, index) => {
              return (
                <option key={index} value={apelant.id}>
                  {apelant.id_echipament.nume_instanta}
                </option>
              );
            })}
          </Form.Control>
        ) : (
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        )}
      </Form.Group>
    </Form>
  );
};

export default CallersList;
