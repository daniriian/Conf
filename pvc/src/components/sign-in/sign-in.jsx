import React, { useState } from "react";

import { connect } from "react-redux";
import { setCurrentUser } from "../../redux/users/user.actions.js";

import FormInput from "../form-input/form-input";
import CustomButton from "../custom-button/custom-button";
import CSRFToken from "../CSRFToken/CSRFToken";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

import "./sign-in.scss";

const theme = createMuiTheme({
  typography: {
    // ...
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    // ...
  },
  overrides: {
    MuiSelect: {
      select: {
        padding: "1.6rem 1.4rem",
      },
    },
    MuiFormLabel: {
      root: {
        color: "white",
        fontSize: "2rem",
      },
    },
    MuiInputLabel: {
      formControl: {
        top: "-4px",
      },
    },
  },
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2.5),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const SignIn = ({ dispatch }) => {
  const classes = useStyles();
  const [credentials, setCredentials] = useState({
    instanta: "",
    utilizator: "",
    parola: "",
  });

  const { instanta, utilizator, parola } = credentials;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newCredentials = { ...credentials };
    newCredentials[name] = value;
    setCredentials(newCredentials);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(setCurrentUser(instanta, utilizator, parola));
    console.log(credentials);
    setCredentials({
      instanta: "",
      utilizator: "",
      parola: "",
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='sign-in'>
        <h1 className='sign-in__title'>Autentificare</h1>

        <form onSubmit={handleSubmit} className='sign-in-form'>
          <CSRFToken />

          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='instanta'>Instanţa</InputLabel>
            <Select
              labelId='instanta'
              id='instanta'
              name='instanta'
              value={instanta}
              onChange={handleChange}
              label='Instanta'
            >
              <MenuItem value=''>
                <em>Alegeţi din listă</em>
              </MenuItem>
              <MenuItem value={"117"}>Tribunalul Cluj</MenuItem>
              <MenuItem value={"1285"}>Tribunalul Specializat Cluj</MenuItem>
              <MenuItem value={"211"}>Judecatoria Cluj-Napoca</MenuItem>
              <MenuItem value={"219"}>Judecatoria Dej</MenuItem>
              <MenuItem value={"235"}>Judecatoria Gherla</MenuItem>
              <MenuItem value={"242"}>Judecatoria Huedin</MenuItem>
              <MenuItem value={"328"}>Judecatoria Turda</MenuItem>
            </Select>
          </FormControl>

          {/* <FormInput
          type='text'
          name='instanta'
          value={instanta}
          label='Instanta'
          placeholder='Instanta'
          onChange={handleChange}
        /> */}

          <FormInput
            type='text'
            name='utilizator'
            value={utilizator}
            label='Utilizator'
            placeholder='Utilizator'
            onChange={handleChange}
          />

          <FormInput
            type='password'
            name='parola'
            value={parola}
            label='Parola'
            placeholder='Parola'
            onChange={handleChange}
          />

          <CustomButton type='submit' className='sign-in-form__btn'>
            Log in
          </CustomButton>
        </form>
      </div>
    </ThemeProvider>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(SignIn);
