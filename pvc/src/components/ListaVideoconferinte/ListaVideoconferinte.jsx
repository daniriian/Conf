import React, { useEffect } from "react";
import { connect } from "react-redux";

import { createStructuredSelector } from "reselect";
import { selectVideoCallsList } from "../../redux/videoconferinte/videocall.selectors";

import { getVideoConferenceListByDate } from "../../redux/videoconferinte/videocall.actions";

import Videoconferinta from "../Videoconferinta/Videoconferinta";

import "./ListaVideoconferinte.scss";

const ListaVideoconferinte = ({
  data,
  getVideoConferenceListByDate,
  videoCallsList,
}) => {
  useEffect(() => {
    getVideoConferenceListByDate(data);
  }, [data, getVideoConferenceListByDate]);

  return (
    <div className='lista'>
      <header className='header-container'>
        <ul className='header-list'>
          <li className='header-list__item'>Data</li>
          <li className='header-list__item'>Interval orar</li>
          <li className='header-list__item'>Apelant</li>
          <li className='header-list__item'>Destinatari</li>
          <li className='header-list__item'>Efectuat</li>
          <li className='header-list__item'>Adăugată de</li>
          <li className='header-list__item'>Modifică</li>
          <li className='header-list__item'>Şterge</li>
        </ul>
      </header>
      <div className='h-line'></div>
      {videoCallsList.map((item) => {
        return <Videoconferinta key={item.id} videocall={item} />;
      })}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  videoCallsList: selectVideoCallsList,
});

export default connect(mapStateToProps, { getVideoConferenceListByDate })(
  ListaVideoconferinte
);
