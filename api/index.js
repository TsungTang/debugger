import { MIDDLE_ENDPOINT } from "./const"
import axiosDebugger from "./debuggerAxios"

export const FetchHelloWorld = async () => {
  try {

    const res = await axiosDebugger.get(MIDDLE_ENDPOINT.HELLO_WORLD)
    return res.data
    /**
    {
     "hello": "world",
     "status": 200
    }
     */
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const FetchBioinfo = async () => {
  await axiosDebugger.post()
}
