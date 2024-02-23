import React, { useEffect, useState } from 'react'
import './FiltersConfigPanel.css'
import markers from '../../data/markers'; 

import { FaList } from 'react-icons/fa';
import { MdOutlineAddBox } from 'react-icons/md';

import InputMarker from '../../components/InputMarker/InputMarker';
import TabTitle from '../../components/TabTitle/TabTitle';
import FiltersForm from '../FiltersForm/FiltersForm';
import GridFilterDef from '../GridFilterDef/GridFilterDef';
import PolarFilterDef from '../PolarFilterDef/PolarFilterDef';
import TogglePanelButton from '../../components/TogglePanelButton/TogglePanelButton';
import NoResults from '../../components/NoResults/NoResults';

const FiltersConfigPanel = ({ onMarkerSelect, gridData, onSetGridData, polarData, onSetPolarData }) => {
   
    const [showFrom, setShowForm] = useState(true);
    const [showFiltersList, setShowFiltersList] = useState(false);
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

    useEffect(() => {
        console.log(JSON.stringify(gridData))
        console.log(JSON.stringify(polarData))
    }, [gridData, polarData]);


    
  return (
    <>
        <TogglePanelButton 
            showPanel={showPanel}
            onShowPanel={setShowPanel}
        />

        <div className={`tab-container ${showPanel ? 'panel-visible' : 'panel-hidden'}`}>
            <div className='tabs'>
                <div 
                    className={ tabsToggleState === 1 ? 'tab-item active' : 'tab-item'} 
                    onClick={() => toggleTab(1)}
                >
                    <TabTitle 
                        title='Sensors' 
                        showTag={true} 
                        length={markers.length} 
                    />
                </div>
                <div 
                    className={ tabsToggleState === 2 ? 'tab-item active' : 'tab-item'} 
                    onClick={() => toggleTab(2)}
                >
                    <TabTitle
                        title='Add Filter'
                        showTag={true}
                        length={polarData.length + gridData.length}
                    />
                </div>
                <div 
                    className={ tabsToggleState === 3 ? 'tab-item active' : 'tab-item'} 
                    onClick={() => toggleTab(3)}
                >
                    <TabTitle
                        title='Saved Filters'
                        showTag={true}
                        length={8}
                    />
                </div>
            </div>
            <div className='tabs-content'>
                <div className={ tabsToggleState === 1 ? 'tab-content' : 'tab-pane'}>
                    {markers.map((marker, i) => (
                        <InputMarker 
                            key={i} 
                            marker={marker} 
                            selectedMarker={selectedMarker} 
                            handleMarkerClick={handleMarkerClick} 
                            onMarkerSelect={onMarkerSelect} 
                        />
                    ))}  
                </div>
                <div className={ tabsToggleState === 2 ? 'tab-content' : 'tab-pane'}>
                    <div className='wrapper'>
                        <div style={{marginBottom:'10px', padding:'5px 0px'}}>
                            <button  
                                className='nav-btn add' 
                                disabled={showFrom} 
                                onClick={() => {setShowForm(true); setShowFiltersList(false)}}
                            >
                                <MdOutlineAddBox size={20} />
                            </button>
                            <button 
                                className='nav-btn list' 
                                onClick={() => {setShowForm(false); setShowFiltersList(true)}} 
                                disabled={showFiltersList}
                            >
                                <FaList size={20} />
                            </button>
                        </div>

                        {showFrom && (
                            <FiltersForm
                                polarData={polarData}
                                gridData={gridData}
                                onSetGridData={onSetGridData}
                                onSetPolarData={onSetPolarData}
                            />
                        )}
                    </div>

                    {showFiltersList && (
                        <>
                            {gridData.length === 0 && polarData.length === 0 && (
                                <NoResults />
                            )}
                            {gridData?.map((gridDef, i) => (
                                <GridFilterDef 
                                    key={i}
                                    showPanel={showPanel}
                                    markers={markers}
                                    gridDef={gridDef}
                                    onSetFilterDef={onSetGridData}
                                />
                            ))} 
                            {polarData?.map((polarDef, i) => (
                                <PolarFilterDef 
                                    key={i}
                                    showPanel={showPanel}
                                    markers={markers}
                                    polarDef={polarDef}
                                    onSetFilterDef={onSetPolarData}
                                />
                            ))}
                        </>
                    )}
                </div>
                <div className={ tabsToggleState === 3 ? 'tab-content' : 'tab-pane'}>
                    <NoResults />
                </div>
            </div>
        </div>
    </>
  )
}

export default FiltersConfigPanel;