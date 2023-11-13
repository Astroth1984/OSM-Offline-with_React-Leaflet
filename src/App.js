import './App.css';
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker } from 'react-leaflet';

function App() {

  //Add Markers
  const markers = [
    {
      geocode: [50.88371959155463, 4.430784796696851],
      popUp: "Eurocontrol, I work here"
    },
    {
      geocode: [50.8448954625438, 4.341385083201939],
      popUp: "My Crush lives here. If you see her, say Hello!"
    },
    {
      geocode: [50.887359986154515, 4.34168158017839],
      popUp : "This is a Marker pop-up"
    }
  ]
  return (
    <MapContainer center={[50.85045,4.34878]} zoom={13}>
      <TileLayer 
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {markers.map((marker, i) => (
        <Marker 
          key={i}
          position={marker.geocode}
        >

        </Marker>
      ))}
    </MapContainer>
  );
}

export default App;
