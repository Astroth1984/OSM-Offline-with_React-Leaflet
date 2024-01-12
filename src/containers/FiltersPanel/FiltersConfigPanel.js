import React, { useEffect, useReducer, useState } from 'react'
import './FiltersConfigPanel.css'
import markers from '../../data/markers';
import { v4 as uuidv4, v4 } from 'uuid'; 

import myTower from '../../img/tower.png';
import {PiChartPolarThin, PiGridNineThin} from 'react-icons/pi'
import { CiBoxList } from 'react-icons/ci';
import { FaList } from 'react-icons/fa';
import { MdOutlineDeleteForever, MdOutlineAddBox, MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';


const FiltersConfigPanel = ({ onMarkerSelect, onSubmitForm }) => {

  /**
   * Form Handlers and Properties
   */
//   const [formData, setFormData] = useReducer(formReducer, {
//     //add default values
//     // type: 'grid',
//     // 'cell-size': 0,
//     // yAxis: 0,
//     // xAxis: 0
//   });
//   const [submitting, setSubmitting] = useState(false);

//   const handleSubmit = event => {
//     event.preventDefault();
//     setSubmitting(true);

//     setTimeout(()=>{
//         setSubmitting(false);
//         setFormData({
//             reset: true,       
//         });
//     }, 3000);

//     onSubmitForm(prev => [...prev, formData]);
//   }

//   const handleChange = event => {
//     const isCheckbox = event.target.type === 'checkbox';
//     setFormData({
//         name: event.target.name,
//         value: isCheckbox ? event.target.checked : event.target.value
//     });
//   }

  /************************/
  /**************** Polar Grid Form */
//   const [numberOfFields, setNumberOfFields] = useState(0);
//   const [inputValues, setInputValues] = useState([]);

//   const handleNumberChange = (e) => {
//     const number = parseInt(e.target.value, 10);
//     setNumberOfFields(number);
//     setInputValues(Array(number).fill('')); // Initialize inputValues with an array of empty strings
//   };

//   const handlePolarInputChange = (index, value) => {
//     const newInputValues = [...inputValues];
//     newInputValues[index] = value;
//     setInputValues(newInputValues);
//   };


    const [formType, setFormType] = useState('grid');
    const [cellSize, setCellSize] = useState(0);
    const [xAxis, setXAxis] = useState('');
    const [yAxis, setYAxis] = useState('');
    const [numRanges, setNumRanges] = useState(0);
    const [rangesValues, setRangesValues] = useState([]);
    const [gridData, setGridData] = useState([]);
    const [polarData, setPolarData] = useState([]);


    const handleTypeChange = (event) => {
        setFormType(event.target.value);
    };

    const handleNumberChange = (e) => {
        const number = parseInt(e.target.value, 10);
        setNumRanges(number);
        setRangesValues(Array(number).fill('')); // Initialize inputValues with an array of empty strings
    };

    const handlePolarInputChange = (index, value) => {
        const newInputValues = [...rangesValues];
        newInputValues[index] = value;
        setRangesValues(newInputValues);
    };

    const handleCreateSubmit = event => {
        event.preventDefault();
        if(formType === 'grid') {
            const gridObject = { filterId: v4() , type: 'grid', cellSize, xAxis, yAxis };
            setGridData([...gridData, gridObject]);
        }
        if(formType === 'polar') {
            const polarObject = { filterId: v4(), type: 'polar', numRanges, rangesValues: [...rangesValues.sort((a, b) => b - a)] };
            setPolarData([...polarData, polarObject]);
        }

        gridData.map(grid => console.log(JSON.stringify(grid)));
    }
  /****************************/ 

  const [showFrom, setShowForm] = useState(true);
  const [showFiltersList, setShowFiltersList] = useState(false);

  const [showModalOverlay, setShowModalOverlay] = useState(false);
  const [showPanel, setShowPanel] = useState(false);

  const [selectedMarker, setSelectedMarker] = useState(null);

  // Tabs toggle state
  const [tabsToggleState, setTabsToggleState] = useState(1);

  const toggleTab = (index) => {
    setTabsToggleState(index);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    onMarkerSelect(marker);
  };

  useEffect(() => {
    console.log(selectedMarker);
  }, [selectedMarker]);


  return (
    <>
        
        <div className='toggle-left' onClick={() => setShowPanel(!showPanel)}>
            <div style={{position:'absolute', right: '10px', bottom: '18px'}}>
                {showPanel ? <MdArrowBackIos size={25} /> : <MdArrowForwardIos size={25} />}
            </div>
        </div>

        

        <div className={`tab-container ${showPanel ? 'panel-visible' : 'panel-hidden'}`}>
            
            {showModalOverlay && (

                <div className={`overlay ${showPanel ? 'panel-visible' : 'panel-hidden'}`} onClick={() => setShowModalOverlay(false)}>
                    <div className='overlay-modal'>
                        {markers.map((marker, i) => (
                            <div className='overlay-modal-item'>
                                <img className='marker-img' src={myTower} alt='tower' />
                                <div style={{flex:1}}>{marker.id}</div>
                                <div style={{flex:3}}>{marker.popUp}</div>
                                <input style={{flex:1}} type='checkbox' checked disabled />
                            </div>
                        ))}
                        {
                            showPanel && (
                                <div className='overlay-modal-footer'>
                                    <button className='overlay-modal-btn'>Apply</button>
                                </div>
                            )
                        } 
                    </div>
                </div>
            )}
            <div className='tabs'>
                <div className={ tabsToggleState === 1 ? 'tab-item active' : 'tab-item'} onClick={() => toggleTab(1)}>
                    Inputs
                </div>
                <div className={ tabsToggleState === 2 ? 'tab-item active' : 'tab-item'} onClick={() => toggleTab(2)}>
                    <span style={{display:'flex', justifyContent: 'center', alignItems:'center', gap:'8px'}}>Add Filter<div className='saved-num'>{polarData.length + gridData.length}</div></span>
                </div>
                <div className={ tabsToggleState === 3 ? 'tab-item active' : 'tab-item'} onClick={() => toggleTab(3)}>
                    <span style={{display:'flex', justifyContent: 'center', alignItems:'center', gap:'8px'}}>Saved Filters <div className='saved-num'>12</div></span>
                </div>
            </div>
            <div className='tabs-content'>
                <div className={ tabsToggleState === 1 ? 'tab-content' : 'tab-pane'}>
                    {markers.map((marker, i) => (
                        <>
                            <div className={selectedMarker?.id === marker.id ? 'marker-element selected' : 'marker-element'} key={marker.id} onClick={() => handleMarkerClick(marker)}>
                                <div className='item1'>
                                    <img className='marker-img' src={myTower} alt='tower' />
                                </div>
                                <div className='item2'>
                                    <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>Name:</strong> {marker.popUp}</p>
                                    <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>Range:</strong> {marker.range} NM</p>
                                </div>
                                <div className='item3'>
                                    <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>Lat:</strong> {marker.geocode[0]}</p>
                                    <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>Lang:</strong> {marker.geocode[1]}</p>
                                </div>
                            </div> 
                      </>
                    ))}  
                </div>
                <div className={ tabsToggleState === 2 ? 'tab-content' : 'tab-pane'}>
                    <div className='wrapper'>
                        <div style={{marginBottom:'10px', padding:'5px 0px'}}>
                            <button  className='nav-btn add' disabled={showFrom} onClick={() => {setShowForm(true); setShowFiltersList(false)}}><MdOutlineAddBox size={20} /></button>
                            <button className='nav-btn list' onClick={() => {setShowForm(false); setShowFiltersList(true)}} disabled={showFiltersList}><FaList size={20} /></button>
                        </div>
                        {/* {submitting && 
                            <div>
                                You are submitting the following:
                                <ul>
                                    {Object.entries(formData).map(([name, value]) => (
                                        <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                                    ))}
                                </ul>
                            </div>
                        } */}
                        {/* <form onSubmit={handleSubmit}>
                            <fieldset disabled={submitting} className='input-radio'>
                                <label for="image-grid">
                                    <input
                                        type="radio" 
                                        name='type' 
                                        value='grid'
                                        id="image-grid"
                                        checked={selectedTypeOption === 'grid'}
                                        onChange={handle    OptionChange}
                                    />
                                    <PiGridNineThin size={60} className='filter-icon' />
                                </label>

                                <label for="image-polar">
                                    <input
                                        type="radio" 
                                        name='type' 
                                        value='polar'
                                        id="image-polar"
                                        checked={selectedTypeOption === 'polar'}
                                        onChange={handleOptionChange} 
                                    />
                                    <PiChartPolarThin size={60} className='filter-icon' />
                                </label>
                            </fieldset>
                            {selectedTypeOption === 'grid' ?
                                (
                                    <>
                                        <fieldset disabled={submitting}>
                                            <label>
                                                <p>Cell Size (NM)</p>
                                                <input type='number' step='1' name="cell-size" onChange={handleChange} value={formData['cell-size'] || 0} />
                                            </label>
                                        </fieldset>
                                        <fieldset disabled={submitting}>
                                            <label>
                                                <p>N° Cells xAxis</p>
                                                <input name="xAxis" onChange={handleChange} value={formData.xAxis || 0} />
                                            </label>
                                            <label>
                                                <p>N° Cells yAxis</p>
                                                <input name="yAxis" onChange={handleChange} value={formData.yAxis || 0} />
                                            </label>
                                        </fieldset>
                                    </>
                                ) :
                                (
                                    <>
                                        <fieldset>
                                            <label>
                                                Number of sectors:
                                                <input
                                                    name="sectors"
                                                    type="number"
                                                    value={numberOfFields}
                                                    onChange={handleNumberChange}
                                                />
                                            </label>
                                        </fieldset>
                                        <fieldset>
                                            {inputValues.map((value, index) => (
                                                <div key={index}>
                                                    <label>
                                                        Field {index + 1}:
                                                        <input
                                                            name={`sector${index}`}
                                                            type="text"
                                                            value={value}
                                                            onChange={(e) => handlePolarInputChange(index, e.target.value)}
                                                        />
                                                    </label>
                                                </div>
                                            ))}
                                        </fieldset>
                                    </>
                                )
                            }
                            <button type='submit' disabled={submitting}>Submit</button>
                        </form>
                        {formData.type} */}
                        {showFrom && (
                            <form onSubmit={handleCreateSubmit}>
                                <fieldset className='input-radio'>
                                    <label for="image-grid">
                                        <input 
                                            id='image-grid'
                                            type='radio' 
                                            value='grid' 
                                            name='type' 
                                            checked={formType === 'grid'} 
                                            onChange={handleTypeChange} 
                                        />
                                        <PiGridNineThin size={60} className='filter-icon' />
                                    </label>
                                    <label for="image-polar">
                                        <input 
                                            id='image-polar'
                                            type='radio' 
                                            value='polar' 
                                            name='type' 
                                            checked={formType === 'polar'} 
                                            onChange={handleTypeChange} 
                                        />
                                        <PiChartPolarThin size={60} className='filter-icon' />
                                    </label>
                                </fieldset>
                                

                                {formType === 'grid' && (
                                    <div>
                                        <input 
                                            type="text" 
                                            placeholder="Cell Size" 
                                            value={cellSize} 
                                            onChange={(e) => setCellSize(e.target.value)} 
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="N° Cells on X-Axis" 
                                            value={xAxis} 
                                            onChange={(e) => setXAxis(e.target.value)} 
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="N° Cells on Y-Axis" 
                                            value={yAxis} 
                                            onChange={(e) => setYAxis(e.target.value)} 
                                        />
                                    </div>
                                )}
                                {formType === 'polar' && (
                                    <div>
                                        <input 
                                            type="number" 
                                            placeholder="Number of ranges" 
                                            value={numRanges} 
                                            onChange={handleNumberChange} 
                                        />
                                        {rangesValues.map((value, index) => (
                                            <input 
                                                key={index} 
                                                type="text" 
                                                placeholder={`Range ${index}`}
                                                onChange={(e) => handlePolarInputChange(index, e.target.value)}
                                            />
                                        ))}
                                    </div>
                                )}
                                <button type='submit'>Submit</button>
                            </form>
                        )}
                    </div>

                    {showFiltersList && (
                        <>
                            {gridData.map((grid, i) => (
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <div className='marker-element' key={i} style={{flex:5}}>
                                        <div className='item1'>
                                            <PiGridNineThin size={120} className='marker-img' style={{padding:0, margin:0}} />
                                        </div>
                                        <div className='item2'>
                                            <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>N° cells xAxis:</strong> {grid.xAxis}</p>
                                            <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>Cell Size (NM):</strong> {grid.cellSize}</p>
                                        </div>
                                        <div className='item3'>
                                            <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>N° cells yAxis:</strong> {grid.yAxis}</p>
                                        </div>
                                    </div>
                                    <div style={{flex:1, display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', gap:'3px'}}>
                                            <button className='action-btn apply' onClick={() => setShowModalOverlay(true)}><CiBoxList size={25} /></button>
                                            <button className='action-btn delete'><MdOutlineDeleteForever size={25} /></button>
                                    </div>
                            </div>
                            ))} 
                            {polarData.map((polar, i) => (
                                <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
                                    <div className='marker-element' key={i} style={{flex:5}}> 
                                        <div className='item1'>
                                            <PiChartPolarThin size={120} className='marker-img' style={{padding:0, margin:0}} />
                                        </div>
                                        <div className='item2'>
                                            <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>N° ranges:</strong> {polar.numRanges}</p>
                                                <div style={{display:'flex', alignItems:'center', gap:'5px', margin:'3px 0'}}>
                                                    <p><strong style={{fontSize: '14px', color: 'rgb(40, 116, 252)'}}>ranges: </strong></p>
                                                    {polar.rangesValues.map((range, i) => (<div className='range' key={i}>{range}</div>))}
                                                </div>
                                        </div>
                                    </div>
                                    <div style={{flex:1, display:'flex', flexDirection:'column',justifyContent:'center', alignItems:'center', gap:'3px'}}>
                                        <button className='action-btn apply' onClick={() => setShowModalOverlay(true)}><CiBoxList size={25} /></button>
                                        <button className='action-btn delete'><MdOutlineDeleteForever size={25} /></button>
        
                                    </div>
                                    
                                </div>
                            ))}
                        </>
                    )}
                </div>
                <div className={ tabsToggleState === 3 ? 'tab-content' : 'tab-pane'}>
                    Saved Static Filters Goes here
                </div>
            </div>
        </div>
    </>
  )
}

export default FiltersConfigPanel;