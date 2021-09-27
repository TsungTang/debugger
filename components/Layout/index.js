
import Navbar from "../Navbar";
import Footer from "../Footer";

import CountryContext from "@/context/CountryContext";
import * as data from '@/data/country.json';


function DebuggerLayout({ children }) {
  return (
    <>
      <div className="">
        <Navbar className="" />
        <CountryContext.Provider value={{ countryArr: data.default, currentCountry: "All Taiwan" }}>
          <main className="flex-grow">{children}</main>
        </CountryContext.Provider>
        {/* <Footer /> */}
      </div>

    </>
  )
}





export default DebuggerLayout
