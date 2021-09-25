
import { API_ENDPOINT } from "@/api/const"
import debuggerAxios from "@/api/debuggerAxios"

export default async function helloAPI(req, res) {

  const response = await debuggerAxios.post("http://125.228.70.130/" + API_ENDPOINT.HELLO_WORLD, { 'hello': 'hello' })
  res.status(200).json(response.data)
}


