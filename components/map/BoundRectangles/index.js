import { CircleMarker } from 'react-leaflet'

import { memo, useMemo, useState } from "react"
import { useMap } from 'react-leaflet';

/**
 * @typedef {[[number,number],[number,number]]} outerBoundsType
 */

/**
 * @param {{RectableInfo: {outerBounds:outerBoundsType, color:string}}} param0 
 */
function BoundsRectangles({ RectableInfo }) {
  const { outerBounds, color, opacity } = RectableInfo
  const [bounds, setBounds] = useState(outerBounds)
  const center = useMemo(() => {
    return [outerBounds[0][0] - ((outerBounds[0][0] - outerBounds[1][0]) / 2), outerBounds[1][1] - ((outerBounds[0][1] - outerBounds[1][1]) / 2)]
  })
  const map = useMap()

  // const outerHandlers = useMemo(
  //   () => ({
  //     click() {
  //       setBounds(outerBounds)
  //       map.fitBounds(outerBounds)
  //     },
  //   }),
  //   [map],
  // )

  return (
    <>
      <CircleMarker center={center} color={color}
        fillColor={color}
        fillOpacity={opacity}
        opacity={0}
        radius={Math.random() * 10} />
      {/* <Rectangle
        bounds={outerBounds}
        // eventHandlers={outerHandlers}
        color={color}
        fillColor={color}
        fillOpacity={opacity}
        opacity={0}
      /> */}
    </>
  )
}

export default memo(BoundsRectangles)
