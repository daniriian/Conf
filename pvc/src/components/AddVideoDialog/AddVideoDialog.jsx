import React, { useEffect } from "react";
import "date-fns";
import { connect } from "react-redux";
import { format_date } from "../../utils/index";
import moment from "moment";
import "moment/locale/ro";

import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";

import MomentUtils from "@date-io/moment";

import { createStructuredSelector } from "reselect";
import {
  selectCallers,
  selectConsignees,
} from "../../redux/videocallParticipants/paticipants.selectors";
import { selectCurrentUser } from "../../redux/users/user.selectors";
import { selectPickedDate } from "../../redux/date/date.selectors";
import {
  selectDialogMode,
  selectCurrentVideocall,
  selectVideoCallsList,
} from "../../redux/videoconferinte/videocall.selectors";

import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
/* eslint-disable no-use-before-define */

import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import {
  getCallersList,
  getConsigneesList,
} from "../../redux/videocallParticipants/participants.actions";
import {
  addVidecall,
  addVideocallFail,
  editVideocall,
} from "../../redux/videoconferinte/videocall.actions";

import "./AddVideoDialog.scss";

import { getNextHalfHour } from "../../utils//index";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

moment.locale("ro");

const theme = createMuiTheme({
  typography: {
    // ...
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    // ...
  },
});

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  formControl__Destinatari: {
    margin: theme.spacing(1),
    minWidth: 350,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  chip: {
    margin: 2,
    height: 16,
  },
}));

const DialogSelect = ({
  callers,
  destinatari,
  getCallersList,
  getConsigneesList,
  addVidecall,
  addVideocallFail,
  editVideocall,
  currentUser,
  userSelectedDate,
  dialogMode,
  selectedVideocallId,
  videocallsList,
}) => {
  const classes = useStyles();
  const [caller, setCaller] = React.useState("");
  const [dest, setDest] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(userSelectedDate);
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  useEffect(() => {
    let editVC = null;

    getCallersList();
    getConsigneesList();

    if (dialogMode === "Edit") {
      editVC = videocallsList.find((el) => el.id === selectedVideocallId);
      console.log(editVC);
      setSelectedDate(editVC.data);
      setStartTime(new Date(editVC.data + " " + editVC.start_time));
      setEndTime(new Date(editVC.data + " " + editVC.end_time));

      setCaller(editVC.caller.id);
      setDest(editVC.call_to);
    }
  }, [
    getCallersList,
    getConsigneesList,
    dialogMode,
    videocallsList,
    selectedVideocallId,
  ]);

  const handleCallersChange = (event) => {
    setCaller(event.target.value);
  };

  const handleChangeDestinatari = (value) => {
    setDest(value);
  };

  const handleClose = () => {
    addVideocallFail();
  };

  const handleAdd = () => {
    console.log(startTime, endTime);
    let startTime1 = startTime.getHours() + ":" + startTime.getMinutes();
    let endTime1 = endTime.getHours() + ":" + endTime.getMinutes();
    let call_to = dest.map((el) => el.id);

    if (dialogMode === "Add") {
      addVidecall({
        caller: caller,
        data: selectedDate,
        start_time: startTime1,
        end_time: endTime1,
        call_to: call_to,
        completed: false,
        adaugat_de: currentUser.id,
      });
    } else if (dialogMode === "Edit") {
      console.log("Modifica in baza de date");

      editVideocall({
        id: selectedVideocallId,
        caller: caller,
        data: selectedDate,
        start_time: startTime1,
        end_time: endTime1,
        call_to: call_to,
        completed: false,
        adaugat_de: currentUser.id,
      });
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date._d);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time._d);
    setEndTime(getNextHalfHour(time._d));
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time._d);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open
        onClose={handleClose}
        maxWidth='lg'
        className='datePicker'
      >
        <DialogTitle className='dialog-title'>
          Adaugă o videoconferinţă nouă
        </DialogTitle>
        <DialogContent className='datePicker'>
          <form className={classes.container}>
            <MuiPickersUtilsProvider
              libInstance={moment}
              utils={MomentUtils}
              locale={"ro"}
            >
              <FormControl className={classes.formControl}>
                <KeyboardDatePicker
                  format='DD/MM/yyyy'
                  margin='normal'
                  id='date-picker-inline'
                  label='Selectati data'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change date",
                  }}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <KeyboardTimePicker
                  margin='normal'
                  ampm={false}
                  id='start-hour'
                  label='Ora inceperii'
                  value={startTime}
                  onChange={handleStartTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <KeyboardTimePicker
                  margin='normal'
                  ampm={false}
                  id='end-hour'
                  label='Ora terminarii'
                  value={endTime}
                  onChange={handleEndTimeChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </FormControl>
            </MuiPickersUtilsProvider>

            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='apelant' shrink={caller ? true : false}>
                Apelant
              </InputLabel>
              <Select
                native
                input={<Input id='apelant' />}
                value={caller}
                // defaultValue={caller}
                onChange={handleCallersChange}
              >
                <option aria-label='None' value='' />
                {callers
                  ? callers.map((caller) => (
                      <option key={caller.id} value={caller.id}>
                        {caller.id_echipament.nume_instanta}
                      </option>
                    ))
                  : ""}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl__Destinatari}>
              <Autocomplete
                multiple
                id='destinatari'
                options={destinatari}
                value={dest}
                getOptionSelected={(option) =>
                  dest.find((v) => v.id === option.id)
                }
                disableCloseOnSelect
                getOptionLabel={(option) => option.nume_instanta}
                renderOption={(option, { selected }) => (
                  <React.Fragment>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option.nume_instanta} IP-{option.ip} VMR-{option.vmr}
                  </React.Fragment>
                )}
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant='outlined'
                    label='Destinatari'
                    placeholder='Destinatari'
                  />
                )}
                onChange={(event, value) => handleChangeDestinatari(value)}
              />
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Renunţă
          </Button>
          <Button onClick={handleAdd} color='primary'>
            {dialogMode === "Edit" ? "Salvează" : "Adaugă"}
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  callers: selectCallers,
  destinatari: selectConsignees,
  currentUser: selectCurrentUser,
  userSelectedDate: selectPickedDate,
  dialogMode: selectDialogMode,
  selectedVideocallId: selectCurrentVideocall,
  videocallsList: selectVideoCallsList,
});

export default connect(mapStateToProps, {
  getCallersList,
  getConsigneesList,
  addVidecall,
  addVideocallFail,
  editVideocall,
})(DialogSelect);
