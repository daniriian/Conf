import React, { useEffect } from "react";
import "date-fns";
import { connect } from "react-redux";

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
} from "../../redux/videocallParticipants//paticipants.selectors";

import { makeStyles } from "@material-ui/core/styles";
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

import CustomButton from "../../components/custom-button/custom-button";

import {
  getCallersList,
  getConsigneesList,
} from "../../redux/videocallParticipants/participants.actions";
import { addVidecall } from "../../redux/videoconferinte//videocall.actions";

import { format_date } from "../../utils//index";

const icon = <CheckBoxOutlineBlankIcon fontSize='small' />;
const checkedIcon = <CheckBoxIcon fontSize='small' />;

moment.locale("ro");

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
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [caller, setCaller] = React.useState("");
  const [dest, setDest] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState(new Date());
  const [endTime, setEndTime] = React.useState(new Date());

  useEffect(() => {
    getCallersList();
    getConsigneesList();
  }, []);

  const handleCallersChange = (event) => {
    setCaller(event.target.value);
  };

  const handleChangeDestinatari = (value) => {
    setDest(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCaller("");
    setDest([]);
  };

  const handleAdd = () => {
    let data = format_date(selectedDate).yyyymmdd;
    let startTime1 = startTime.getHours() + ":" + startTime.getMinutes();
    let endTime1 = endTime.getHours() + ":" + endTime.getMinutes();
    let call_to = dest.map((el) => el.id);
    console.log(startTime1, endTime1, call_to);

    addVidecall({
      caller: caller,
      data: data,
      start_time: startTime1,
      end_time: endTime1,
      call_to: call_to,
      completed: false,
      adaugat_de: 2,
    });
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  const handleStartTimeChange = (time) => {
    setStartTime(time);
  };

  const handleEndTimeChange = (time) => {
    setEndTime(time);
  };

  return (
    <React.Fragment>
      <CustomButton onClick={handleClickOpen} className='adauga-vc'>
        Adaugă
      </CustomButton>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        maxWidth='lg'
      >
        <DialogTitle>Adaugă o videoconferinţă nouă</DialogTitle>
        <DialogContent>
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
              <InputLabel htmlFor='apelant'>Apelant</InputLabel>
              <Select
                native
                value={caller}
                onChange={handleCallersChange}
                input={<Input id='apelant' />}
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
                    {option.nume_instanta}
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
            Adaugă
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

const mapStateToProps = createStructuredSelector({
  callers: selectCallers,
  destinatari: selectConsignees,
});

export default connect(mapStateToProps, {
  getCallersList,
  getConsigneesList,
  addVidecall,
})(DialogSelect);
