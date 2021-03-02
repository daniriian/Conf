import React, { useState } from 'react';

import { isResponseOk } from '../../utils/utils';

import styles from './loginForm.module.scss';

const LoginForm = ({ csrf, setIsAuthenticated, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [instanta, setInstanta] = useState('117'); //default TRCJ

  const login = (event) => {
    event.preventDefault();
    fetch('/users/login/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrf,
      },
      credentials: 'same-origin',
      body: JSON.stringify({
        username: username,
        password: password,
        instanta: instanta,
      }),
    })
      .then((response) => {
        isResponseOk(response);
      })
      .then((data) => {
        setIsAuthenticated(true);
        setUser(username);
        // setUsername('');
        // setPassword('');
        // setError('');
      })
      .catch((err) => {
        console.log(err);
        setError('Wrong username or password.');
      });
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleUserNameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleInstanta = (e) => {
    e.preventDefault();
    console.log(typeof e.target.value);
    setInstanta(e.target.value);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.login}>
        <h1>Login</h1>
        <form method="post" onSubmit={login}>
          <input
            type="text"
            name="utilizator"
            placeholder="Utilizator"
            required="required"
            value={username}
            onChange={handleUserNameChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Parola"
            required="required"
            value={password}
            onChange={handlePasswordChange}
          />
          <div>
            <select name="instanta" id="instanta" onChange={handleInstanta}>
              <option value="117">TRCJ</option>
              <option value="211">JCN</option>
              <option value="219">J. Dej</option>
              <option value="235">J. Gherla</option>
              <option value="242">J. Huedin</option>
              <option value="328">J. Turda</option>
            </select>
          </div>
          <div>{error && <small className="text-danger">{error}</small>}</div>
          <button
            type="submit"
            className={`${styles.btn} ${styles.btnPrimary} ${styles.btnBlock} ${styles.btnLarge}`}
          >
            Let me in.
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
