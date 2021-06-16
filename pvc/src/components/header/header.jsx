import React from "react";
import { connect } from "react-redux";

import Logo from "../../assets/logo.png";

import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import moment from "moment";
import "moment/locale/ro";
import MomentUtils from "@date-io/moment";

import { registerLocale } from "react-datepicker";
import ro from "date-fns/locale/ro";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

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

const theme = createMuiTheme({
  typography: {
    // ...
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    // ...
  },
  overrides: {
    MuiPickersDay: {
      current: {
        color: "red",
      },
    },
  },
});

const Header = ({
  selectedDate,
  currentUser,
  userLogOutAsync,
  setSelectedDate,
}) => {
  const handleDateChange = (date) => {
    if (date) {
      console.log(date._d);
      setSelectedDate(date._d);
    }
    // else {
    //   console.log("Data invalida");
    //   console.log(new Date("1900-01-01"));
    //   setSelectedDate(new Date("1900-01-01"));
    // }
  };

  return (
    <header className='header'>
      <a href='/home' className='logo'>
        <img src={Logo} alt='videoconferinte-logo' className='logo__img' />
      </a>
      <nav className='nav'>
        <ThemeProvider theme={theme}>
          <MuiPickersUtilsProvider
            libInstance={moment}
            utils={MomentUtils}
            locale={"ro"}
          >
            <KeyboardDatePicker
              format='DD.MM.yyyy'
              className='date-picker'
              id='date-picker-inline'
              label='Selectati data'
              value={selectedDate}
              onChange={(date) => handleDateChange(date)}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>
        </ThemeProvider>

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
