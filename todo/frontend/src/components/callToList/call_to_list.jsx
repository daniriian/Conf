import React, { useState, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';

import axios from 'axios';

const CallTolist = (props) => {
  const url_terminale = 'http://127.0.0.1:8000/api/todos/terminals/';
  const [isLoading, setIsLoading] = useState(true);
  const [listaTerminale, setListaTerminale] = useState([]);

  useEffect(() => {
    axios
      .get(url_terminale)
      .then((response) => response.data)
      .then((data) => {
        setListaTerminale(data);
      })
      .then(setIsLoading(false))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const selected = [];
    for (let elem of e.target.selectedOptions) {
      selected.push(+elem.id); //converted to int
    }
    props.setActiveTerminals(selected);
  };


  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
          <Form.Control as="select" custom multiple onChange={handleChange}>
            {listaTerminale.map((terminal, index) => {
              return (
                <option
                  key={index}
                  id={terminal.id}
                >
                  {terminal.nume}
                </option>
              );
            })}
          </Form.Control>
        )}
    </div>
  );
};

export default CallTolist;

//props
// activeTerminals - lista cu terminalele selectate

// getActiveTerminals - function which is run on unmounting and sends selected terminals to parent
