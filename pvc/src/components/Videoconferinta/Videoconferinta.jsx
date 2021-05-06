import React from "react";
import { format_date } from "../../utils//index";

import "./Videoconferinta.scss";

const Videoconferinta = ({ videocall }) => {
  const { nume, prenume } = videocall.adaugat_de;

  const data = format_date(new Date(videocall.data)).ddmmyyyy;
  const start = videocall.start_time.substring(0, 5);
  const end = videocall.end_time.substring(0, 5);

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
