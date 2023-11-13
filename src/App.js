import './App.css';
import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer } from 'react-leaflet';

function App() {
  return (
    <MapContainer center={[50.85045,4.34878]} zoom={13}>
      <TileLayer 
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  );
}

export default App;
