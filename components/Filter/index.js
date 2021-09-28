import { useState } from "react"

import { MenuItem, Select, FormControl, InputLabel, makeStyles, Switch, FormControlLabel } from "@material-ui/core"
// import { COUNTRY_ID_LIST, COUNTRY_NAME_LIST } from "./const";
import { getYearSeason, YearSeasonToDate, _uuid } from "@/utils";

// import CountryContext from "@/context/CountryContext";

import { AiFillFilter } from "react-icons/ai"
import { useOnClickOutside } from "@/hook";
import { APP_COLOR } from "@/const";

const dateArr = [
  "2000-01-01",
  "2000-04-01",
  "2000-07-01",
  "2000-10-01",
  "2001-01-01",
  "2001-04-01",
  "2001-07-01",
  "2001-10-01",
  "2002-01-01",
  "2002-04-01",
  "2002-07-01",
  "2002-10-01",
  "2003-01-01",
  "2003-04-01",
  "2003-07-01",
  "2003-10-01",
  "2004-01-01",
  "2004-04-01",
  "2004-07-01",
  "2004-10-01",
  "2005-01-01",
  "2005-04-01",
  "2005-07-01",
  "2005-10-01",
  "2006-01-01",
  "2006-04-01",
  "2006-07-01",
  "2006-10-01",
  "2007-01-01",
  "2007-04-01",
  "2007-07-01",
  "2007-10-01",
  "2008-01-01",
  "2008-04-01",
  "2008-07-01",
  "2008-10-01",
  "2009-01-01",
  "2009-04-01",
  "2009-07-01",
  "2009-10-01",
  "2010-01-01",
  "2010-04-01",
  "2010-07-01",
  "2010-10-01",
  "2011-01-01",
  "2011-04-01",
  "2011-07-01",
  "2011-10-01",
  "2012-01-01",
  "2012-04-01",
  "2012-07-01",
  "2012-10-01",
  "2013-01-01",
  "2013-04-01",
  "2013-07-01",
  "2013-10-01",
  "2014-01-01",
  "2014-04-01",
  "2014-07-01",
  "2014-10-01",
  "2015-01-01",
  "2015-04-01",
  "2015-07-01",
  "2015-10-01",
  "2016-01-01",
  "2016-04-01",
  "2016-07-01",
  "2016-10-01",
  "2017-01-01",
  "2017-04-01",
  "2017-07-01",
  "2017-10-01",
  "2018-01-01",
  "2018-04-01",
  "2018-07-01",
  "2018-10-01",
  "2019-01-01",
  "2019-04-01",
  "2019-07-01",
  "2019-10-01",
  "2020-01-01",
  "2020-04-01",
  "2020-07-01",
  "2020-10-01",
  "2021-01-01",
  "2021-04-01",
  "2021-07-01"
]

const useStyles = makeStyles({
  select: {
    '&:before': {
      borderColor: 'white',
    },
    '&:after': {
      borderColor: 'white',
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'white',
    },
  },
  // icon: {
  //   fill: APP_COLOR.GREEN_PRIMARY,
  //   fontSize: "22px",

  // },
  root: {
    color: APP_COLOR.DARK_NAVY,
    fontSize: "20px",
    fontWeight: "normal"

  },
})

function DebuggerFilter({ currDate, handleSetCurrDate, showTrack, handleSetShowTrack }) {
  // const [seletCountry, setSelectCountry] = useState("Whole Taiwan")
  // const countryStore = useContext(CountryContext);

  // const handleChange = event => {
  //   setSelectCountry(event.target.value)
  // }
  const [open, setOpen] = useState(true)
  const handleOpen = () => {
    setOpen(!open)
  }

  const localHandleSetCurrDate = e => {
    handleSetCurrDate(e.target.value)
  }

  const yearSeason = getYearSeason(currDate)
  const yearSeasonArr = dateArr.map(el => getYearSeason(el))

  const classes = useStyles()

  return (
    <div className="w-60 h-52 absolute right-[5%] top-[10%] " style={{ zIndex: 999 }}>

      <div onClick={handleOpen} className="flex items-center cursor-pointer bg-white w-[100px] rounded-xl shadow-selector px-2 py-1">
        <AiFillFilter className="text-xl mr-2" />
        <div className="text-xl font-semibold">
          Filter
        </div>
      </div>
      {open && <div className="mt-4 flex flex-col py-2 items-center justify-center bg-white shadow-selector rounded-2xl">
        {/* <div className="text-xl font-medium">Date</div> */}
        <FormControl className="w-[140px] p-2" >
          <InputLabel htmlFor="demo-simple-select">Date</InputLabel>
          <Select
            className={classes.select}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={yearSeason}
            defaultValue={yearSeason}
            onChange={localHandleSetCurrDate}
            inputProps={{
              classes: {
                root: classes.root,
              },
            }}
          >
            {
              yearSeasonArr.map(el => {
                return <MenuItem value={el} key={_uuid()}>{el}</MenuItem >
              })
            }
          </Select>
        </FormControl>

        <FormControlLabel
          control={<Switch size="medium" color={"primary"} checked={showTrack} onChange={handleSetShowTrack} />}
          label="Insect Trail"
        />
      </div>
      }


    </div>
  )
}

export default DebuggerFilter
