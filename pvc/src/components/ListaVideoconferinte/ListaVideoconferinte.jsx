import React from "react";

import Videoconferinta from "../Videoconferinta/Videoconferinta";

import "./ListaVideoconferinte.scss";

const ListaVideoconferinte = () => {
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
      <Videoconferinta />
    </div>
  );
};

export default ListaVideoconferinte;
