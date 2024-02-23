import React from 'react';
import './NoResults.css';
import no_data from '../../img/no-data.png';

const NoResults = () => {
  return (
    <>
        <img 
            src={no_data} alt='no-data' 
            className='no-result' 
        />
    </>
  )
}

export default NoResults