import React from 'react';

import styles from './loginForm.module.scss';

const LoginForm = () => {
  return (
    <div>
      <div className={styles.login}>
        <h1>Login</h1>
        <form method="post">
          <input
            type="text"
            name="u"
            placeholder="Username"
            required="required"
          />
          <input
            type="password"
            name="p"
            placeholder="Password"
            required="required"
          />
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
