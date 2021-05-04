import React from "react";

import "./Videoconferinta.scss";

const Videoconferinta = () => {
  return (
    <div className='videoconferinta'>
      <ul className='vc-list'>
        <li className='vc-list__item'>Data</li>
        <li className='vc-list__item'>Interval orar</li>
        <li className='vc-list__item'>Apelant</li>
        <li className='vc-list__item'>Destinatari</li>
        <li className='vc-list__item'>Efectuat</li>
        <li className='vc-list__item'>Adăugată de</li>
        <li className='vc-list__item'>Modifică</li>
        <li className='vc-list__item'>Şterge</li>
      </ul>
    </div>
  );
};

export default Videoconferinta;
