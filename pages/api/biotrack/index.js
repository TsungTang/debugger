import { API_ENDPOINT } from "@/api/const"
import debuggerAxios from "@/api/debuggerAxios"

/**
 * @typedef {Object} payload
 */

export default async function biodist(req, res) {
  try {
    console.log(req.body)

    const response = await debuggerAxios.post("http://125.228.70.130/" + API_ENDPOINT.BIOTRACK, req.body)
    response.data.track = response.data.track.sort((a, b) => new Date(a[0]) - new Date(b[0])) // sort by date
    response.data.axis = response.data.track.map(el => [el[1], el[2]])
    response.data.date = response.data.track.map(el => el[0])
    res.status(200).json(response.data)
  } catch (error) {
    // console.error(error)
    res.status(461).json({ error: error })
  }

}
