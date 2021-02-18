import React from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'react-times';
import { format_data } from '../../../utils/utils';

import { Container, Row, Col } from 'react-bootstrap';

import 'react-datepicker/dist/react-datepicker.css';

// use material theme
import 'react-times/css/material/default.css';
// or you can use classic theme
import 'react-times/css/classic/default.css';

import './styles.css';

const DateTimeSelector = (props) => {
  const theDate = props.data ? new Date(format_data(props.data)) : new Date();
  const theStartTime = props.start_time ? props.start_time : '08:00';
  const theStopTime = props.end_time ? props.end_time : '08:30';

  const handleStartTimeChange = ({ hour, minute }) => {
    const ora = hour + ':' + minute;
    // setStartTime(ora)
    props.getDateStartTimeEndTime({ start_time: ora });
  };

  const handleEndTimeChange = ({ hour, minute }) => {
    const ora = hour + ':' + minute;
    // setEndTime(ora)
    props.getDateStartTimeEndTime({ end_time: ora });
  };

  const handleDateChange = (data) => {
    const newDate = data.toLocaleDateString('ro-RO').substring(0, 10);
    props.getDateStartTimeEndTime({ data: newDate });
  };

  return (
    <div>
      {/* <input type="time"></input> */}
      <Container>
        <Row>
          <Col>
            <DatePicker
              selected={theDate}
              onChange={(date) => handleDateChange(date)}
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
