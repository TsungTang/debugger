import { MAP_LIST } from '@/components/map/constant';
import dynamic from 'next/dynamic';

import { useState } from 'react';



export default function Home() {
  const [MapType, setMapType] = useState(MAP_LIST.OPEN_STREAT_MAP)
  const Map = dynamic(
    () => import('../components/map'), // replace '@components/map' with your component's location
    { ssr: false } // This line is important. It's what prevents server-side render
  )

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