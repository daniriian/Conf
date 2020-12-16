import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import TodoList from './components/todoList/todolist.jsx';
import AddModifyForm from './components/addModifyTodoForm/addModifyTodoForm.jsx'

import 'normalize.css'; // Note this

function App() {

  const [show_AddModifyForm, setShow_AddModifyForm] = useState(false)

  const handleAddButtonClick = () => {
    setShow_AddModifyForm(true)
  }

  const handleAddModifyFormClose = () => {
    setShow_AddModifyForm(false)
  }

  return (
    <div className="App">
      <div>
        <Header onAddButtonClick={handleAddButtonClick} />
        <TodoList />
        {show_AddModifyForm ? <AddModifyForm onClose={handleAddModifyFormClose} /> : ""}

      </div>
    </div>
  );
}

export default App;
