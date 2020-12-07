import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-times';

import { Container, Row, Col } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

import './styles.css';

const DateTimeSelector = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('09:00');

  const handleSetStartDate = (selectedDate) => {
    props.retrieveDate(selectedDate);
    setStartDate(selectedDate);
  };

  const handleStartTimeChange = ({ hour, minute }) => {
    setStartTime(hour + ':' + minute);
  };

  const handleEndTimeChange = ({ hour, minute }) => {
    setEndTime(hour + ':' + minute);
  };

  useEffect(() => {
    return () => {
      console.log('terminating date time');
      //save selected date, start Time and endTime in addConferenceForm component
      props.getDateStartTimeEndTime({ startDate, startTime, endTime });
    };
  });

  return (
    <div>
      {/* <input type="time"></input> */}
      <Container>
        <Row>
          <Col>
            <DatePicker
              selected={startDate}
              onChange={(date) => handleSetStartDate(date)}
              dateFormat="dd.MM.yyyy"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <TimePicker
              colorPalette="dark" // main color, default "light"
              time={startTime} // initial time, default current time
              theme="material"
              minuteStep={5}
              // material or
              // theme="classic"
              draggable={false}
              onTimeChange={handleStartTimeChange}
            />
          </Col>

          <Col>
            <TimePicker
              colorPalette="dark" // main color, default "light"
              time={endTime} // initial time, default current time
              theme="material"
              // or
              // theme="classic"
              draggable={false}
              onTimeChange={handleEndTimeChange}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default DateTimeSelector;
