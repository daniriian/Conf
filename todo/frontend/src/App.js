import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import TodoList from './components/todoList/todolist.jsx';
import AddConferenceForm from './components/addConferenceForm/addConferenceForm';

import 'normalize.css'; // Note this

function App() {
  // global state
  const [confFormVisible, setConfFormVisible] = useState(false);

  const handleAddButton = () => {
    setConfFormVisible(true);
  };

  const handleClose = () => {
    setConfFormVisible(false);
    //todo
    // reset step position
  };

  const handleAddFormVisible = () => {
    setConfFormVisible(!confFormVisible);
  };

  useEffect(() => {
    console.log('Rendering App');
  }, [confFormVisible]);

  return (
    <div className="App">
      <div>
        <Header renderAddVideoconferenceForm={handleAddButton} />
        <TodoList rerender={confFormVisible} />
        <AddConferenceForm
          visible={confFormVisible}
          handleClose={handleClose}
          handleVisible={handleAddFormVisible}
        />
      </div>
    </div>
  );
}

export default App;
