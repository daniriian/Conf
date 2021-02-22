import React from 'react';

import styles from './loginForm.module.scss';

const LoginForm = () => {
  return (
    <div>
      <div className={styles.login}>
        <h1>Login</h1>
        <form method="post" action="http://localhost:8000/users/login/">
          <input
            type="text"
            name="utilizator"
            placeholder="Utilizator"
            required="required"
          />
          <input
            type="password"
            name="password"
            placeholder="Parola"
            required="required"
          />
          <div>
            <select name="instanta" id="instanta">
              <option value="TRCJ">TRCJ</option>
              <option value="JCN">JCN</option>
              <option value="JD">J. Dej</option>
              <option value="JG">J. Gherla</option>
              <option value="JH">J. Huedin</option>
              <option value="JT">J. Turda</option>
            </select>
          </div>
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
