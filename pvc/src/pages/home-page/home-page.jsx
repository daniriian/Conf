import React from "react";
import { withRouter } from "react-router";

import Header from "../../components//header/header";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { userLogOutAsync } from "../../redux/users/user.actions";
import { selectCurrentUser } from "../../redux/users/user.selectors";

const HomePage = ({ dispatch, history, ...currentUser }) => {
  const signOut = () => {
    dispatch(userLogOutAsync());
    console.log("Pushing /login to history");
    history.push("/login");
  };

  console.log("Rendering HomePage");

  return (
    <div>
      <Header />
      <button onClick={signOut}>SIGN OUT</button>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default withRouter(connect(mapStateToProps)(HomePage));
