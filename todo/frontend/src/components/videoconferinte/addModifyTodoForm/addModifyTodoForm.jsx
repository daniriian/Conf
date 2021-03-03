import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { format_data } from '../../../utils/utils';

import CallersList from '../callersList/callersList';
import DateTimeSelector from '../dateTimeSelector/dateTimeSelector';
import CallTolist from '../callToList/call_to_list';
import axios from 'axios';

const AddModifyForm = (props) => {
  const [step, setStep] = useState(0);
  const [todo, setTodo] = useState(props.todo);
  const [userId, setUserId] = useState(null);
  const history = useHistory();

  const postUrl = '/api/todos/create/';

  useEffect(() => {
    getUserId();
  }, []);

  const addTodo = async (todo) => {
    let newTodo = { ...todo };
    newTodo.data = format_data(todo.data);
    newTodo.adaugat_de = userId;
    const res = await axios.post(postUrl, newTodo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  };

  axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
  axios.defaults.xsrfCookieName = 'csrftoken';
  axios.defaults.withCredentials = true;

  const handle_NextAddModifyBtn = () => {
    if (step < 2) {
      setStep(step + 1);
    } else if (step === 2) {
      if (props.actionType === 'ADD') {
        const newTodo = { ...todo };
        addTodo(newTodo)
          .then((response) => {
            return response.status;
          })
          .then((status) => {
            if (status === 201) {
              props.onClose();
            }
          })
          .then(() => {
            history.push('/videoconferinte');
          })
          .catch((err) => {
            alert(err.response.data);
          });
      } else if (props.actionType === 'MODIFY') {
        axios
          .put('/api/todos/' + todo.id, todo, {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .then(() => props.onClose())
          .catch((err) => {
            alert(err.response.data);
          });
      }
    }
  };

  const handleBackBtn = () => {
    setStep(step - 1);
  };

  const handleOnChangeCaller = (id) => {
    const newTodo = { ...todo };
    newTodo.caller = +id;
    setTodo(newTodo);
  };

  const handleGetDateStartTimeEndTime = (param) => {
    const newTodo = { ...todo };
    const key = Object.keys(param)[0];
    if (key === 'data') {
      newTodo[key] = format_data(Object.values(param)[0]);
    } else {
      newTodo[key] = Object.values(param)[0];
    }
    setTodo(newTodo);
  };

  const handleChange = (dest) => {
    const newTodo = { ...todo };
    newTodo.call_to = dest;
    setTodo(newTodo);
  };

  const getUserId = () => {
    fetch('/users/whoami/', {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'same-origin',
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        // console.log('You are logged in as: ' + data.id);
        setUserId(data.id);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Modal
      show={true}
      onHide={props.onClose}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {props.actionType === 'ADD' ? 'Adauga' : 'Modifica'} videoconferinta
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {step === 0 ? (
          <CallersList
            currentCaller={todo.caller}
            onChangeCaller={handleOnChangeCaller}
          />
        ) : step === 1 ? (
          <DateTimeSelector
            getDateStartTimeEndTime={handleGetDateStartTimeEndTime}
            data={todo.data}
            start_time={todo.start_time}
            end_time={todo.end_time}
          />
        ) : (
          <div>
            <p>Aici vine lista de call_to</p>
            <CallTolist
              selectedValues={todo.call_to}
              onChange={(dest) => handleChange(dest)}
            />
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onClose}>
          Renunta
        </Button>
        {step > 0 ? (
          <Button variant="primary" onClick={handleBackBtn}>
            Inapoi
          </Button>
        ) : (
          ''
        )}
        <Button variant="primary" onClick={handle_NextAddModifyBtn}>
          {step === 2
            ? props.actionType === 'ADD'
              ? 'Adauga'
              : 'Modifica'
            : 'Inainte'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddModifyForm;

//PUT REQUEST Format
// {
//     "caller": 2,
//     "start_time": "11:00:00",
//     "end_time": "12:20:00",
//     "data": "2020-10-30",
//     "call_to": [75, 65],
//     "completed": false,
//     "adaugat_de": 6
// }

// post format for adding todo
// [
//   {
//     id: 8,
//     caller: 1,
//     start_time: '08:50:00',
//     end_time: '10:00:00',
//     data: '2020-12-25',
//     call_to: [55, 65],
//     completed: false,
//     adaugat_de: 4,
//   },
// ];
