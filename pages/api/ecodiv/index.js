
import { API_ENDPOINT } from "@/api/const"
import debuggerAxios from "@/api/debuggerAxios"

/**
 * @typedef {Object} payload
 */

export default async function ecodiv(req, res) {
  try {
    const body = JSON.parse(req.body)
    const response = await debuggerAxios.post("http://125.228.70.130/" + API_ENDPOINT.ECODIV, req.body)
    res.status(200).json(response.data)
  } catch (error) {
    console.error(error)
    res.status(461).end("connect server error")
  }

}

