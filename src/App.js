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
  Circle,
  LayerGroup
} 
from 'react-leaflet';
import L, {  Icon, divIcon, point } from 'leaflet';

import MarkerClusterGroup from 'react-leaflet-cluster';
import { EditControl } from 'react-leaflet-draw';
import { useState } from 'react';
import Grid from './containers/Grid';
import PolarGrid from './containers/PolarGrid';


delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconUrl:require('./img/tower.png'),
  iconSize: [40, 40],
});



function App() {


  /**
   * Grid Properties
   * 
   **/
  const [gridBottomLeft, setGridBottomLeft] = useState([46.20066430916326, 6.141922132426539]);
  const zoomGrid =  19; //max
  const  cellSize = 80; //m
  // const gridSize = 32 //rows
  const xAxis = 14;
  const yAxis = 14;

  const customIcon = new Icon({
    iconUrl: require('./img/tower.png'),
    iconSize: [40, 40], // size of the icon
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


  /** 
  *
  * @Func - for creating shapes
  * @event - e
  * @return - Array []: Coordinates
  * 
  **/
 const _create = (e) => console.log(e);


  return (
    <MapContainer 
      center={[46.20482260019546, 6.14561285199199]} 
      zoom={14}
      maxZoom={17}
      minZoom={11}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer 
        url='http://localhost:3001/tiles/{z}/{x}/{y}.png'
      />

      {/* <Grid
        markerPosition={gridBottomLeft}
        cellSize={cellSize}
        xSize={xAxis}
        ySize={yAxis}
      /> */}

      <PolarGrid />
      <LayersControl position='topright'>
        <LayersControl.Overlay checked name='Marker with pop up'>
          <FeatureGroup>
            <MarkerClusterGroup 
              chunkedLoading
              iconCreateFunction={createCustomIconClusterIcon}
            >
              {markers.map((marker, i) =>(
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
      </LayersControl>

      <FeatureGroup>
        <EditControl 
          position='bottomright' 
          onCreated={_create}
        />
      </FeatureGroup>
    </MapContainer>
  );
}
export default App;