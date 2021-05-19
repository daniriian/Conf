import React from "react";
import { connect } from "react-redux";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import {
  deleteVideocall,
  deleteVideocallFail,
  unMarkVideoCall,
} from "../../redux/videoconferinte/videocall.actions";

import { createStructuredSelector } from "reselect";
import { selectCurrentVideocall } from "../../redux/videoconferinte/videocall.selectors";
import { selectPickedDate } from "../../redux/date/date.selectors";

const theme = createMuiTheme({
  typography: {
    // ...
    // Tell Material-UI what's the font-size on the html element is.
    htmlFontSize: 10,
    // ...
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />;
});

const DeleteVideoDialog = ({
  deleteVideocallFail,
  unMarkVideoCall,
  currentVideocall,
  deleteVideocall,
}) => {
  const handleClose = () => {
    unMarkVideoCall();
    deleteVideocallFail();
  };

  const handleDelete = () => {
    console.log("Delete");
    deleteVideocall(currentVideocall);
  };

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={true}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby='alert-dialog-slide-title'
        aria-describedby='alert-dialog-slide-description'
        disableBackdropClick
      >
        <DialogTitle id='alert-dialog-slide-title'>
          {"Doriţi să ştergeţi această videoconferinţă ?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-slide-description'>
            Această operaţiune este ireversiblă. Apăsaţi ŞTERGE pentru a şterge
            videoconferinţa sau RENUNŢĂ pentru a reveni la ecranul anterior.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='primary'>
            Renunţă
          </Button>
          <Button onClick={handleDelete} color='primary'>
            ŞTERGE
          </Button>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
};

const mapStateToProps = createStructuredSelector({
  currentVideocall: selectCurrentVideocall,
  currentDate: selectPickedDate,
});

export default connect(mapStateToProps, {
  deleteVideocallFail,
  unMarkVideoCall,
  deleteVideocall,
})(DeleteVideoDialog);
