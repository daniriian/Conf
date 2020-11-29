import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from '../timePicker/timePicker';

import 'react-datepicker/dist/react-datepicker.css';

const DateTimeSelector = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleSetStartDate = (selectedDate) => {
    props.retrieveDate(selectedDate);
    setStartDate(selectedDate);
  };

  return (
    <div>
      <DatePicker
        selected={startDate}
        onChange={(date) => handleSetStartDate(date)}
        dateFormat="dd.MM.yyyy"
      />
      {/* <input type="time"></input> */}
      <TimePicker />
    </div>
  );
};

export default DateTimeSelector;
