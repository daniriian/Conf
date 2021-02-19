import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'normalize.css'; // Note this
import './App.css';

import Videoconferinte from './components/videoconferinte/videoconferinte';
import LoginForm from './components/loginForm/loginForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/">
            <LoginForm />
          </Route>

          <Route exact path="/videoconferinte">
            <Videoconferinte />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
