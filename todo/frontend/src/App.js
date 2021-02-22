import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "normalize.css"; // Note this
import "./App.css";

import Videoconferinte from "./components/videoconferinte/videoconferinte";
import LoginForm from "./components/loginForm/loginForm";

const App = () => {
  const [csrf, setCsrf] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    getSession();
  }, []);

  const getCSRF = () => {
    fetch("http://localhost:8000/users/csrf/", {
      credentials: "same-origin",
    })
      .then((res) => {
        let csrfToken = res.headers.get("X-CSRFToken");
        setCsrf(csrfToken);
        console.log(csrfToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSession = () => {
    fetch("http://localhost:8000/users/session/", {
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          getCSRF();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const whoami = () => {
    fetch("http://localhost:8000/users/whoami/", {
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "same-origin",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("You are logged in as: " + data.username);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const isResponseOk = (response) => {
    if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      throw Error(response.statusText);
    }
  };

  const login = (event) => {
    event.preventDefault();
    fetch("http://localhost:8000/users/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
      },
      credentials: "same-origin",
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setIsAuthenticated(true);
        setUsername("");
        setPassword("");
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("Wrong username or password.");
      });
  };

  const logout = () => {
    fetch("http://localhost:8000/users/logout", {
      credentials: "same-origin",
    })
      .then(isResponseOk)
      .then((data) => {
        console.log(data);
        setIsAuthenticated(false);
        getCSRF();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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

    isAuthenticated ? (
      <div className="container mt-3">
        <h1>React Cookie Auth</h1>
        <br />
        <h2>Login</h2>
        <form onSubmit={login}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
            />
            <div>{error && <small className="text-danger">{error}</small>}</div>
          </div>
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    ) : (
      <div className="container mt-3">
        <h1>React Cookie Auth</h1>
        <p>You are logged in!</p>
        <button className="btn btn-primary mr-2" onClick={whoami}>
          WhoAmI
        </button>
        <button className="btn btn-danger" onClick={logout}>
          Log out
        </button>
      </div>
    )
  );
};

export default App;
