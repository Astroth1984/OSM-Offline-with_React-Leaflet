// Cell.js
import React, { useEffect, useState } from 'react';
import { Rectangle } from 'react-leaflet';

const Cell = (props) => {
  
  const [pathOptions, setPathOptions] = useState({
    stroke: 'false',
    fillOpacity: '0.2',
    opacity: '1',
    weight: '2',
    fillColor: 'rgb(125,125,125)',
    color: 'rgba(0,0,0, 0.5)',
  });

  function trace() {
    console.log.apply(console, arguments);
  }

  useEffect(() => {
    trace('Cell.useEffect[props.color]', props.id, props.color);
  }, [props.color, props.id]);

  const handleMouseOver = (event) => {
    // Check if the Shift key is pressed
    if (event.originalEvent.shiftKey && pathOptions.color !== 'green') {
      // Change the color to green when hovering with Shift key pressed
      setPathOptions(
        {
          stroke: 'false',
          fillOpacity: '0.6',
          opacity: '1',
          weight: '4',
          fillColor: 'green',
          color: 'green',
        }
      );
      console.log(event)
    }
  };

  const handleClick = () => {
    if (pathOptions.fillColor !== 'rgb(125,125,125)') {
      setPathOptions(
        {
          stroke: 'false',
          fillOpacity: '0.2',
          opacity: '1',
          weight: '2',
          fillColor: 'rgb(125,125,125)',
          color: 'rgba(0,0,0, 0.5)',
        }
      );
    }
  };
  return( 
    <Rectangle 
      bounds={props.bounds} 
      pathOptions={pathOptions} 
      eventHandlers={{ mouseover: handleMouseOver, click: handleClick,}}
    />
  )
};
export default Cell;