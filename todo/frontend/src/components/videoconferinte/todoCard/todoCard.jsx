import React from 'react';
import PhoneButton from '../../phoneButton/phoneButton';
import axios from 'axios';
import './todoCard.scss';

const TodoCard = ({ sala, ip, vmr, apelant, ...props }) => {
  const handleCall = (ip_destinatar, e) => {
    console.log('--------------------------');
    console.log(apelant, ip, e);
    let command = '';

    e ? (command = 'hang up') : (command = 'dial');
    console.log(command);
    axios
      .get(
        '/api/todos/scraper',
        {
          params: {
            apelant: apelant,
            destinatar: ip_destinatar,
            action: command,
          },
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div className="todo-card">
      <h3 className="todo-card__title">{sala}</h3>
      <h4 className="todo-card__numbers">
        <span className="desc">Adresa IP:</span>
        <span className="value">
          {ip} <PhoneButton handleCall={(val) => handleCall(ip, val)} />
        </span>
      </h4>
      <h4 className="todo-card__numbers">
        VMR:
        <span>
          {vmr}
          <PhoneButton />
        </span>
      </h4>
    </div>
  );
};

export default TodoCard;
