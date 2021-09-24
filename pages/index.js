import DebuggerFilter from '@/components/Filter';
import { MAP_LIST } from '@/components/map/constant';
import dynamic from 'next/dynamic';

import { useState } from 'react';

import { _uuid } from '@/utils';

/*** server */
import { promises as fs } from 'fs'
import path from 'path'


const Map = dynamic(
  () => import('../components/map'),
  { ssr: false } // This line is important. It's what prevents server-side render
)

export default function Home({ countryArr }) {


  const [MapType, setMapType] = useState(MAP_LIST.OPEN_STREAT_MAP)

  const switchNewMap = () => {
    MapType === MAP_LIST.OPEN_STREAT_MAP ? setMapType(MAP_LIST.NASA_NIGHT) : setMapType(MAP_LIST.OPEN_STREAT_MAP)
  }
  return (
    <div>
      <button className=" border-2" onClick={switchNewMap} >switch map</button>
      <Map MapType={MapType} />

      <div className="flex">
        {
          countryArr.map(el => {
            return <div key={_uuid()}>
              <input type="radio" value={el.TOWNENG} name="country" />
              <p>{el.TOWNENG}</p></div>
          })
        }
      </div>

    </div>
  )
}


export async function getStaticProps(context) {
  const dataDirectory = path.join(process.cwd(), 'data/country.json')

  const countryData = await fs.readFile(dataDirectory, 'utf8')
  const countryArr = JSON.parse(countryData)
  return {
    props: {
      countryArr
    },
  }
}
