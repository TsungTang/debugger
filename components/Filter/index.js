import { useState } from "react"
import { MenuItem, Select, FormControl } from "@material-ui/core"
import { COUNTRY_ID_LIST, COUNTRY_NAME_LIST } from "./const";
import { _uuid } from "@/utils";



function DebuggerFilter() {
  const [seletCountry, setSelectCountry] = useState("All Taiwan")

  const handleChange = event => {
    setSelectCountry(event.target.value)
  }

  const countryKeys = Object.keys(COUNTRY_NAME_LIST)


  return (
    <div className="w-60 h-52 absolute right-[10%] top-[10%] bg-white cursor-default" style={{ zIndex: 999 }}>
      <div className="text-2xl font-semibold">
        Filter Tool
      </div>
      <div className="flex items-centet justify-around">
        <div className="text-xl font-medium">Location</div>
        <FormControl >
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={seletCountry}
            defaultValue={"All Taiwan"}
            onChange={handleChange}
          >
            <MenuItem value={"All Taiwan"}>All Taiwan</MenuItem>
            {
              countryKeys.map(el => {
                return <MenuItem value={COUNTRY_NAME_LIST[el]} key={_uuid()}>{COUNTRY_NAME_LIST[el]}</MenuItem >
              })
            }
          </Select>
        </FormControl>
      </div>



    </div>
  )
}

export default DebuggerFilter
