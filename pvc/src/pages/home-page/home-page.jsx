import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import Header from "../../components/header/header";
import ListaVideoconferinte from "../../components/ListaVideoconferinte/ListaVideoconferinte";
import CustomButton from "../../components/custom-button/custom-button";
import DialogSelect from "../../components/AddVideoDialog/AddVideoDialog";

import { selectIsAuthenticated } from "../../redux/users/user.selectors";
import { selectPickedDate } from "../../redux/date/date.selectors";
import { addVideocallStarted } from "../../redux/videoconferinte/videocall.actions";
import { selectAddDialogStatus } from "../../redux/videoconferinte/videocall.selectors";

import { format_date } from "../../utils/index";

import "./home-page.scss";

const HomePage = ({
  isAuthenticated,
  selectedDate,
  addVideocallStarted,
  open,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/login' />;
  }

  const handleClickOpen = () => {
    addVideocallStarted();
  };

  return (
    <div>
      <Header />
      <section className='videoconferinte'>
        <h1 className='title'>
          Lista videoconferinţelor din data:
          <span className='videoconferinte__data'>
            {format_date(selectedDate).ddmmyyyy}
          </span>
        </h1>
        <ListaVideoconferinte data={selectedDate} />
      </section>

      <CustomButton onClick={handleClickOpen} className='adauga-vc'>
        Adaugă
      </CustomButton>

      {open ? <DialogSelect /> : ""}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isAuthenticated: selectIsAuthenticated,
  selectedDate: selectPickedDate,
  open: selectAddDialogStatus,
});

export default connect(mapStateToProps, { addVideocallStarted })(HomePage);
