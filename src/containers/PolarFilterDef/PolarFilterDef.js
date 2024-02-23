import React, { useState } from 'react';
import './PolarFilterDef.css';
import { PiChartPolarThin } from 'react-icons/pi';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { CiBoxList } from 'react-icons/ci';
import OverlayModal from '../OverlayModal/OverlayModal';
import { generateDescendingArray } from '../../utils/utils';

const PolarFilterDef = ({ showPanel, markers, polarDef, onSetFilterDef }) => {

  const [showModalOverlay, setShowModalOverlay] = useState(false);
  const rangesArr = generateDescendingArray(polarDef.maxRange, polarDef.rangeStep);

  return (
    <div className='polar-wrapper'>
        <div className='polar-element'> 
            <div className='polar-item1'>
                <PiChartPolarThin size={120} className='polar-img' />
            </div>
            <div className='polar-item2'>
                <div style={{display:'flex', justifyContent:'flex-start', alignItems: 'center', gap: '20px', margin:'3px 8px'}}>
                    <p><strong className='polar-attribute'>N° ranges:</strong> {polarDef.numRangeRings}</p>
                    <p><strong className='polar-attribute'>N° Sectors:</strong> {polarDef.sectors}</p>
                </div>
                <div className='ranges-wrapper'>
                    <p><strong className='polar-attribute'>ranges: </strong></p>
                    {rangesArr.map((range, i) => (
                        <div className='range' key={i}>{range}</div>
                    ))}
                </div>
            </div>
        </div>
        <div className='saved-num'>{polarDef.inputsId.length}</div>
        <div style={{flex:1, display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', gap:'3px'}}>
            <button className='action-btn apply' onClick={() => setShowModalOverlay(true)}><CiBoxList size={25} /></button>
            <button className='action-btn delete'><MdOutlineDeleteForever size={25} /></button>
        </div>
        {showModalOverlay && 
            <OverlayModal 
                inputs={markers} 
                showPanel={showPanel}
                filterDef={polarDef} 
                onSetFilterDef={onSetFilterDef}
                onModalClose={() => setShowModalOverlay(false)} 
            />
        }
    </div>
)}

export default PolarFilterDef