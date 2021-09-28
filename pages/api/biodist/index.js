import { API_ENDPOINT } from "@/api/const"
import debuggerAxios from "@/api/debuggerAxios"

/**
 * @typedef {Object} payload
 */

export default async function biodist(req, res) {
  try {
    console.log(req.body)

    const response = await debuggerAxios.post("http://125.228.70.130/" + API_ENDPOINT.BIODIST, req.body)
    response.data.heatmap = response.data.heatmap.sort((a, b) => a.id - b.id) // sort by id
    res.status(200).json(response.data)
  } catch (error) {
    // console.error(error)
    res.status(461).json({ error: error })
  }

}
