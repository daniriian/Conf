import React, { useState } from "react";


import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/users/user.actions.js";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import CSRFToken from '../CSRFToken/CSRFToken'

import "./sign-in.scss";

const SignIn = ({ history, dispatch, csrf, currentUser }) => {
  const [credentials, setCredentials] = useState({
    instanta: "",
    utilizator: "",
    parola: "",
  });



  const handleChange = (e) => {
    const { name, value } = e.target;
    let newCredentials = { ...credentials };
    newCredentials[name] = value;
    setCredentials(newCredentials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    dispatch(
      setCurrentUser(
        credentials.instanta,
        credentials.utilizator,
        credentials.parola,
        csrf
      )
    );
    setCredentials({
      instanta: "",
      utilizator: "",
      parola: "",
    });

 
  };

  return (
    <div className='sign-in'>
      <h1 className='sign-in__title'>Autentificare</h1>

      <form onSubmit={handleSubmit} className='sign-in-form'>
        <CSRFToken />
        <FormInput
          type='text'
          name='instanta'
          value={credentials.instanta}
          label='Instanta'
          placeholder='Instanta'
          onChange={handleChange}
        />

        <FormInput
          type='text'
          name='utilizator'
          value={credentials.utilizator}
          label='Utilizator'
          placeholder='Utilizator'
          onChange={handleChange}
        />

        <FormInput
          type='password'
          name='parola'
          value={credentials.parola}
          label='Parola'
          placeholder='Parola'
          onChange={handleChange}
        />

        <CustomButton type='submit' className='sign-in-form__btn'>
          Log in
        </CustomButton>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  csrf: state.session.csrfToken,
});

export default connect(mapStateToProps)(SignIn);
