import { memo } from 'react';
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';



function MapFooter({ ecoData }) {
  return (
    <>
      <div className="absolute left-0 bottom-0 right-0" style={{ height: "100px", zIndex: 999, backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
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
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis stroke="#ACACAC" onClick={e => console.log(e)} dataKey="season" orientation={"top"} />
              <Tooltip />
              <Area type="monotone" dataKey="diversity" stroke="#4AEAD3" fill="#4AEAD3" />
            </AreaChart>
          </ResponsiveContainer>
        }

      </div>
    </>
  )
}




export default memo(MapFooter)
