import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CallIcon from "@material-ui/icons/Call";
import CallEndIcon from "@material-ui/icons/CallEnd";

import { selectCurrentUser } from "../../redux/users/user.selectors";

import {
  deleteVideocallStarted,
  markVideoCall,
  editVideocall,
  editVideocallStarted,
} from "../../redux/videoconferinte/videocall.actions";

import {
  callSomebody,
  endCall,
  setCallStarted,
} from "../../redux/call/call.actions";

import { format_date } from "../../utils/index";

import CustomButton from "../custom-button/custom-button";
import { AiOutlineEdit } from "react-icons/ai";
import { ImBin } from "react-icons/im";

import "./Videoconferinta.scss";

const Videoconferinta = ({
  currentUser,
  videocall,
  deleteVideocallStarted,
  editVideocallStarted,
  markVideoCall,
  callSomebody,
  setCallStarted,
  endCall,
}) => {
  const { nume, prenume } = videocall.adaugat_de;

  const data = format_date(new Date(videocall.data)).ddmmyyyy;
  const start = videocall.start_time.substring(0, 5);
  const end = videocall.end_time.substring(0, 5);

  const handleDelete = (id) => {
    markVideoCall(id);
    deleteVideocallStarted();
  };

  const handleEdit = (id) => {
    if (currentUser.id !== videocall.adaugat_de.id) {
      alert(
        "Nu puteţi edita această programare deoarece nu a fost adăgată de dvs. "
      );
    } else {
      editVideocallStarted();
      markVideoCall(id);
    }
  };

  const handleCall = (address) => {
    setCallStarted({
      caller: videocall.caller.id_echipament.ip,
      consignee: address,
    });
    callSomebody(videocall.caller.id_echipament.ip, address);
  };

  const handleEndCall = () => {
    console.log("Ending call");
    endCall(videocall.caller.id_echipament.ip);
    callSomebody(videocall.caller.id_echipament.ip, null);
  };

  return (
    <div className='videoconferinta'>
      <ul className='vc-list'>
        <li className='vc-list__item'>{data}</li>
        <li className='vc-list__item'>
          {start} - {end}
        </li>
        <li className='vc-list__item'>
          {videocall.caller.id_echipament.nume_instanta}
        </li>
        <li className='vc-list__item vc-list__item--column'>
          {videocall.call_to.map((item) => (
            <div key={item.id} className='destinatar'>
              <div className='destinatar__nume'>{item.nume_instanta}</div>
              <div className='destinatar__address'>
                <span>(IP: {item.ip})</span>
                <div className='buttons'>
                  <CustomButton
                    className='icon-button'
                    onClick={() => handleCall(item.ip)}
                  >
                    <CallIcon className='icon-button__call' />
                    IP
                  </CustomButton>
                  <CustomButton
                    className='icon-button'
                    onClick={() => handleCall(item.vmr)}
                  >
                    <CallIcon className='icon-button__call' />
                    VMR
                  </CustomButton>
                  <CustomButton className='icon-button' onClick={handleEndCall}>
                    <CallEndIcon className='icon-button__end-call' />
                  </CustomButton>
                </div>
              </div>
              <div className='destinatar__address'>
                <span>(VMR: {item.vmr})</span>
                <div className='buttons'>
                  {/* <CustomButton className='icon-button'>
                    <CallEndIcon className='icon-button__end-call' />
                  </CustomButton> */}
                </div>
              </div>
            </div>
          ))}
        </li>
        <li className='vc-list__item'>
          {videocall.completed} {videocall.id}
        </li>
        <li className='vc-list__item'>
          {nume} {prenume}
        </li>
        <li className='vc-list__item'>
          <AiOutlineEdit
            className='icon icon__edit'
            onClick={() => handleEdit(videocall.id)}
          />
        </li>
        <li className='vc-list__item'>
          <ImBin
            className='icon icon__delete'
            onClick={() => handleDelete(videocall.id)}
          />
        </li>
      </ul>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

export default connect(mapStateToProps, {
  deleteVideocallStarted,
  markVideoCall,
  editVideocall,
  editVideocallStarted,
  callSomebody,
  setCallStarted,
  endCall,
})(Videoconferinta);
