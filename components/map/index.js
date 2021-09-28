


import { MapContainer, FeatureGroup, TileLayer } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css"
import { EditControl } from "react-leaflet-draw"



import { useSwitchMap } from './utils';
import CustomCircleMark from './CustomCircleMark';

/** data */
import { RectanglesData } from './data/bound';
import React, { useContext } from 'react';
import { _uuid } from '@/utils';
import DebuggerFilter from '../Filter';

import useSWR from 'swr';
import { FetchBioDist } from '@/api';
import { MIDDLE_ENDPOINT } from '@/api/const';
import InsectContext from '@/context/InsectContext';
import { APP_COLOR } from '@/const';

const Map = ({ MapType }) => {
  const { mapInfo } = useSwitchMap(MapType)

  const { selectInsect } = useContext(InsectContext)
  const payload = { name: selectInsect[0], polygon: [], date: "2020-01-01" }
  const { data, error } = useSWR(MIDDLE_ENDPOINT.BIODIST, () => FetchBioDist(payload))
  return (
    <MapContainer className="relative bg-light-green" center={[23.773, 120.959]} zoom={7} scrollWheelZoom={true} style={{ height: "calc(100vh - 80px)", width: "100%" }}>
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
          draw={{
            rectangle: false
          }}
        />
      </FeatureGroup>
      {data &&
        RectanglesData.map((d, i) => <CustomCircleMark key={_uuid()} RectableInfo={{ outerBounds: d.outerBounds, color: APP_COLOR.GREEN_PRIMARY, opacity: .2, valueArr: data.heatmap[i].heatmap }} />

        )
      }

    </MapContainer>
  )
}
export default React.memo(Map)
