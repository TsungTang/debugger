import SelectBugContainer from './SelectBugContainer';
import { MAP_LIST } from '@/components/map/constant';
import dynamic from 'next/dynamic';

import { useState } from 'react';

import { _uuid } from '@/utils';
import { DISCOVER_STAGE } from './const';


const Map = dynamic(
  () => import('../../components/map'),
  { ssr: false } // This line is important. It's what prevents server-side render
)
export default function Discover() {
  const [selectStage, setSelectStage] = useState(DISCOVER_STAGE.UNSELECT)
  const toMap = () => {
    if (selectStage !== DISCOVER_STAGE.UNSELECT) return
    setSelectStage(DISCOVER_STAGE.SELECT_ONE)
  }
  const [MapType, setMapType] = useState(MAP_LIST.OPEN_STREAT_MAP)
  // const switchNewMap = () => {
  //   MapType === MAP_LIST.OPEN_STREAT_MAP ? setMapType(MAP_LIST.NASA_NIGHT) : setMapType(MAP_LIST.OPEN_STREAT_MAP)
  // }

  return (
    <div>

      <div className="bg-light-green" style={{ minHeight: "calc(100vh - 80px)" }} >
        {selectStage === DISCOVER_STAGE.UNSELECT && (
          <SelectBugContainer toMap={toMap} />
        )}
        {[DISCOVER_STAGE.SELECT_ONE, DISCOVER_STAGE.SELECT_TWO].includes(selectStage) && (
          <Map MapType={MapType} />

        )}

      </div>
    </div>
  )
}

