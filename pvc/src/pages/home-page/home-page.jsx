import React from "react";
import { withRouter } from "react-router";

import { connect } from "react-redux";

import { userLogOutAsync } from "../../redux/users/user.actions";

const HomePage = ({ dispatch, history }) => {
  const signOut = () => {
    console.log("Signing out");
    history.push("/login");
    dispatch(userLogOutAsync());
  };

  return (
    <div>
      This is the HomePage
      <button onClick={signOut}>SIGN OUT</button>
    </div>
  );
};

export default withRouter(connect()(HomePage));
