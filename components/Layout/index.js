
import Navbar from "../Navbar";
import Footer from "../Footer";

import CountryContext from "@/context/CountryContext";
import * as data from '@/data/country.json';


function DebuggerLayout({ children }) {
  return (
    <>
      <Navbar />
      <CountryContext.Provider value={{ countryArr: data.default, currentCountry: "All Taiwan" }}>
        <main>{children}</main>
      </CountryContext.Provider>
      <Footer />
    </>
  )
}





export default DebuggerLayout
