import React from 'react';
import { useHistory } from 'react-router-dom';

import { FaUser } from 'react-icons/fa';

import styles from '../../styles/userStatus.module.scss';

const UserStatus = ({ username, onLogout }) => {
  const history = useHistory();
  const onLogoutClick = (e) => {
    e.preventDefault();
    onLogout();
    history.push('/');
  };

  return (
    <div className={styles.statusBar}>
      <div className={styles.statusContainer}>
        {
          <div className={styles.userStatus}>
            <FaUser className={styles.icon} />
            {username === 'nobody' ? (
              <span>Guest</span>
            ) : (
              <div className={styles.user}>
                <span>{username}</span>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={onLogoutClick}
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        }
      </div>
    </div>
  );
};

export default UserStatus;
