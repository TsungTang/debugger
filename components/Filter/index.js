import { useState, useContext } from "react"
import { MenuItem, Select, FormControl } from "@material-ui/core"
import { COUNTRY_ID_LIST, COUNTRY_NAME_LIST } from "./const";
import { _uuid } from "@/utils";

import CountryContext from "@/context/CountryContext";

import { AiFillFilter } from "react-icons/ai"

function DebuggerFilter() {
  const [seletCountry, setSelectCountry] = useState("Whole Taiwan")
  const countryStore = useContext(CountryContext);

  const handleChange = event => {
    setSelectCountry(event.target.value)
  }

  const countryKeys = Object.keys(COUNTRY_NAME_LIST)


  return (
    <div className="w-60 h-52 absolute right-[10%] top-[10%] bg-white cursor-default" style={{ zIndex: 999 }}>
      <AiFillFilter />
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
            defaultValue={"Whole Taiwan"}
            onChange={handleChange}
          >
            <MenuItem value={"Whole Taiwan"}>Whole Taiwan</MenuItem>
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
