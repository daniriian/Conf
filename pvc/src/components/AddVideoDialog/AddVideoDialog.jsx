import React, { useEffect } from "react";
import "date-fns";
import { connect } from "react-redux";

import moment from "moment";
import "moment/locale/ro";

import DateFnsUtils from "@date-io/date-fns";
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
import MenuItem from "@material-ui/core/MenuItem";
import Chip from "@material-ui/core/Chip";

import CustomButton from "../../components/custom-button/custom-button";

import {
  getCallersList,
  getConsigneesList,
} from "../../redux/videocallParticipants/participants.actions";

moment.locale("ro")
const locale = "ro"

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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 300,
    },
  },
  getContentAnchorEl: null,
};

const DialogSelect = ({
  callers,
  destinatari,
  getCallersList,
  getConsigneesList,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [caller, setCaller] = React.useState("");
  const [dest, setDest] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [startTime, setStartTime] = React.useState("")
  const [endTime, setEndTime] = React.useState("")

  useEffect(() => {
    getCallersList();
    getConsigneesList();
  }, []);

  const handleCallersChange = (event) => {
    setCaller(event.target.value);
  };

  const handleChangeDestinatari = (event) => {
    setDest(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCaller("");
    setDest([]);
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date)
  }

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
            <MuiPickersUtilsProvider libInstance={moment} utils={MomentUtils} locale={"ro"}>
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
                  id='start-hour'
                  label='Ora inceperii'
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    "aria-label": "change time",
                  }}
                />
              </FormControl>

              <FormControl className={classes.formControl}>
                <KeyboardTimePicker
                  margin='normal'
                  id='end-hour'
                  label='Ora terminarii'
                  value={selectedDate}
                  onChange={handleDateChange}
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
              <InputLabel id='destinatari'>Destinatari</InputLabel>
              <Select
                labelId='destinatari'
                id='destinatari'
                multiple
                value={dest}
                onChange={handleChangeDestinatari}
                input={<Input />}
                MenuProps={MenuProps}
                renderValue={(selected) =>
                  selected.map((value) => (
                    <Chip
                      key={value.id}
                      label={value.nume_instanta}
                      className={classes.chip}
                    />
                  ))
                }
                autoWidth
              >
                {destinatari
                  ? destinatari.map((destinatar) => (
                      <MenuItem
                        key={destinatar.id}
                        value={destinatar}
                        variant='menu'
                      >
                        {destinatar.nume_instanta}
                      </MenuItem>
                    ))
                  : ""}
              </Select>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Renunţă
          </Button>
          <Button onClick={handleClose} color='primary'>
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

export default connect(mapStateToProps, { getCallersList, getConsigneesList })(
  DialogSelect
);
