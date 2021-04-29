import React from 'react';

const Spinner = ({show}) => {
  return show ? (
    <div className="spinner__container">
        <div className="circle1"></div>
        <div className="circle2"></div>
        <div className="circle3"></div>
        <div className="circle4"></div>
        <div className="circle5"></div>
    </div>
  ): ("")
}

export default Spinner;