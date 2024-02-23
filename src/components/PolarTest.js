import React from 'react';
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import "leaflet-semicircle";
import L from "leaflet";

const PolarTest = ({center}) => {

  const map = useMap();

  useEffect(() => {
    if (!map) return;

    L.semiCircle(center, {
      radius: 1500,
      startAngle: 25,
      stopAngle: 75,
    }).addTo(map);


    L.semiCircle(center, {
      radius: 2100,
      startAngle: 25,
      stopAngle: 75,
    }).addTo(map);

  }, [map, center]);

  

  return null;
}

export default PolarTest

