import { createContext } from "react";

const InsectContext = createContext({
  selectInsect: [],
  handleSetSelectInsect: (insect, first) => { },
  handleResetSelectInsect: () => { }
})

export default InsectContext
