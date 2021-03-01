// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import 'normalize.css'; // Note this
import './App.css';

import Videoconferinte from './components/videoconferinte/videoconferinte';
import LoginForm from './components/loginForm/loginForm';
import UserStatus from './components/userStatus/userStatus';
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

  // const whoami = () => {
  //   fetch('/users/whoami/', {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     credentials: 'same-origin',
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log('You are logged in as: ' + data.username);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

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
    // <Router>
    //   <Switch>
    //     <Route exact path="/">
    //       <h1>React Cookie Auth</h1>
    //     </Route>
    //   </Switch>
    // </Router>

    // <Router>
    //   <div className="App">
    //     <Switch>
    //       <Route exact path="/">
    //         <LoginForm />
    //       </Route>

    //       <Route exact path="/videoconferinte">
    //         <Videoconferinte />
    //       </Route>
    //     </Switch>
    //   </div>
    // </Router>

    <div className="App">
      <UserStatus username={user} onLogout={logout} />
      {!isAuthenticated ? (
        <div>
          <LoginForm
            csrf={csrf}
            setIsAuthenticated={handleSetIsAuthenticated}
            setUser={setLoggedInUser}
          />
        </div>
      ) : (
        <div>
          <Videoconferinte />
          {/* <div className="container mt-3">
            <h1>React Cookie Auth</h1>
            <p>You are logged in as {user}!</p>

            <button className="btn btn-primary mr-2" onClick={whoami}>
              WhoAmI
            </button>
            <button className="btn btn-danger" onClick={logout}>
              Log out
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default App;
