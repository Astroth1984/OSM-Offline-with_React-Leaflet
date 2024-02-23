import React, { useState } from 'react';
import './GridFilterDef.css';
import { PiGridNineThin } from 'react-icons/pi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { CiBoxList } from 'react-icons/ci';
import OverlayModal from '../OverlayModal/OverlayModal';

const GridFilterDef = ({ showPanel, markers, gridDef, onSetFilterDef }) => {

  const [showModalOverlay, setShowModalOverlay] = useState(false);

  return (
    <div className='grid-wrapper'>
        <div className='grid-element'>
            <div className='item1'>
                <PiGridNineThin 
                    size={120} 
                    className='grid-img' 
                />
            </div>
            <div className='item2'>
                <p>
                    <strong className='grid-attribute'>N° cells xAxis: </strong> 
                    {gridDef.xAxis}
                </p>
                <p>
                    <strong className='grid-attribute'>Cell Size (NM): </strong> 
                    {gridDef.cellSize}
                </p>
            </div>
            <div className='item3'>
                <p>
                    <strong className='grid-attribute'>N° cells yAxis: </strong> 
                    {gridDef.yAxis}
                </p>
            </div>
        </div>
        <div className='saved-num'>{gridDef.inputsId.length}</div>
        <div style={{flex:1, display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', gap:'3px'}}>
                <button className='action-btn apply' onClick={() => setShowModalOverlay(true)}><CiBoxList size={25} /></button>
                <button className='action-btn delete'><MdOutlineDeleteForever size={25} /></button>
        </div>
        {showModalOverlay && 
            <OverlayModal 
                inputs={markers} 
                showPanel={showPanel} 
                filterDef={gridDef}
                onSetFilterDef={onSetFilterDef}
                onModalClose={() => setShowModalOverlay(false)} 
            />
        }
    </div>
)}

export default GridFilterDef