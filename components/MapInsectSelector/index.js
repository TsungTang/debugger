import { MIDDLE_ENDPOINT } from "@/api/const"
import InsectContext from "@/context/InsectContext"
import { _uuid } from "@/utils"
import { useContext } from "react"

import { AiOutlineDown } from "react-icons/ai"

import { MenuItem, Select, FormControl, makeStyles } from "@material-ui/core"
import { APP_COLOR, INSECTS_TYPE } from "@/const"

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
  icon: {
    fill: APP_COLOR.GREEN_PRIMARY,
    fontSize: "22px",

  },
  root: {
    color: APP_COLOR.GREEN_PRIMARY,
    fontSize: "36px",
    fontWeight: "bold"

  },
})

function MapInsectSelector({ featimp }) {
  const classes = useStyles()

  const { selectInsect, handleSetSelectInsect } = useContext(InsectContext)
  const resetInsect = (e) => {
    handleSetSelectInsect(e.target.value)
  }
  const INSECTS_LIST = Object.values(INSECTS_TYPE)
  return (
    <div className="absolute left-[10%] top-[10%]" style={{ zIndex: 999 }}>

      <FormControl>
        <Select className={classes.select} value={selectInsect}
          defaultValue={selectInsect}
          onChange={resetInsect}
          id="demo-simple-select"
          inputProps={{
            classes: {
              icon: classes.icon,
              root: classes.root,
            },
          }}>
          {
            INSECTS_LIST.map(el => <MenuItem key={_uuid()} value={el}>{el}</MenuItem>)
          }

        </Select>
      </FormControl>
      <div className="bg-white flex items-center px-7 py-4 rounded-2xl shadow-selector cursor-default">
        {
          featimp.map((el, i) => (
            <div className={i !== featimp.length - 1 ? "mr-4" : ""} key={_uuid()}>
              <h2 className="font-bold text-base">{el.name}</h2>
              <div className="font-bold text-[22px] text-center rounded-2xl px-4 py-1 w-full shadow-selector">{el.value}</div>
            </div>)
          )
        }
      </div>

    </div>
  )
}

export default MapInsectSelector
