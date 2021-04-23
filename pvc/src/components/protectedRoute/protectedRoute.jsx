import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const ProtectedRoute = ({ component, currentUser }) => {
  const Component = component;
  return currentUser ? <Component /> : <Redirect to={{ pathname: "/login" }} />;
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(ProtectedRoute);
