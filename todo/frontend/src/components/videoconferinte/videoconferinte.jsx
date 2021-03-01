import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Header from './header/header';
import TodoList from './todoList/todolist';
import AddModifyForm from './addModifyTodoForm/addModifyTodoForm';
import TodoDetails from './todoDetails/todoDetails';

const defaultTodo = {
  caller: '',
  data: new Date().toLocaleDateString('ro-RO').substring(0, 10),
  start_time: '08:45',
  end_time: '09:20',
  call_to: [],
  completed: false,
  adaugat_de: 6,
};

const Videoconferinte = () => {
  const [show_AddModifyForm, setShow_AddModifyForm] = useState(false);
  const [actionType, setActionType] = useState('ADD');
  const [hasChanged, setHasChanged] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(defaultTodo);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('ro-RO').substring(0, 10)
  );

  const handleAddButtonClick = () => {
    setCurrentTodo(defaultTodo);
    //trebuise sa modific todo.adaugat_de cu id user curent
    setShow_AddModifyForm(true);
    setActionType('ADD');
  };

  const handleSearchButtonClick = (data) => {
    setSelectedDate(data);
  };

  const handleAddModifyForm_Close = () => {
    setShow_AddModifyForm(false);
    setHasChanged(!hasChanged);
    //redirect to Homepage
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
    <Router>
      <Header
        onAddButtonClick={handleAddButtonClick}
        onSearchButtonClick={handleSearchButtonClick}
      />
      <h1 className="my-5"> Programări videoconferinţe</h1>

      {show_AddModifyForm ? (
        <AddModifyForm
          todo={currentTodo}
          onClose={handleAddModifyForm_Close}
          actionType={actionType}
        />
      ) : (
        ''
      )}

      <Switch>
        <Route exact path="/videoconferinte">
          <TodoList
            refresh={hasChanged}
            modifica={handleModifica}
            xdate={selectedDate}
          />
        </Route>
        <Route
          exact
          path="/videoconferinte/detalii/:id"
          children={<TodoDetails />}
        >
          {/* <h1>Detalii videoconferinta</h1> */}
        </Route>
      </Switch>
    </Router>
  );
};

export default Videoconferinte;
