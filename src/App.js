import './App.css';
import { useState } from 'react';
import markers from './markers';

import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, LayersControl, FeatureGroup} from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';

function App() {

  const [showRange, setShowRange] = useState(false);
  const customIcon = new Icon({
    iconUrl: require('./img/tower.png'),
    iconSize: [45, 45], // size of the icon

  });

  //this func should return a divIcon element
  const createCustomIconClusterIcon = (cluster) => {
    // Display what you want inside the Cluster Icon - In my case the number of markers inside the Cluster
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(25,25, true)
    });
  }

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
      <LayersControl position='topright'>
        <LayersControl.Overlay checked name='marker with pop up'>
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
        <LayersControl.Overlay name='Show range'>
          <FeatureGroup>
            <MarkerClusterGroup
              chunkedLoading
              iconCreateFunction={createCustomIconClusterIcon}
            >
              {markers.map((marker, i) =>(
                <CircleMarker 
                  key={i}
                  center={marker.geocode} 
                  pathOptions={marker.pathOptions} 
                  radius={marker.range}
                >
                  <Popup>{marker.popUp}</Popup>
                </CircleMarker>
              ))}
            </MarkerClusterGroup>
          </FeatureGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </MapContainer>
  );
}
export default App;
