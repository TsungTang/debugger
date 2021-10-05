import { memo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Label, Tooltip, ResponsiveContainer, linearGradient, defs } from 'recharts';

import { HiChevronDoubleUp, HiChevronDoubleDown } from "react-icons/hi"


function MapFooter({ ecoData, expand, handleExpand }) {

  return (
    <>
      <div className="absolute left-0 bottom-0 right-0" style={{ height: expand ? "250px" : "100px", zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
        <div onClick={handleExpand} className="absolute text-3xl font-bold right-2 cursor-pointer" style={{ bottom: expand ? "260px" : "110px", zIndex: 999 }} >{expand ? <HiChevronDoubleDown /> : <HiChevronDoubleUp />}</div>
        {ecoData &&
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              cursor="pointer"
              onClick={e => console.log(e)}
              width={500}
              height={400}
              data={ecoData.diversity}
              margin={{
                top: 10,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="colorDiversity" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4AEAD3" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#4AEAD3" stopOpacity={0} />
                </linearGradient>
              </defs>

              <XAxis stroke="#ACACAC" onClick={e => console.log(e)} dataKey="season" orientation={"top"} />
              <YAxis stroke="#ACACAC"><Label angle={-90} position='insideLeft' offset={10}
                value="Diversity"
                style={{ textAnchor: 'middle', fontSize: '12px', fill: '#ACACAC' }} /></YAxis>
              <Tooltip />
              <Area type="monotone" dataKey="diversity" stroke="#4AEAD3" fillOpacity={1} fill="url(#colorDiversity)" />
            </AreaChart>
          </ResponsiveContainer>
        }

      </div>
    </>
  )
}




export default memo(MapFooter)
