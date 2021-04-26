import React from "react";
import { connect } from "react-redux";

import Logo from "../../assets/logo.png";
import DatePicker from "react-datepicker";
import { registerLocale } from "react-datepicker";
import ro from "date-fns/locale/ro";

import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/users/user.selectors";
import { selectPickedDate } from "../../redux//date/date.selectors";

import "react-datepicker/dist/react-datepicker.css";
import "./header.scss";

registerLocale("ro", ro);

const Header = ({ selectedDate, currentUser: { utilizator, instanta } }) => {
  console.log(utilizator, instanta);
  return (
    <header className='header'>
      <div className='logo'>
        <img src={Logo} alt='videoconferinte-logo' className='logo__img' />
      </div>
      <nav className='nav'></nav>

      <DatePicker locale='ro' selected={selectedDate} dateFormat='dd.MM.yyyy' />

      <div className='user'>
        <div className='user__icon'></div>
        <span className='user__name'>{utilizator}</span>
        {/* <span className='user__instanta'>{instanta.nume}</span> */}
      </div>
    </header>
  );
};

const mapStateToProps = createStructuredSelector({
  selectedDate: selectPickedDate,
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps)(Header);
