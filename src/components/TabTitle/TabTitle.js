import React from 'react';
import './TabTitle.css';

const TabTitle = ({title, length, showTag}) => {
  return (
    <>
        <span className='title'>
            {title}
            {showTag && <div className='saved-num'>{length}</div>}
        </span>
    </>
  )
}

export default TabTitle;