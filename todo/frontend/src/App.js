import { useState } from 'react'
import './App.css';
import Header from './components/header/header.jsx';
import TodoList from './components/todoList/todolist.jsx';
import AddConferenceForm from './components/addConferenceForm/addConferenceForm';


function App() {
  // global state
  const [confFormVisible, setConfFormVisible] = useState(false)

  const handleAddButton = () => {

    setConfFormVisible(true);
  }

  const handleClose = () => {
    setConfFormVisible(false);
  }

  return (
    <div className="App">
      <div>
        <Header renderAddVideoconferenceForm={handleAddButton} />
        <TodoList />
        <AddConferenceForm visible={confFormVisible} handleClose={handleClose} />
      </div>
    </div>
  );
}

export default App;
