import React, { useState } from 'react';
import './FiltersForm.css';

import {PiChartPolarThin, PiGridNineThin} from 'react-icons/pi'
import { v4 } from 'uuid'; 

const FiltersForm = ({onSetGridData, onSetPolarData, polarData, gridData}) => {

    const [formType, setFormType] = useState('');
    const [cellSize, setCellSize] = useState(0);
    const [xAxis, setXAxis] = useState('');
    const [yAxis, setYAxis] = useState('');

    const [isFirstInputSelected, setIsFirstInputSelected] = useState(true);

    const [polarFormState, setPolarFormState] = useState({
        numRangeRings: 0,
        maxRange: 0,
        sectors: 0,
        rangeStep: 0
    });

    const handleTypeChange = (event) => {
        setFormType(event.target.value);
    };

    const handleRadioChange = () => {
        setIsFirstInputSelected((prev) => !prev);
    };

    const handlePolarFormChange = e => {
        const { name, value } = e.target;
        setPolarFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
        if(name === 'numRangeRings') {
            setPolarFormState((prev) => ({
                ...prev,
                maxRange: prev.rangeStep * value
            }));
        }else if (name === 'maxRange') {
            setPolarFormState((prev) => ({
                ...prev,
                rangeStep: value / prev.numRangeRings
            }));
        }else if ( name === 'rangeStep') {
            setPolarFormState((prev) => ({
                ...prev,
                maxRange: value * prev.numRangeRings
            }));
        }
    };

    const handleCreateSubmit = event => {
        event.preventDefault();
        if(formType === 'grid') {
            const gridObject = { 
                filterDefId: v4(), 
                type: 'grid', 
                cellSize, 
                xAxis, 
                yAxis, 
                inputsId: []
            };
            onSetGridData([...gridData, gridObject]);
        }
        if(formType === 'polar') {
            const polarObject = {
                filterDefId: v4(),
                type: formType,
                ...polarFormState,
                inputsId: []
            };
            onSetPolarData([...polarData, polarObject]);
        }
    }

  return (
    <div>
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
                <div className='inputs-wrapper'>
                    <input 
                        className='input-field'
                        type="text" 
                        placeholder="Cell Size" 
                        value={cellSize} 
                        onChange={(e) => setCellSize(e.target.value)} 
                    />
                    <input
                        className='input-field'
                        type="text" 
                        placeholder="N° Cells on X-Axis" 
                        value={xAxis} 
                        onChange={(e) => setXAxis(e.target.value)} 
                    />
                    <input 
                        className='input-field'
                        type="text" 
                        placeholder="N° Cells on Y-Axis" 
                        value={yAxis} 
                        onChange={(e) => setYAxis(e.target.value)} 
                    />
                </div>
            )}
            {formType === 'polar' && (
                <div className='inputs-wrapper'>
                    <input 
                        className='input-field'
                        type='text'
                        placeholder='N° Range Rings'
                        name='numRangeRings'
                        value={polarFormState.numRangeRings}
                        onChange={handlePolarFormChange}
                    />
                    <select
                        className='input-field'
                        type='text'
                        name='sectors'
                        placeholder='Sectors' 
                        value={polarFormState.sectors}
                        onChange={handlePolarFormChange}
                    >
                        <option value="">-- Sectors --</option>
                        <option value={4}>4</option>
                        <option value={8}>8</option>
                        <option value={16}>16</option>
                        <option value={32}>32</option>
                        <option value={64}>64</option>
                        <option value={181}>181</option>
                        <option value={256}>256</option>
                    </select>
                  
                    <div>
                        <label>
                            <input
                                type='radio'
                                value='input1'
                                name='input-radio'
                                checked={isFirstInputSelected}
                                onChange={handleRadioChange}
                            />
                        </label>
                        <input
                            className='input-field'
                            type='text'
                            placeholder='Max Range'
                            name='maxRange' 
                            value={polarFormState.maxRange}
                            disabled={!isFirstInputSelected}
                            onChange={handlePolarFormChange}
                        />
                    
                        <label>
                            <input
                                type='radio'
                                value='input2'
                                name='input-radio'
                                checked={!isFirstInputSelected}
                                onChange={handleRadioChange}
                            />
                        </label>
                        <input
                            className='input-field'
                            type='text'
                            placeholder='Dist between two Rings'
                            name='rangeStep' 
                            value={polarFormState.rangeStep}
                            disabled={isFirstInputSelected}
                            onChange={handlePolarFormChange}
                        />
                    </div>
                </div>
            )}
            <button type='submit' className='form-submit'>Submit</button>
        </form>
    </div>
  )
}

export default FiltersForm