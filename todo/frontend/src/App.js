import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'normalize.css'; // Note this
import './App.css';

import Videoconferinte from './components/videoconferinte/videoconferinte';
import LoginForm from './components/loginForm/loginForm';
import UserStatus from './components/userStatus/userStatus';
import TodoDetails from './components/videoconferinte/todoDetails/todoDetails';

import { isResponseOk } from './utils/utils';

const App = () => {
  const [csrf, setCsrf] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState('nobody');
  // const [userId, setUserId] = useState(null);

  useEffect(() => {
    getSession();

    // getCSRF();
  }, []);

  const getCSRF = () => {
    fetch('/users/csrf/', {
      credentials: 'same-origin',
    })
      .then((res) => {
        let csrfToken = res.headers.get('X-CSRFToken');
        setCsrf(csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSession = () => {
    fetch('/users/session/', {
      credentials: 'same-origin',
    })
      .then((res) => {
        // console.log(res);
        return res.json();
      })
      .then((data) => {
        if (data.isAuthenticated) {
          // console.log(data);
          setIsAuthenticated(true);
          setUser(data.username);
        } else {
          setIsAuthenticated(false);
          getCSRF();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSetIsAuthenticated = (val) => {
    setIsAuthenticated(val);
  };

  const logout = () => {
    fetch('/users/logout', {
      credentials: 'same-origin',
    })
      .then(isResponseOk)
      .then((data) => {
        setIsAuthenticated(false);
        setUser('nobody');
        // setUserId(null);
        getCSRF();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setLoggedInUser = (userName) => {
    setUser(userName);
  };

  return (
    <Router>
      <div className="App">
        <UserStatus username={user} onLogout={logout} />
        <Switch>
          <Route exact path="/">
            <LoginForm
              csrf={csrf}
              setIsAuthenticated={handleSetIsAuthenticated}
              setUser={setLoggedInUser}
              isIn={isAuthenticated}
            />
          </Route>

          <Route path="/videoconferinte">
            {!isAuthenticated ? <Redirect to="/" /> : <Videoconferinte />}
          </Route>

          {/* <Route
            exact
            path="/videoconferinte/detalii/:id"
            children={<TodoDetails />}
          ></Route> */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
