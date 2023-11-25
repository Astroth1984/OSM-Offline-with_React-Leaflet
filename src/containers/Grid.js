import React, { useEffect, useState } from 'react';
import Cell from '../components/Cell';
import { metersToLat, metersToLng } from '../utils/utils';

const Grid = ({ markerPosition, cellSize, xSize, ySize }) => {
  const [grid, setGrid] = useState([]);

  function trace() {
    console.log.apply(console, arguments);
  }


  useEffect(() => {
    trace('Grid coordinates', grid);
  }, [grid]);

  useEffect(() => {
    if (markerPosition.length === 0) return;

    const lat = markerPosition[0];
    const lng = markerPosition[1];

    const newGrid = [];

    for (let i = -xSize / 2; i <= xSize / 2; i++) {
      for (let j = -ySize / 2; j <= ySize / 2; j++) {
        const newLat = lat + metersToLat(cellSize) * i;
        const newLng = lng + metersToLng(cellSize * j, lat);

        const id = `{${i},${j}}`;
        newGrid.push({
          id: id,
          position: [newLat, newLng],
          bounds: [
            [newLat - metersToLat(cellSize / 2), newLng - metersToLng(cellSize / 2, newLat)],
            [newLat + metersToLat(cellSize / 2), newLng + metersToLng(cellSize / 2, newLat)],
          ],
        });
      }
    }
    setGrid(newGrid);
  }, [markerPosition, cellSize, xSize, ySize]);

  return grid.map((item) => (
    <Cell key={item.id} color={item.color} bounds={item.bounds} />
  ));
};

export default Grid;