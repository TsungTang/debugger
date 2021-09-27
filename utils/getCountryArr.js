import fs from 'fs'
import path from 'path'

export default function getCountryArr() {
  const dataDirectory = path.join(process.cwd(), 'data/country.json')

  const countryData = fs.readFileSync(dataDirectory, 'utf8')
  const countryArr = JSON.parse(countryData)
  return countryArr
}
