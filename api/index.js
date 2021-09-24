import { API_ENDPOINT } from "./const"
import axiosDebugger from "./debuggerAxios"

export const FetchHelloWorld = async () => {
  try {

    const res = await axiosDebugger.post(API_ENDPOINT.HELLO_WORLD, { 'hello': 'hello' })
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
