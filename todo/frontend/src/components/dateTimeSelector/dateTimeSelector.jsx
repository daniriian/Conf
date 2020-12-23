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
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const theDate = props.data ? new Date(props.data) : new Date();
  const theStartTime = props.ora_start ? props.ora_start : '08:00';
  const theStopTime = props.ora_stop ? props.ora_stop : "08:30"
  console.log(props)

  useEffect(() => {
    console.log("rendering dateTimeSelector with props", props);
    setStartDate(theDate)
    setStartTime(theStartTime)
    setEndTime(theStopTime)
    console.log(theStartTime, ' ', theStopTime)
  }, []);


  const handleStartTimeChange = ({ hour, minute }) => {
    const ora = (hour + ':' + minute);
    // setStartTime(ora)
    props.getDateStartTimeEndTime({ ora_start: ora })
  };

  const handleEndTimeChange = ({ hour, minute }) => {
    const ora = (hour + ':' + minute);
    // setEndTime(ora)
    props.getDateStartTimeEndTime({ ora_stop: ora })
  };



  return (
    <div>
      {/* <input type="time"></input> */}
      <Container>
        <Row>
          <Col>
            <DatePicker
              selected={startDate}
              onChange={(date) => props.getDateStartTimeEndTime({ data: date })}
              dateFormat="dd.MM.yyyy"
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <TimePicker
              colorPalette="dark" // main color, default "light"
              time={theStartTime} // initial time, default current time
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
              time={theStopTime} // initial time, default current time
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
