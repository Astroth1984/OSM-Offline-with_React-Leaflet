import React from 'react';
import './InputMarker.css';
import myTower from '../../img/tower.png';

const InputMarker = ({marker, selectedMarker, handleMarkerClick}) => {

  return (
    <div className={selectedMarker?.id === marker.id ? 'marker-element selected' : 'marker-element'} key={marker.id} onClick={() => handleMarkerClick(marker)}>
        <div className='item11'>
            <img className='marker-img' src={myTower} alt='tower' />
        </div>
        <div className='item22'>
            <p><strong className='marker-attribute'>Name:</strong> {marker.popUp}</p>
            <p><strong className='marker-attribute'>Range:</strong> {marker.range} NM</p>
        </div>
        <div className='item33'>
            <p><strong className='marker-attribute'>Lat:</strong> {marker.geocode[0]}</p>
            <p><strong className='marker-attribute'>Lang:</strong> {marker.geocode[1]}</p>
        </div>
    </div> 
  )
}

export default InputMarker