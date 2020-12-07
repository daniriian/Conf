import React, { useState, useEffect } from 'react';
import { Form, Spinner } from 'react-bootstrap';

import axios from 'axios';

const CallTolist = () => {
  const url_terminale = 'http://127.0.0.1:8000/api/todos/terminals/';
  const [isLoading, setIsLoading] = useState(true);
  const [listaTerminale, setListaTerminale] = useState([]);
  const [selectedTerminals, setSelectedTerminals] = useState([]);

  useEffect(() => {
    axios
      .get(url_terminale)
      .then((response) => response.data)
      .then((data) => {
        setListaTerminale(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    console.log(e.target.options.id);
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
              <option key={index} id={terminal.id}>
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
