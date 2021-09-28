import { createContext } from "react";

const CountryContext = createContext({
  countryArr: [],
  currentCountry: "All Taiwan",
  handleSetCurrentCountry: () => { },
  handleResetCurrentCountry: () => { }
})

export default CountryContext
