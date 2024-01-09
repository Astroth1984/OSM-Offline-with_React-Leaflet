import React, { useEffect, useReducer, useState } from 'react'
import './FiltersConfigPanel.css'
import markers from '../../data/markers';
import {MdArrowForwardIos, MdArrowBackIos} from 'react-icons/md'

import myTower from '../../img/tower.png';
import {PiChartPolarThin, PiGridNineThin} from 'react-icons/pi'

// const formReducer = (state, event) => {

//     //reset Form Data after Submit
//     if(event.reset) {
//         return {
//             type: '',
//             'cell-size': 0,
//             xAxis: 0,
//             yAxis: 0,
//         }
//     }
//     return {
//         ...state,
//         [event.name]: event.value
//     }
// }
const formReducer = (state, event) => {
    // Reset Form Data after Submit
    if (event.reset) {
        if (state.type === 'polar') {
            return {
                type: '',
                sectors: '',
                ranges: Array(state.ranges.length).fill('')
            };
        } else {
            return {
                type: '',
                'cell-size': 0,
                xAxis: 0,
                yAxis: 0
            };
        }
    }

    // Handle different structures based on type
    if (event.name === 'type') {
        if (event.value === 'polar') {
            return {
                type: 'polar',
                sectors: '',
                ranges: Array(0).fill('')
            };
        } else {
            return {
                type: 'grid',
                'cell-size': 0,
                xAxis: 0,
                yAxis: 0
            };
        }
    }

    return {
        ...state,
        [event.name]: event.value
    };
};

const FiltersConfigPanel = ({ onMarkerSelect, onSubmitForm }) => {

    const [selectedTypeOption, setSelectedTypeOption] = useState('grid');
    const handleOptionChange = (e) => {
        setSelectedTypeOption(e.target.value);
    };

  /**
   * Form Handlers and Properties
   */
  const [formData, setFormData] = useReducer(formReducer, {
    //add default values
    // type: 'grid',
    // 'cell-size': 0,
    // yAxis: 0,
    // xAxis: 0
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();
    setSubmitting(true);

    setTimeout(()=>{
        setSubmitting(false);
        setFormData({
            reset: true,       
        });
    }, 3000);

    onSubmitForm(prev => [...prev, formData]);
  }

  const handleChange = event => {
    const isCheckbox = event.target.type === 'checkbox';
    setFormData({
        name: event.target.name,
        value: isCheckbox ? event.target.checked : event.target.value
    });
  }

  /************************/
  /**************** Polar Grid Form */
  const [numberOfFields, setNumberOfFields] = useState(0);
  const [inputValues, setInputValues] = useState([]);

  const handleNumberChange = (e) => {
    const number = parseInt(e.target.value, 10);
    setNumberOfFields(number);
    setInputValues(Array(number).fill('')); // Initialize inputValues with an array of empty strings
  };

  const handlePolarInputChange = (index, value) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = value;
    setInputValues(newInputValues);
  };
  /****************************/ 

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
            <div className='tabs'>
                <div className={ tabsToggleState === 1 ? 'tab-item active' : 'tab-item'} onClick={() => toggleTab(1)}>
                    Inputs
                </div>
                <div className={ tabsToggleState === 2 ? 'tab-item active' : 'tab-item'} onClick={() => toggleTab(2)}>
                    Add Filter
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
                        {submitting && 
                            <div>
                                You are submitting the following:
                                <ul>
                                    {Object.entries(formData).map(([name, value]) => (
                                        <li key={name}><strong>{name}</strong>:{value.toString()}</li>
                                    ))}
                                </ul>
                            </div>
                        }
                        <form onSubmit={handleSubmit}>
                            <fieldset disabled={submitting} className='input-radio'>
                                <label for="image-grid">
                                    <input
                                        type="radio" 
                                        name='type' 
                                        value='grid'
                                        id="image-grid"
                                        checked={selectedTypeOption === 'grid'}
                                        onChange={handleOptionChange}
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
                        {formData.type}
                    </div>
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