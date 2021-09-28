
import Navbar from "../Navbar";

import CountryContext from "@/context/CountryContext";
import InsectContext from "@/context/InsectContext";
import * as data from '@/data/country.json';
import { useState } from "react";


function DebuggerLayout({ children }) {
  const [currentCountry, setCurrentCountry] = useState("Whole Taiwan")
  const handleSetCurrentCountry = (newCountry) => {
    setCurrentCountry(newCountry)
  }
  const handleResetCurrentCountry = () => {
    setCurrentCountry("Whole Taiwan")
  }

  const [selectInsect, setSelectInsect] = useState([])
  const handleSetSelectInsect = (newInsect, first = true) => {
    if (first) {
      setSelectInsect([newInsect])
      return
    }

    if (selectInsect.length === 0) {
      setSelectInsect([newInsect])
    } else {
      setSelectInsect([...selectInsect, newInsect])
    }
  }
  const handleResetSelectInsect = () => {
    setSelectInsect([])
  }
  return (
    <>
      <div className="">
        <Navbar className="" />
        <CountryContext.Provider value={{
          countryArr: data.default,
          currentCountry: currentCountry, handleSetCurrentCountry: handleSetCurrentCountry,
          handleResetCurrentCountry: handleResetCurrentCountry
        }}>
          <InsectContext.Provider value={{
            selectInsect: selectInsect, handleSetSelectInsect: handleSetSelectInsect,
            handleResetSelectInsect: handleResetSelectInsect
          }}>
            <main className="flex-grow">{children}</main>
          </InsectContext.Provider>
        </CountryContext.Provider>
      </div>
    </>
  )
}





export default DebuggerLayout
