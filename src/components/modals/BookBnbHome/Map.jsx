import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useEffect } from 'react';

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

function Map({ center }) {
  return (
    <MapContainer center={center || [51.505, -0.09]} zoom={center ? 2 : 4} className='h-[300px]'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      />
      {center && <Marker position={center} />}
      <RecenterMap center={center} />
    </MapContainer>
  );
}

export default memo(Map);
