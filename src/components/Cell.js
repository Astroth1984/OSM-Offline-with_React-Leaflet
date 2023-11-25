// Cell.js
import React, { useEffect, useRef, useState } from 'react';
import { Rectangle } from 'react-leaflet';

const Cell = (props) => {
  const refCell = useRef();
  const [color, setColor] = useState(props.color ? props.color : 'rgb(125,125,125)');


  function trace() {
    console.log.apply(console, arguments);
  }

  useEffect(() => {
    trace('Cell.useEffect[props.color]', props.id, props.color);
    setColor(props.color ? props.color : 'rgb(125,125,125)');
  }, [props.color, props.id]);

  

  const pathOptions = {
    stroke: 'false',
    fillOpacity: props.color ? '0.7' : '0.5',
    opacity: '1.0',
    weight: '2',
    fillColor: color,
    color: color,
  };

  return <Rectangle ref={refCell} bounds={props.bounds} {...pathOptions}  />;

};

export default Cell;