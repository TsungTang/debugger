import { MAP_LIST } from '@/components/map/constant';
import dynamic from 'next/dynamic';

import { useState } from 'react';

import { _uuid } from '@/utils';


const Map = dynamic(
  () => import('../../components/map'),
  { ssr: false } // This line is important. It's what prevents server-side render
)

export default function Discover() {

  const [MapType, setMapType] = useState(MAP_LIST.OPEN_STREAT_MAP)

  const switchNewMap = () => {
    MapType === MAP_LIST.OPEN_STREAT_MAP ? setMapType(MAP_LIST.NASA_NIGHT) : setMapType(MAP_LIST.OPEN_STREAT_MAP)
  }

  return (
    <div>
      <button className=" border-2" onClick={switchNewMap} >switch map</button>
      <Map MapType={MapType} />
    </div>
  )
}

