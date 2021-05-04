import React from "react";
import { Redirect } from "react-router-dom";

import Header from "../../components//header/header";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { userLogOutAsync } from "../../redux/users/user.actions";
import { selectIsAuthenticated } from "../../redux/users/user.selectors";

const HomePage = ({ dispatch, isAuthenticated }) => {
  const signOut = () => {
    dispatch(userLogOutAsync());
    console.log("Pushing /login to history");
    // history.push("/login");
  };

  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
      <Header />
      <button onClick={signOut}>SIGN OUT</button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps)(HomePage);
