import InsectContext from "@/context/InsectContext"
import { _uuid } from "@/utils"
import { useContext, useState, useRef } from "react"


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
    fill: APP_COLOR.DARK_NAVY,
    fontSize: "22px",
    marginBottom: "4px",
    '&:hover': {
      fill: APP_COLOR.GREEN_PRIMARY
    }

  },
  root: {
    color: APP_COLOR.DARK_NAVY,
    fontSize: "36px",
    fontWeight: "bold",
    '&:hover': {
      color: APP_COLOR.GREEN_PRIMARY
    }

  },
})

function MapInsectSelector({ featimp }) {
  const classes = useStyles()

  const selector = useRef(null)
  const [openFeatimp, setOpenFeatimp] = useState(false)
  const handelHoverEnterEvent = () => {
    setOpenFeatimp(true)
  }
  const handelHoverLeaveEvent = () => {
    setOpenFeatimp(false)
  }


  const { selectInsect, handleSetSelectInsect } = useContext(InsectContext)
  const resetInsect = (e) => {
    handleSetSelectInsect(e.target.value)
  }
  const INSECTS_LIST = Object.values(INSECTS_TYPE)
  return (
    <div onMouseEnter={handelHoverEnterEvent} onMouseLeave={handelHoverLeaveEvent} ref={selector} className="absolute left-[5%] top-[10%]" style={{ zIndex: 999 }}>
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
      {openFeatimp && (
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
      )
      }


    </div>
  )
}

export default MapInsectSelector
