import React from "react";

import Videoconferinta from "../Videoconferinta/Videoconferinta";

import "./ListaVideoconferinte.scss";

const ListaVideoconferinte = () => {
  return (
    <div className='lista'>
      <header className='header'>
        <ul className='header-list'>
          <li className='header-list__item'>Ora</li>
          <li className='header-list__item'>Apelant</li>
          <li className='header-list__item'>Destinatari</li>
        </ul>
      </header>

      <Videoconferinta />
    </div>
  );
};

export default ListaVideoconferinte;
