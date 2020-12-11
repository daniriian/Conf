import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import TodoList from './components/todoList/todolist.jsx';
import AddConferenceForm from './components/addConferenceForm/addConferenceForm';

import 'normalize.css'; // Note this

function App() {
  // global state
  const [confFormVisible, setConfFormVisible] = useState(false);

  const [caller, setCaller] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState('08:00');
  const [endTime, setEndTime] = useState('08:10');
  const [callTo, setCallTo] = useState([]);

  const handleAddButton = () => {
    setConfFormVisible(true);
  };

  const handleClose = () => {
    setConfFormVisible(false);
  };

  const handleAddFormVisible = () => {
    setConfFormVisible(!confFormVisible);
  };

  useEffect(() => {
    console.log('Rendering App');
    return () => {
      setCallTo([]);
    };
  }, [confFormVisible]);

  const handleSelectCallerChange = (callerId) => {
    if (callerId > 0) {
      setCaller(callerId);
    } else {
      setCaller(null);
    }
  };

  const handleGetDateStartTimeEndTime = (arr) => {
    setSelectedDate(arr[0]);
    setStartTime(arr[1]);
    setEndTime(arr[2]);
  };

  const handleGetActiveTerminals = (data) => {
    setCallTo(data);
  };

  const handleModifiicaVideoconferinta = (id) => {
    console.log('ID from App.js', id);
    handleAddButton();
  };

  return (
    <div className="App">
      <div>
        <Header renderAddVideoconferenceForm={handleAddButton} />
        <TodoList
          rerender={confFormVisible}
          modifica={handleModifiicaVideoconferinta}
        />
        <AddConferenceForm
          visible={confFormVisible}
          handleClose={handleClose}
          handleVisible={handleAddFormVisible}
          caller={caller}
          selectedDate={selectedDate}
          startTime={startTime}
          endTime={endTime}
          callTo={callTo}
          onSelectCallerChange={handleSelectCallerChange}
          onHandleGetDateStartTimeEndTime={handleGetDateStartTimeEndTime}
          getActiveTerminals={handleGetActiveTerminals}
        />
      </div>
    </div>
  );
}

export default App;
