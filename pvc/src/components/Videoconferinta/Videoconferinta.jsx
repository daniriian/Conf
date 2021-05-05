import React from "react";

import "./Videoconferinta.scss";

const Videoconferinta = ({ videocall }) => {
  const { nume, prenume } = videocall.adaugat_de;

  return (
    <div className='videoconferinta'>
      <ul className='vc-list'>
        <li className='vc-list__item'>{videocall.data}</li>
        <li className='vc-list__item'>
          {videocall.start_time} - {videocall.end_time}
        </li>
        <li className='vc-list__item'>
          {videocall.caller.id_echipament.nume_instanta}
        </li>
        <li className='vc-list__item'>{videocall.call_to[0].beneficiar}</li>
        <li className='vc-list__item'>{videocall.completed}</li>
        <li className='vc-list__item'>
          {nume} {prenume}
        </li>
        <li className='vc-list__item'>{videocall.data}</li>
        <li className='vc-list__item'>{videocall.data}</li>
      </ul>
    </div>
  );
};

export default Videoconferinta;
