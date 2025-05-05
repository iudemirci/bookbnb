import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { memo } from 'react';

function DetailsMap({ coords }) {
  return (
    <MapContainer center={coords || [51.505, -0.09]} zoom={16} className='!pointer-events-none size-full'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      />
      {coords && <Marker position={coords} />}
    </MapContainer>
  );
}

export default memo(DetailsMap);
