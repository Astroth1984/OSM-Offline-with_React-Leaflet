import React from 'react';
import { Circle, Polyline } from 'react-leaflet';
import { calculateIntersection, metersToLat, metersToLng } from '../utils/utils';

const PolarGrid = () => {
  const center = [46.20066430916326, 6.141922132426539];
  const radiusOuter = 233 * 3;
  const radiusInter = 233 * 2;
  const radiusInner = 233;
  const numberOfSectors = 16; // You can adjust this based on your preference for the number of sectors


  // const pathOptions = {
  //   stroke: 'false',
  //   fillOpacity: '0.3',
  //   opacity: '1',
  //   weight: '1',
  //   fillColor: 'rgb(0, 0, 0)',
  //   color: 'rgb(0, 0, 0)',
  // };

  const pathOptions = {
    stroke: 'false',
    fillOpacity: '0.3',
    opacity: '10',
    weight: '2',
    fillColor: 'rgb(125,125,125)',
    color: 'rgba(0,0,0, 0.3)',
  };


  const createCircle = (radius) => {
    return <Circle center={center} radius={radius} pathOptions={pathOptions} />;
  };

  const createSectorLines = () => {
    const lines = [];

    // Adding a horizontal line passing through the center
    const horizontalLine = <Polyline positions={[[center[0] - metersToLat(radiusOuter), center[1]], [center[0] + metersToLat(radiusOuter), center[1]] ]} pathOptions={pathOptions} />;
    lines.push(horizontalLine);

    // Adding a vertical line passing through the center
    const verticalLine = <Polyline positions={[[center[0], center[1] - metersToLng(radiusOuter, center[0])], [center[0], center[1] + metersToLng(radiusOuter, center[0])]]} pathOptions={pathOptions} />;
    lines.push(verticalLine);

    // Tang line
    const tangLine = <Polyline positions={[calculateIntersection(center, radiusOuter, Math.PI/4), calculateIntersection(center, radiusOuter, Math.PI/4 + Math.PI)]} pathOptions={pathOptions} />
    lines.push(tangLine);


    const tangLineTwo = <Polyline positions={[calculateIntersection(center, radiusOuter, -Math.PI/4), calculateIntersection(center, radiusOuter, -Math.PI/4 + Math.PI)]} pathOptions={pathOptions} />
    lines.push(tangLineTwo);



    // const tangLineThree = <Polyline positions={[calculateIntersection(center, radiusOuter, Math.PI/8), calculateIntersection(center, radiusOuter, Math.PI/8 + Math.PI)]} pathOptions={pathOptions} />
    // lines.push(tangLineThree);


    // const tangLineFour = <Polyline positions={[calculateIntersection(center, radiusOuter, -Math.PI/8), calculateIntersection(center, radiusOuter, -Math.PI/8 + Math.PI)]} pathOptions={pathOptions} />
    // lines.push(tangLineFour);


    // const tangLineFive = <Polyline positions={[calculateIntersection(center, radiusOuter, 3* Math.PI/4), calculateIntersection(center, radiusOuter, 3* Math.PI/4 + Math.PI)]} pathOptions={pathOptions} />
    // lines.push(tangLineFive);


    // const tangLineSix = <Polyline positions={[calculateIntersection(center, radiusOuter, -3* Math.PI/4), calculateIntersection(center, radiusOuter, -3* Math.PI/4 + Math.PI)]} pathOptions={pathOptions} />
    // lines.push(tangLineSix);

    return lines;
  };

  return (
    <>
      {createCircle(radiusOuter)}
      {createCircle(radiusInter)}
      {createCircle(radiusInner)}
      {createSectorLines()}
    </>
  );
};

export default PolarGrid;