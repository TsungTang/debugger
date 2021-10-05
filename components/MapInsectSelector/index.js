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
    backgroundColor: APP_COLOR.LIGHT_GREEN,
    fontSize: "36px",
    fontWeight: "bold",
    borderRadius: "15px",
    padding: "10px 1px 0 15px",
    '&:hover': {
      backgroundColor: "#ffffff",
    },
    '&:active': {
      backgroundColor: "#ffffff",
    },
    '&:focus': {
      backgroundColor: "#ffffff",
    }

  },
})

function MapInsectSelector({ }) {
  const classes = useStyles()

  const selector = useRef(null)
  // const [openFeatimp, setOpenFeatimp] = useState(false)
  // const handelHoverEnterEvent = () => {
  //   setOpenFeatimp(true)
  // }
  // const handelHoverLeaveEvent = () => {
  //   setOpenFeatimp(false)
  // }


  const { selectInsect, handleSetSelectInsect } = useContext(InsectContext)
  const resetInsect = (e) => {
    handleSetSelectInsect(e.target.value)
  }
  const INSECTS_LIST = Object.values(INSECTS_TYPE)
  return (
    <div ref={selector} className="absolute left-[5%] top-[10%]" style={{ zIndex: 999 }}>
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

    </div>
  )
}

export default MapInsectSelector
