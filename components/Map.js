import React from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function Map(props) {
  const defaultPosition = [-31.41528, -64.18156];
  const myIcon = new L.Icon({
    iconUrl: '/marker-icon.png',
  });
  return (
    <div className="map__container">
      <MapContainer
        center={defaultPosition}
        zoom={16}
        style={{ height: 400, width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={defaultPosition} icon={myIcon}>
          <Popup>
            Entrá en la galería! <br /> Estamos en frente de Nunatak. <br /> Te
            esperamos!
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Map;
