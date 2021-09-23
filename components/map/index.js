


import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { useSwitchMap } from './utils';
import BoundsRectangles from './BoundRectangles';

/** data */
import { RectanglesData } from './data/bound';
import React from 'react';
import { _uuid } from '@/utils';


const Map = ({ MapType }) => {
  const { mapInfo } = useSwitchMap(MapType)
  return (
    <MapContainer center={[23.773, 120.959]} zoom={7} scrollWheelZoom={true} style={{ height: 600, width: "80%" }}>
      <TileLayer
        attribution={mapInfo.attribution}
        url={mapInfo.url}
        time={mapInfo.time}
        tilematrixset={mapInfo.tilematrixset}
        format={mapInfo.format}
        minZoom={mapInfo.minZoom}
        maxZoom={mapInfo.maxZoom}
      />
      {
        RectanglesData.map(d => <BoundsRectangles key={_uuid()} RectableInfo={{ outerBounds: d.outerBounds, color: "#c9551e", opacity: Math.random() }} />

        )
      }


    </MapContainer>
  )
}
export default React.memo(Map)
