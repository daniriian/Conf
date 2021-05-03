import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {createStructuredSelector} from 'reselect'
import { selectIsAuthenticated } from '../../redux/users/user.selectors'

const ProtectedRoute = ({ component, isAuthenticated }) => {

  const Component = component;
  return isAuthenticated ? <Component /> : <Redirect to={{ pathname: "/login" }} />;
};

const mapStateToProps = createStructuredSelector  ({
  isAuthenticated: selectIsAuthenticated
});

export default connect(mapStateToProps)(ProtectedRoute);
