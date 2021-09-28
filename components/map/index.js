


import { MapContainer, Tooltip, TileLayer, Polyline, CircleMarker } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css"
// import { EditControl } from "react-leaflet-draw"


import { useSwitchMap } from './utils';
import CustomCircleMark from './CustomCircleMark';

/** data */
import { RectanglesData } from './data/bound';
import React, { useContext, useState } from 'react';
import { _uuid } from '@/utils';
import DebuggerFilter from '../Filter';
import MapFooter from '@/pages/discover/MapFooter';

import useSWR from 'swr';
import { FetchBioDist, FetchBioTrack, FetchEcoDiv } from '@/api';
import { MIDDLE_ENDPOINT } from '@/api/const';
import InsectContext from '@/context/InsectContext';
import { APP_COLOR } from '@/const';
import MapInsectSelector from '../MapInsectSelector';

const Map = ({ MapType }) => {
  const { mapInfo } = useSwitchMap(MapType)

  const [currDate, setCurrDate] = useState("2020-01-01")
  const { selectInsect } = useContext(InsectContext)
  const payload = { name: selectInsect[0], polygon: [...Array(2940).keys()], date: currDate }
  const { data, error } = useSWR(MIDDLE_ENDPOINT.BIODIST + JSON.stringify(payload), () => FetchBioDist(payload))

  /** eco div */
  const ecoPayload = { ...payload, polygon: [...Array(2940).keys()] }
  const { data: ecoData, error: ecoError } = useSWR(MIDDLE_ENDPOINT.ECODIV + JSON.stringify(ecoPayload), () => FetchEcoDiv(ecoPayload))


  /** bio track */
  const { data: trackData } = useSWR(MIDDLE_ENDPOINT.BIOTRACK + JSON.stringify(payload), () => FetchBioTrack(payload))

  return (
    <MapContainer className="relative bg-light-green" center={[23.773, 120.959]} zoom={8} scrollWheelZoom={true} style={{ height: "calc(100vh - 80px)", width: "100%" }}>
      <DebuggerFilter />
      {data && <MapInsectSelector featimp={data.featimp} />}
      <MapFooter ecoData={ecoData} />

      <TileLayer
        attribution={mapInfo.attribution}
        url={mapInfo.url}
        time={mapInfo.time}
        tilematrixset={mapInfo.tilematrixset}
        format={mapInfo.format}
        minZoom={mapInfo.minZoom}
        maxZoom={mapInfo.maxZoom}
      />
      {/* <FeatureGroup>
        <EditControl
          position='topright'
          draw={{
            rectangle: false
          }}
        />
      </FeatureGroup> */}

      {data && !data.all_zero &&
        RectanglesData.map((d, i) => <CustomCircleMark key={_uuid()} RectableInfo={{ outerBounds: d.outerBounds, color: APP_COLOR.GREEN_PRIMARY, opacity: .2, valueArr: data.heatmap[i].heatmap }} />

        )
      }
      {
        trackData && <Polyline pathOptions={{ color: APP_COLOR.HIGHTLIGHT_GREEN }} positions={trackData.axis} />
      }
      {
        trackData && trackData.axis.map((axis, i) => (
          <CircleMarker key={_uuid()} center={axis} pathOptions={{ color: APP_COLOR.HIGHTLIGHT_GREEN }}
            radius={5} fillOpacity={1}>
            <Tooltip>{trackData.date[i]}</Tooltip>
          </CircleMarker>
        ))
      }
    </MapContainer>
  )
}
export default React.memo(Map)
