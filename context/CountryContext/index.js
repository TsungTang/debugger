import { createContext } from "react";

const CountryContext = createContext({
  countryArr: [],
  currentCountry: "Whole Taiwan",
  handleSetCurrentCountry: () => { },
  handleResetCurrentCountry: () => { }
})

export default CountryContext
