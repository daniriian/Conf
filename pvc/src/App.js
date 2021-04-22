import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import SignInPage from "./pages/sign-in-page/sign-in-page.jsx";

import { getSessionAsync } from "./redux/session/session.actions";
// import { setCurrentUser } from "./redux/users/user.actions";

const App = ({ currentUser, dispatch }) => {
  useEffect(() => {
    dispatch(getSessionAsync());
  }, []);

  return (
    <div className='App'>
      <Switch>
        <Route
          path='/'
          render={() =>
            currentUser ? <Redirect to='/videoconferinte' /> : <SignInPage />
          }
        ></Route>
      </Switch>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

export default connect(mapStateToProps)(App);
