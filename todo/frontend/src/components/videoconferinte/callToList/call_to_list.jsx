import React, { useState, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';

import axios from 'axios';

const CallTolist = (props) => {
  const url_terminale = '/api/todos/terminals/';
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
    props.onChange(selected);
  };

  return (
    <div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <Form.Control
          as="select"
          custom
          multiple
          htmlSize={12}
          onChange={handleChange}
        >
          {listaTerminale.map((terminal, index) => {
            return (
              <option
                key={index}
                id={terminal.id}
                selected={props.selectedValues.includes(terminal.id)}
              >
                {terminal.nume_instanta}
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
