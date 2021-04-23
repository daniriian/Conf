import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import SignInPage from "./pages/sign-in-page/sign-in-page.jsx";
import HomePage from "./pages/home-page/home-page";

import { getSessionAsync } from "./redux/session/session.actions";
// import { setCurrentUser } from "./redux/users/user.actions";

const App = ({ currentUser, dispatch }) => {
  useEffect(() => {
    dispatch(getSessionAsync());
  }, [dispatch]);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/login' component={SignInPage}></Route>
        <ProtectedRoute path='/' component={HomePage}></ProtectedRoute>
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
