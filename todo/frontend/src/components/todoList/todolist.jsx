import React, { useState, useEffect } from 'react';
import Todo from '../todo/todo';
import { getTodos } from '../../utils/utils';

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const myCallback = (response, status) => {
      if (status === 200) {
        setTodos(response, status);
      }
    };
    getTodos(myCallback);
  }, []);

  return todos.map((item, index) => {
    return <Todo text={item.caller} key={index} />;
  });
};

export default TodoList;
