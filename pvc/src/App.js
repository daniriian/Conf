import "./App.css";
import React, { useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

// import Header from "./components/header/header";

import ProtectedRoute from "./components/protectedRoute/protectedRoute";
import SignInPage from "./pages/sign-in-page/sign-in-page.jsx";
import HomePage from "./pages/home-page/home-page";
import AddVideocallPage from "./pages/add-Videocall-page/Add-Videocall";

import { createStructuredSelector } from "reselect";
import { selectIsAuthenticated } from "./redux/users/user.selectors";

import { checkAuthenticated, loadUser } from "./redux/users/user.actions";

const App = ({ isAuthenticated, checkAuthenticated, loadUser }) => {
  useEffect(() => {
    checkAuthenticated();
    loadUser();
  }, [isAuthenticated, checkAuthenticated, loadUser]);

  return (
    <div className='App'>
      <Switch>
        <Route exact path='/' component={HomePage} />

        <ProtectedRoute exact path='/home' component={HomePage} />
        <ProtectedRoute exact path='/adauga' component={AddVideocallPage} />
        <Route exact path='/login' component={SignInPage} />
      </Switch>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps, { checkAuthenticated, loadUser })(App);
