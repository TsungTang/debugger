import { createContext } from "react";

const CountryContext = createContext({
  countryArr: [],
  currentCountry: "All Taiwan"
})

export default CountryContext
