import { CircleMarker } from 'react-leaflet'

import { memo, useMemo, useState } from "react"
import { useMap } from 'react-leaflet';
import { _uuid } from '@/utils';

/**
 * @typedef {[[number,number],[number,number]]} outerBoundsType
 */

/**
 * @param {{RectableInfo: {outerBounds:outerBoundsType, color:string, valueArr:[[number,number] ,[number,number]]}}} param0 
 */
function CustomCircleMark({ RectableInfo }) {
  const { outerBounds, color, opacity, valueArr } = RectableInfo
  const [bounds, setBounds] = useState(outerBounds)
  const center = useMemo(() => {
    return [outerBounds[0][0] - ((outerBounds[0][0] - outerBounds[1][0]) / 2), outerBounds[1][1] - ((outerBounds[0][1] - outerBounds[1][1]) / 2)]
  }, [RectableInfo])
  const centerArr = [[center[0] + 0.25, center[1] - 0.25], [center[0] + 0.25, center[1] + 0.25], [center[0] - 0.25, center[1] - 0.25], [center[0] + 0.25, center[1] + 0.25]]

  const valueArrFlat = valueArr.flat()
  const map = useMap()


  return (
    <>
      {centerArr.filter((_, i) => valueArrFlat[i] > 0).map((local, index) => (<CircleMarker key={_uuid()} center={local} color={color}
        fillColor={color}
        fillOpacity={opacity}
        opacity={0}
        radius={valueArrFlat[index] > 100 ? 100 : valueArrFlat[index]} />))
      }
    </>
  )
}


export default memo(CustomCircleMark)
