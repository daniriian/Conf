import React from "react";
import { connect } from "react-redux";

import Logo from "../../assets/logo.png";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ro from "date-fns/locale/ro";

import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectIsAuthenticated,
} from "../../redux/users/user.selectors";
import { userLogOutAsync } from "../../redux/users/user.actions";
import { setSelectedDate } from "../../redux/date/date.actions";
import { selectPickedDate } from "../../redux/date/date.selectors";

import "react-datepicker/dist/react-datepicker.css";
import "./header.scss";

registerLocale("ro", ro);

const Header = ({
  selectedDate,
  currentUser,
  userLogOutAsync,
  setSelectedDate,
}) => {
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <header className='header'>
      <div className='logo'>
        <img src={Logo} alt='videoconferinte-logo' className='logo__img' />
      </div>
      <nav className='nav'>
        <DatePicker
          locale='ro'
          selected={selectedDate}
          dateFormat='dd.MM.yyyy'
          onChange={(date) => handleDateChange(date)}
        />

        <div className='user nav__item'>
          <div className='user__icon'></div>
          <div className='user__name'>
            {currentUser ? (
              <span className='user__name'>{currentUser.utilizator}</span>
            ) : (
              "Vizitator"
            )}
          </div>
        </div>
        <a
          className='nav__item nav__link'
          href='/#'
          onClick={() => userLogOutAsync()}
        >
          sign out
        </a>
      </nav>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedDate: selectPickedDate,
  currentUser: selectCurrentUser,
  isAuthenticated: selectIsAuthenticated,
});

export default connect(mapStateToProps, { userLogOutAsync, setSelectedDate })(
  Header
);
