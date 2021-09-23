


import { MapContainer, Marker, Popup, TileLayer, Rectangle } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { useState, useMemo } from 'react';
import { useMap } from 'react-leaflet';
import { useSwitchMap } from './utils';
import { MAP_LIST } from './constant';

/**
 west 119.99689695800005
south 21.895599675000085
east 122.007494458
north 25.300305479000087
 */


const outerBounds = [
  [25.300305479000087, 119.99689695800005],
  [21.895599675000085, 122.007494458],
]

const redColor = { color: 'red' }

function SetBoundsRectangles() {
  const [bounds, setBounds] = useState(outerBounds)
  const map = useMap()

  const outerHandlers = useMemo(
    () => ({
      click() {
        setBounds(outerBounds)
        map.fitBounds(outerBounds)
      },
    }),
    [map],
  )

  return (
    <>
      <Rectangle
        bounds={outerBounds}
        eventHandlers={outerHandlers}
        pathOptions={redColor}
      />

    </>
  )
}



const Map = ({ MapType }) => {
  const { mapInfo } = useSwitchMap(MapType)
  return (
    <MapContainer bounds={outerBounds} center={[23.773, 120.959]} zoom={7} scrollWheelZoom={false} style={{ height: 600, width: "80%" }}>
      <TileLayer
        attribution={mapInfo.attribution}
        url={mapInfo.url}
        time={mapInfo.time}
        tilematrixset={mapInfo.tilematrixset}
        format={mapInfo.format}
        minZoom={mapInfo.minZoom}
        maxZoom={mapInfo.maxZoom}
      />
      <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      <SetBoundsRectangles />

    </MapContainer>
  )
}

export default Map
