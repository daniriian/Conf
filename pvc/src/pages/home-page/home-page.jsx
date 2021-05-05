import React from "react";
import { Redirect } from "react-router-dom";

import Header from "../../components/header/header";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import { selectIsAuthenticated } from "../../redux/users/user.selectors";
import { selectPickedDate } from "../../redux/date/date.selectors";

import ListaVideoconferinte from "../../components/ListaVideoconferinte/ListaVideoconferinte";

import { format_date } from "../../utils/index";

import "./home-page.scss";

const HomePage = ({ isAuthenticated, selectedDate }) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  return (
    <div>
      <Header />
      <section className='videoconferinte'>
        <h1 className='title'>
          Lista videoconferinţelor din data:
          <span className='videoconferinte__data'>
            {format_date(selectedDate).ddmmyyy}
          </span>
        </h1>
        <ListaVideoconferinte data={selectedDate} />
      </section>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  selectedDate: selectPickedDate,
});

export default connect(mapStateToProps)(HomePage);
