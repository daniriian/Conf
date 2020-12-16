import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import TodoList from './components/todoList/todolist.jsx';
import AddModifyForm from './components/addModifyTodoForm/addModifyTodoForm.jsx'

import 'normalize.css'; // Note this

function App() {

  const [showAddModifyForm, setShowAddModifyForm] = useState(false)

  const handleAddButtonClick = () => {
    setShowAddModifyForm(true)
  }

  const handleAddModifyFormClose = () => {
    setShowAddModifyForm(false)
  }

  return (
    <div className="App">
      <div>
        <Header onAddButtonClick={handleAddButtonClick} />
        <TodoList />
        {showAddModifyForm ? <AddModifyForm onClose={handleAddModifyFormClose} /> : ""}

      </div>
    </div>
  );
}

export default App;
