import './App.css';
import Header from './components/header/header.jsx';
import TodoList from './components/todoList/todolist.jsx';

function App() {
  return (
    <div className="App">
      <div>
        <Header />
        <TodoList />
      </div>
    </div>
  );
}

export default App;
