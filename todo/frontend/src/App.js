import { useState, useEffect } from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import TodoList from './components/todoList/todolist.jsx';
import AddModifyForm from './components/addModifyTodoForm/addModifyTodoForm.jsx';

import 'normalize.css'; // Note this

function App() {
  const [show_AddModifyForm, setShow_AddModifyForm] = useState(false);
  const [actionType, setActionType] = useState('ADD');
  const [hasChanged, setHasChanged] = useState(false);

  const handleAddButtonClick = () => {
    setShow_AddModifyForm(true);
    setActionType('ADD');
  };

  const handleAddModifyForm_Close = () => {
    setShow_AddModifyForm(false);
    setHasChanged(!hasChanged);
  };


  return (
    <div className="App">
      <div>
        <Header onAddButtonClick={handleAddButtonClick} />
        <TodoList refresh={hasChanged} />
        {show_AddModifyForm ? (
          <AddModifyForm
            onClose={handleAddModifyForm_Close}
            actionType={actionType}
          />
        ) : (
            ''
          )}
      </div>
    </div>
  );
}

export default App;
