import { 
  Circle,
  Polygon, 
  Polyline,
} from 'react-leaflet';
import { 
  calculateIntersection, 
  generateDescendingArray 
} from '../utils/utils';
import { useState } from 'react';



function generateAngles(beta, theta) {
  if (theta <= beta) {
      console.error("Error: Theta must be greater than beta.");
      return [];
  }

  var numAngles = 16;
  var stepSize = (theta - beta) / (numAngles - 1); // Calculate step size

  var angles = [];
  for (var i = 0; i < numAngles; i++) {
      var angle = beta + i * stepSize;
      angles.push(angle);
  }

  return angles;
}


const generatePositions = (beta, theta, center, range) => {
 const arrOfAngles =  generateAngles(beta, theta);
 const arrOfPositionsOfArc = arrOfAngles.map((angle, i) => {
  return calculateIntersection(center, range, angle);
 });
 return arrOfPositionsOfArc;

}



const PolarGrid = ({center, maxRange, numRanges, rangeStep, sectors }) => {

  // Sorted Array of Rings ranges
  // rangeStep: Distance between two rings
  const sortedRanges = generateDescendingArray(maxRange, rangeStep);

  const pathOptions = {
        stroke: 'false',
        fillOpacity: '0.2',
        opacity: '1',
        weight: '2',
        fillColor: 'rgb(125,125,125)',
        color: 'rgba(0,0,0, 0.5)',
  };


  const [pathOptionsForCells, setPathOptionsForCells] = useState(() => {
    const defaultOptions = {
        stroke: 'false',
        fillOpacity: '0',
        opacity: '0',
        weight: '0',
        fillColor: 'rgb(125,125,125, 0)',
        color: 'rgba(0,0,0, 0)',
    };
    return Array.from({ length: (sortedRanges.length - 1 ) * sectors + sectors }, () => defaultOptions);
  });


  const createCircle = (radius, index) => {
    return <Circle
              key={index}
              center={center} 
              radius={radius} 
              pathOptions={pathOptions}
            />;
  };

  const createSectorLines = () => {
    const lines = [];
    for (let i = 0; i < sectors; i++) {
      const angle = (i * Math.PI) / (sectors / 2);
      const tangLine = (
        <Polyline
          key={`polyline-${i}`}
          positions={[
            calculateIntersection(center, sortedRanges[0], angle),
            calculateIntersection(center, sortedRanges[0], angle + Math.PI),
          ]}
          pathOptions={pathOptions}
        />
      );
      lines.push(tangLine);
    }
    return lines;
  };

  const handleMouseOver = (index, event) => {
      // Change the color to green when hovering with Shift key pressed
      if(event.originalEvent.shiftKey && pathOptionsForCells[index].color !== 'green'){
        setPathOptionsForCells(prevState => {
          const updatedOptions = [...prevState];
          updatedOptions[index] = {
              stroke: 'false',
              fillOpacity: '0.6',
              opacity: '1',
              weight: '0.5',
              fillColor: 'green',
              color: 'green',
          };
          return updatedOptions;
        });
        const clickedPolygon = event.target; // Access the clicked polygon element
        const bounds = clickedPolygon.getBounds(); // Get the bounds of the clicked polygon
        const positions = clickedPolygon.getLatLngs(); // Get the positions of the clicked polygon

        console.log("Clicked Polygon Details:");
        console.log("Bounds:", bounds);
        console.log("Positions:", positions);
        console.log("Polygon Index:", index); 

      }
  };


  const createPolygons = (index) => {
    const lines = [];

    for (let i = 0; i <= sectors; i++) {
      const secondArg = index < sortedRanges.length - 1 
                        ? 
                        generatePositions((i * Math.PI) / (sectors / 2),
                                          ((i+1) * Math.PI) / (sectors / 2), 
                                           center, 
                                           sortedRanges[index + 1]
                        ).reverse() 
                        : 
                        [center];

      const polygonIndex = index * sectors + i;

      const polygonCell = (
        <Polygon 
          positions={[
            ...generatePositions(
                                (i * Math.PI) / (sectors / 2), 
                                ((i+1) * Math.PI) / (sectors / 2), 
                                center, 
                                sortedRanges[index]
                              ),
            ...secondArg
          ]} 
          pathOptions={pathOptionsForCells[polygonIndex]} 
          eventHandlers={{ mouseover: (event) => handleMouseOver(polygonIndex, event)}}
        />
      ) 
      lines.push(polygonCell);
    }
    return lines;
  }


  return (
    <>
      {sortedRanges.map((range, index) => createCircle(range, index))}
      {createSectorLines()}


      {sortedRanges.map((item, index) => {
          return createPolygons(index);
      })}
    </>
  );
};
export default PolarGrid;



