import { promises as fs } from 'fs'
import path from 'path'




export default async function coutry(req, res) {
  try {

    const dataDirectory = path.join(process.cwd(), 'data/country.json')
    const countryData = await fs.readFile(dataDirectory, 'utf8')
    const countryArr = JSON.parse(countryData)

    // let polygonIDArr = []
    // const countryID = req.query.country
    // for (let i = 0; i < countryArr.length; i++) {
    //   const town = countryArr[i];
    //   if (town.COUNTYID === countryID) {
    //     polygonIDArr = polygonIDArr.concat(town.polygon_id)
    //   }
    // }

    res.status(200).json({ data: countryArr })
  } catch (error) {
    console.error(error)
    res.status(461).end("connect server error")
  }
}
