import React from 'react';

import { FaUser } from 'react-icons/fa';

import styles from '../../styles/userStatus.module.scss';

const UserStatus = ({ username, onLogout }) => {
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
                  onClick={onLogout}
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
