import React, { useState } from 'react';
import './OverlayModal.css';
import myTower from '../../img/tower.png';

import { IoMdCloseCircle } from 'react-icons/io';

const OverlayModal = ({ inputs, showPanel, onModalClose, filterDef, onSetFilterDef }) => {

    const [inputsId, setInputsId] = useState([...filterDef.inputsId]);

    const handleCheckboxSelect = (e) => {

        if(e.target.checked) {
            setInputsId([...inputsId, e.target.value]);    
        } else {
            setInputsId(inputsId.filter(id => id !== e.target.value))
        }
    }

    const handleSelectedInputs = () => {
        onSetFilterDef((prevState) => 
            prevState.map((filter) => 
                filter.filterDefId === filterDef.filterDefId ? 
                    {...filter, inputsId: inputsId} : 
                    filter
            )
        )

    }

    console.log(JSON.stringify(inputsId))

  return (
    <div className={`overlay ${showPanel ? 'panel-visible' : 'panel-hidden'}`}>
        <IoMdCloseCircle 
            className='overlay-modal-btn-close' 
            size={30} 
            onClick={onModalClose} 
        />
        <div className='overlay-modal'>
            {inputs.map((input, i) => (
                <div key={i} className={filterDef.inputsId.includes(parseInt(input.id).toString()) ? 'overlay-modal-item opacity-layer' : 'overlay-modal-item' }>
                    <img className='modal-img' src={myTower} alt='tower' />
                    <div className='checkbox-id'>{input.id}</div>
                    <div className='checkbox-popup'>{input.popUp}</div>
                    {!filterDef.inputsId.includes(parseInt(input.id).toString()) &&
                        <input 
                            className='checkbox' 
                            type='checkbox' 
                            value={input.id} 
                            onChange={handleCheckboxSelect}
                            // disabled={filterDef.inputsId.includes(parseInt(input.id).toString()) && filterDef.inputsId.length !== 0}
                            // checked={filterDef.inputsId.includes(parseInt(input.id).toString()) ? true : false}
                        />
                    }
                </div>
            ))}
            {showPanel && (
                <div className='overlay-modal-footer'>
                    <button className='overlay-modal-btn' onClick={handleSelectedInputs}>Apply</button>
                </div>
            )}
        </div>
    </div>
)}

export default OverlayModal