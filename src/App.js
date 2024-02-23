import './App.css';
import markers from './data/markers';

import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { 
  MapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  LayersControl, 
  FeatureGroup,
  Circle
} 
from 'react-leaflet';
import L, {  Icon, divIcon, point } from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';
import { EditControl } from 'react-leaflet-draw';
import { useEffect, useState } from 'react';
import Grid from './containers/Grid';
import PolarGrid from './containers/PolarGrid';
import FiltersConfigPanel from './containers/FiltersPanel/FiltersConfigPanel';
import { useMappedInputs } from './utils/useMappedInputs';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl:require('./img/tower.png'),
  iconSize: [40, 40],
});


//divIcon element
const createCustomIconClusterIcon = (cluster) => {
  // Display what you want inside the Cluster Icon - In my case the number of markers inside the Cluster
  return new divIcon({
    html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
    className: "custom-marker-cluster",
    iconSize: point(25,25, true)
  });
}

const customIcon = new Icon({
  iconUrl: require('./img/tower.png'),
  iconSize: [40, 40], // size of the icon
});


function App() {

  const [center, setCenter] = useState([46.20482260019546, 6.14561285199199]);
  const [selectedMarker, setSelectedMarker] = useState(null);

  const [gridData, setGridData] = useState([]);
  const [polarData, setPolarData] = useState([]);


  const appliedGrids = useMappedInputs(gridData, markers);
  const appliedPolars = useMappedInputs(polarData, markers);

  // Function to handle selected marker fromConfiguration Panel
  const handleMarkerSelect = (marker) => {
    setSelectedMarker(marker);
    setCenter(selectedMarker?.geocode);
    console.log(center);
    
  };

  /** 
  *
  * @Func - for creating shapes
  * @event - e
  * @return - Array []: Coordinates
  * 
  **/
 const _create = (e) => console.log(e);

 useEffect(() => {
  console.log('this is applied grid data in App ', appliedGrids)
 }, [appliedGrids])


  return (

    <>

      <FiltersConfigPanel 
        onMarkerSelect={handleMarkerSelect}
        gridData={gridData}
        polarData={polarData}
        onSetGridData={setGridData}
        onSetPolarData={setPolarData}
      />

      <MapContainer 
        center={center} 
        zoom={14}
        maxZoom={17}
        minZoom={11}
        style={{ height: '100vh', width: '100%' }}
      >
        <TileLayer 
          url='http://localhost:3001/tiles/{z}/{x}/{y}.png'
        />

        <LayersControl position='topright'>
          <LayersControl.Overlay checked name='Marker with pop up'>
            <FeatureGroup>
              <MarkerClusterGroup 
                chunkedLoading
                iconCreateFunction={createCustomIconClusterIcon}
              >
                {markers.map((marker, i) => (
                  <Marker 
                    key={i}
                    position={marker.geocode}
                    icon={customIcon}
                  >
                    <Popup>{marker.popUp}</Popup>
                  </Marker>
                ))}
              </MarkerClusterGroup>
            </FeatureGroup>
          </LayersControl.Overlay>
          <LayersControl.Overlay checked name='Show range'>
            <FeatureGroup>
              <MarkerClusterGroup
                chunkedLoading
                iconCreateFunction={createCustomIconClusterIcon}
              >
                {markers.map((marker, i) =>(
                  <Circle
                    key={i}
                    center={marker.geocode} 
                    pathOptions={marker.pathOptions} 
                    radius={marker.range}
                  >
                  </Circle>
                ))}
              </MarkerClusterGroup>
            </FeatureGroup>
          </LayersControl.Overlay>
          {appliedGrids.length !== 0 && 
            appliedGrids.map((appliedGrid, index) => (
              <LayersControl.Overlay checked name={`grid - ${ index+1 }`}>
                <FeatureGroup>
                  <Grid
                    key={index}
                    markerPosition={appliedGrid.center}
                    cellSize={appliedGrid.filterDef.cellSize}
                    xSize={appliedGrid.filterDef.xAxis}
                    ySize={appliedGrid.filterDef.yAxis}
                  />
                </FeatureGroup>
              </LayersControl.Overlay>
            ))
          }
          {appliedPolars.map((appliedPolar, index) => (
            <LayersControl.Overlay checked name={`polar - ${ index+1 }`}>
              <FeatureGroup>
                  <PolarGrid
                    key={index}
                    center={appliedPolar.center}
                    maxRange={appliedPolar.filterDef.maxRange}
                    rangeStep={appliedPolar.filterDef.rangeStep}
                    sectors={appliedPolar.filterDef.sectors}
                  />
              </FeatureGroup>
            </LayersControl.Overlay>
          ))}
        </LayersControl>

        <FeatureGroup>
          <EditControl 
            position='bottomright' 
            onCreated={_create}
          />
        </FeatureGroup>
      </MapContainer>
    </>
    
  );
}
export default App;