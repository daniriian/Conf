import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  deleteVideocallStarted,
  markVideoCall,
} from "../../redux/videoconferinte/videocall.actions";

import { format_date } from "../../utils/index";

import { AiOutlineEdit } from "react-icons/ai";
import { ImBin } from "react-icons/im";

import "./Videoconferinta.scss";

const Videoconferinta = ({
  videocall,
  deleteVideocallStarted,
  markVideoCall,
}) => {
  const { nume, prenume } = videocall.adaugat_de;

  const data = format_date(new Date(videocall.data)).ddmmyyyy;
  const start = videocall.start_time.substring(0, 5);
  const end = videocall.end_time.substring(0, 5);

  const handleDelete = (id) => {
    markVideoCall(id);
    deleteVideocallStarted();
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
              {item.nume_instanta}
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
          <AiOutlineEdit className='icon icon__edit' />
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

export default connect(null, { deleteVideocallStarted, markVideoCall })(
  Videoconferinta
);
