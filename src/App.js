import './App.css';
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker, Popup} from 'react-leaflet';
import { Icon, divIcon, point } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';



function App() {

  //Add Markers
  const markers = [
    {
      geocode: [46.2097824357196, 6.139475957830832],
      popUp: "I work here"
    },
    {
      geocode: [46.20066430916326, 6.141922132426539],
      popUp: "My Crush lives here. If you see her, say Hello!"
    },
    {
      geocode: [46.20033757285177, 6.166340963156938],
      popUp : "This is a Marker pop-up"
    },
    {
      geocode: [46.19190116548555, 6.163336889092037],
      popUp : "This is a Marker pop-up"
    }
  ];

  const customIcon = new Icon({
    iconUrl: require('./img/tower.png'),
    iconSize: [45, 45] // size of the icon
  });

  //this func should return a divIcon element
  const createCustomIconClusterIcon = (cluster) => {
    // Display what you want inside the Cluster Icon - In my case the number of markers inside the Cluster
    return new divIcon({
      html: `<div class="cluster-icon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(25,25, true),
      
    })
  }


  return (

    <MapContainer 
      center={[46.20482260019546, 6.14561285199199]} 
      zoom={14}
      maxZoom={16}
      minZoom={11}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer 
        url='http://localhost:3001/tiles/{z}/{x}/{y}.png'
      />

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
      
    </MapContainer>

  );
}

export default App;
