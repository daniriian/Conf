import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';

import { Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';
// import { format_data } from '../../utils/utils';
import './todoDetails.scss';

const TodoDetails = () => {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id } = useParams();
  let detailsURL = 'http://localhost:8000/api/todos/';
  detailsURL += id;

  const sendGetRequest = async () => {
    const response = await axios.get(detailsURL);
    const data = await response.data;
    return data;
  };

  useEffect(() => {
    sendGetRequest()
      .then((res) => {
        res.data = new Date(res.data).toLocaleDateString("ro-RO")
        setDetails(res);
      })
      .then(() => setIsLoading(false));
  }, []);

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <h1 className="page-title">Detalii Videoconferinţă: {id}</h1>
          <hr className="spacer title-spacer" />
        </Col>
      </Row>

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      ) : (
        <React.Fragment>
          <div className="text-success display-4 font-weight-bold">
            Data: {details.data}
          </div>
          <Row className="mt-5">
            <Col>
              <div className="text-left">
                <div>
                  <div className="detail title">Apelant</div>
                  <div className="detail">
                    Instanţa: <span>{details.caller.id_echipament.nume}</span>
                  </div>

                  <div className="detail">
                    IP: <span>{details.caller.id_echipament.ip}</span>
                  </div>
                  <div className="detail">
                    Model echipament:{' '}
                    <span>{details.caller.id_echipament.model}</span>
                  </div>
                </div>
                <div className="detail">
                  Ora inceperii: <span>{details.start_time}</span>
                </div>
                <div className="detail">
                  Ora terminarii: <span>{details.end_time}</span>
                </div>
              </div>
            </Col>
            <Col>
              <div className="text-left">
                <div className="detail title">Destinatari:</div>
                {details.call_to.map((dest, index) => (
                  <div key={index}>
                    <div className="detail">
                      Nume: <span>{dest.nume}</span>
                    </div>
                    <div className="detail">
                      Model: <span>{dest.model}</span>
                    </div>
                    <div className="detail">
                      IP: <span>{dest.ip}</span>
                    </div>
                    <div className="detail">
                      Nr. apel: <span>{dest.nr_apel}</span>
                    </div>
                    <hr className="spacer" />
                  </div>
                ))}
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div>Creata de :</div>
              <div>Data si ora crearii:</div>
              <div>Modificata de: la data</div>
            </Col>
          </Row>
        </React.Fragment>
      )}
    </Container>
  );
};

export default TodoDetails;