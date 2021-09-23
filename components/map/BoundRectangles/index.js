import { Rectangle } from 'react-leaflet'

import { useState } from "react"
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
      <Rectangle
        bounds={outerBounds}
        // eventHandlers={outerHandlers}
        color={color}
        fillColor={color}
        fillOpacity={opacity}
        opacity={0}
      />
    </>
  )
}

export default BoundsRectangles
