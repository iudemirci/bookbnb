import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLatlng } from '../../../store/bookbnbSlice.js';

function RecenterMap({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center, map.getZoom());
    }
  }, [center, map]);

  return null;
}

function MapClickHandler({ onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect([lat, lng]);
    },
  });

  return null;
}

function FormMap({ center, form }) {
  const [selectedPoint, setSelectedPoint] = useState(useSelector((state) => state.bookbnb.latlng) || null);
  const dispatch = useDispatch();

  const handleLocationSelect = useCallback(
    (latlng) => {
      setSelectedPoint(latlng);

      form.setFieldValue('location', {
        lat: latlng[0],
        lng: latlng[1],
      });

      dispatch(setLatlng(latlng));
    },
    [form, dispatch],
  );

  return (
    <MapContainer center={center || selectedPoint || [51.505, -0.09]} zoom={center ? 20 : 5} className='h-[250px]'>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'
      />
      <RecenterMap center={center} />
      {selectedPoint && <Marker position={selectedPoint} />}
      <MapClickHandler onLocationSelect={handleLocationSelect} />
    </MapContainer>
  );
}

export default memo(FormMap);
