import React, { useEffect } from "react";
import { connect } from "react-redux";

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
import CustomButton from "../../components/custom-button/custom-button";

import {
  getCallersList,
  getConsigneeSList,
} from "../../redux/videocallParticipants/participants.actions";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
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
}));

const DialogSelect = ({
  callers,
  destinatari,
  getCallersList,
  getConsigneeSList,
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [age, setAge] = React.useState("");

  useEffect(() => {
    console.log("Mounting DialogSelect");
  }, []);

  const handleChange = (event) => {
    setAge(Number(event.target.value) || "");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCallersClick = () => {
    getCallersList();
  };

  const handleConsigneesClick = () => {
    getConsigneeSList();
  };

  const handleClose = () => {
    setOpen(false);
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
      >
        <DialogTitle>Adaugă o videoconferinţă nouă</DialogTitle>
        <DialogContent>
          <form className={classes.container}>
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor='apelant'>Apelant</InputLabel>
              <Select
                native
                value={age}
                onChange={handleChange}
                onClick={handleCallersClick}
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
                native
                labelId='destinatari'
                id='destinatari'
                value='-'
                // onChange={handleChange}
                onClick={handleConsigneesClick}
                input={<Input id='destinatari' />}
              >
                <option aria-label='None' value='' />
                {destinatari
                  ? destinatari.map((destinatar) => (
                      <option key={destinatar.id} value={destinatar.id}>
                        {destinatar.nume_instanta}
                      </option>
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

export default connect(mapStateToProps, { getCallersList, getConsigneeSList })(
  DialogSelect
);
