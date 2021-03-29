import React, { useState } from 'react';

import { IoCallSharp } from 'react-icons/io5';
import { FcEndCall } from 'react-icons/fc';

import styles from '../../styles/phoneButton.module.scss';

const PhoneButton = (props) => {
  const [callStarted, setCallStarted] = useState(false);

  const handlePhoneButtonClick = () => {
    setCallStarted(!callStarted);
    props.handleCall(callStarted);
  };

  return (
    <div className={styles.phoneButton} onClick={handlePhoneButtonClick}>
      {callStarted ? (
        <FcEndCall className={styles.startCall} />
      ) : (
        <IoCallSharp className={styles.startCall} />
      )}
    </div>
  );
};

export default PhoneButton;
