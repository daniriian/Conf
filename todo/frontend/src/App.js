import { useState } from 'react';
import './App.css';
import Header from './components/header/header.jsx';
import TodoList from './components/todoList/todolist.jsx';
import AddModifyForm from './components/addModifyTodoForm/addModifyTodoForm.jsx';

import 'normalize.css'; // Note this

const defaultTodo = {
  caller: '',
  data: new Date().toISOString().substring(0, 10),
  start_time: '08:45',
  end_time: '09:20',
  call_to: [],
  completed: false,
  adaugat_de: 6,
};

function App() {
  const [show_AddModifyForm, setShow_AddModifyForm] = useState(false);
  const [actionType, setActionType] = useState('ADD');
  const [hasChanged, setHasChanged] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(defaultTodo);

  const handleAddButtonClick = () => {
    setCurrentTodo(defaultTodo);
    setShow_AddModifyForm(true);
    setActionType('ADD');
  };

  const handleAddModifyForm_Close = () => {
    setShow_AddModifyForm(false);
    setHasChanged(!hasChanged);
  };

  const handleModifica = (todo_id) => {
    const new_todo = { ...todo_id };
    new_todo.caller = todo_id.caller.id;
    new_todo.adaugat_de = todo_id.adaugat_de.id;
    new_todo.call_to = todo_id.call_to.map((e) => e.id);
    setCurrentTodo(new_todo);
    setActionType('MODIFY');
    setShow_AddModifyForm(true);
  };

  return (
    <div className="App">
      <div>
        <Header onAddButtonClick={handleAddButtonClick} />
        <TodoList refresh={hasChanged} modifica={handleModifica} />
        {show_AddModifyForm ? (
          <AddModifyForm
            todo={currentTodo}
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
