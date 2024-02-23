import React from 'react';
import './TogglePanelButton.css';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const TogglePanelButton = ({showPanel, onShowPanel}) => {
  return (
    <div 
      className='toggle-left' 
      onClick={() => onShowPanel(!showPanel)}
    >
      <div className='toggle-icon'>
          {showPanel ? 
            <MdArrowBackIos size={25} /> 
            : 
            <MdArrowForwardIos size={25} />
          }
      </div>
    </div>
  )
}

export default TogglePanelButton;