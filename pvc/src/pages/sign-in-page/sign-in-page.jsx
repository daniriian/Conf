import React from "react";
import {Redirect } from 'react-router-dom'

import SignIn from "../../components/sign-in/sign-in";
import {connect} from 'react-redux'
import { createStructuredSelector } from "reselect";
import {selectIsAuthenticated} from '../../redux/users/user.selectors'

import "./sign-in-page.scss";

const SignInPage = ({isAuthenticated}) => {

  if (isAuthenticated) {
    return <Redirect to="/home" />;
  }
  return (
    <div className="sign-in-page">
      <SignIn />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated
})

export default connect(mapStateToProps)(SignInPage);
