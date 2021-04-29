import React from 'react';

const Spinner = ({show}) => {
  return show ? (
    <div className="spinner__container">
        <div className="spinner"></div>
    </div>
  ): ("")
}

export default Spinner;