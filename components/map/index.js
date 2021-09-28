


import { MapContainer, FeatureGroup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css"
import { EditControl } from "react-leaflet-draw"



import { useSwitchMap } from './utils';
import CustomCircleMark from './CustomCircleMark';

/** data */
import { RectanglesData } from './data/bound';
import React from 'react';
import { _uuid } from '@/utils';
import DebuggerFilter from '../Filter';

const Map = ({ MapType }) => {
  const { mapInfo } = useSwitchMap(MapType)
  return (
    <MapContainer className="relative bg-light-green" center={[23.773, 120.959]} zoom={7} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
      <DebuggerFilter />
      <TileLayer
        attribution={mapInfo.attribution}
        url={mapInfo.url}
        time={mapInfo.time}
        tilematrixset={mapInfo.tilematrixset}
        format={mapInfo.format}
        minZoom={mapInfo.minZoom}
        maxZoom={mapInfo.maxZoom}
      />
      <FeatureGroup>
        <EditControl
          position='topright'
          // onEdited={this._onEditPath}
          // onCreated={this._onCreate}
          // onDeleted={this._onDeleted}
          draw={{
            rectangle: false
          }}
        />
      </FeatureGroup>
      {
        RectanglesData.map(d => <CustomCircleMark key={_uuid()} RectableInfo={{ outerBounds: d.outerBounds, color: "#c9551e", opacity: .2 }} />

        )
      }

    </MapContainer>
  )
}
export default React.memo(Map)
