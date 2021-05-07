import React from "react";

import CustomButton from "../../components/custom-button//custom-button";

import "./Add-Videocall.scss";

const AddVideocallPage = () => {
  const handleAdauga = (e) => {
    console.log("Adauga");
  };

  return (
    <div className='page'>
      <h1 className='page__title page__title--center'>
        Adăugare Videoconferinţă
      </h1>
      <form className='form'>
        <div className='form__group'>
          {/* select element for APELANT */}
          <select name='apelant' id='apelant' className='form__select'>
            <option value=''>Selectati un apelant</option>
            <option value='TRCJ'>TRCJ - sala 31</option>
          </select>

          {/* select element for DESTINATARI */}
          <select
            data-placeholder='Selectati destinatarul apelului'
            name='destinatari'
            id='destinatari'
            className='form__select form__select--multi'
            multiple='multiple'
            // size='10'
          >
            <option></option>
            <option>Penitenciarul Gherla T1</option>
            <option>Penitenciarul Gherla T1</option>
          </select>
        </div>

        <CustomButton onClick={handleAdauga} className='form__button'>
          <span>Adauga</span>
        </CustomButton>
      </form>
    </div>
  );
};

export default AddVideocallPage;
