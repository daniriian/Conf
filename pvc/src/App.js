import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

// import Header from "./components/header/header";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import SignInPage from "./pages/sign-in-page/sign-in-page.jsx";
import HomePage from "./pages/home-page/home-page";

import { getSessionAsync } from "./redux/session/session.actions";

import { createStructuredSelector } from "reselect";
import { selectSession } from "./redux/session/session.selectors";

const App = ({ dispatch, currentUser }) => {
  useEffect(() => {
    console.log("Running useEffect from App.js");
    dispatch(getSessionAsync());
  }, [dispatch]);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route
          exact
          path='/login'
          render={() => (currentUser ? <Redirect to='/' /> : <SignInPage />)}
        />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  csrfToken: selectSession,
});

// const mapDispatchToProps = (dispatch) => ({
//   setCurrentUser: (user) => dispatch(setCurrentUser(user)),
// });

export default connect(mapStateToProps)(App);
