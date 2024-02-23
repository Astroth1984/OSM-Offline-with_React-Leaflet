// PolarCell.js
import React, { useState } from 'react';
import { Polygon, Polyline } from 'react-leaflet';

const PolarCell = ({ points }) => {

    const [pathOptions, setPathOptions] = useState({
        stroke: 'false',
        fillOpacity: '0.2',
        opacity: '1',
        weight: '2',
        fillColor: 'rgb(125,125,125)',
        color: 'rgba(0,0,0, 0.5)',
      });

      const handleMouseOver = (event) => {
        // Check if the Shift key is pressed
        if (event.originalEvent.shiftKey) {
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
        }
      };


  return <Polygon positions={points} pathOptions={pathOptions} eventHandlers={{mouseover: handleMouseOver}} />;
};

export default PolarCell;