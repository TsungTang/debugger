import { useEffect, useState } from "react";
import { MAP_LIST } from "../constant";



export const useSwitchMap = (MapType) => {
  const defaultMapInfo = {
    attribution: '&copy; <a href="Imagery provided by services from the Global Imagery Browse Services (GIBS), operated by the NASA/GSFC/Earth Science Data and Information System (<a href="https://earthdata.nasa.gov">ESDIS</a>) with funding provided by NASA/HQ.',
    time: "",
    url: "https://map1.vis.earthdata.nasa.gov/wmts-webmerc/VIIRS_CityLights_2012/default/{time}/{tilematrixset}{maxZoom}/{z}/{y}/{x}.{format}",
    tilematrixset: 'GoogleMapsCompatible_Level',
    format: 'jpg',
    minZoom: 6,
    maxZoom: 8 /** 8 is maxium */
  }
  const [mapInfo, setMapInfo] = useState({});
  useEffect(() => {
    switch (MapType) {
      case MAP_LIST.NASA_NIGHT:
        setMapInfo({ ...defaultMapInfo })
        break;
      case MAP_LIST.OPEN_STREAT_MAP:
        console.log(MapType)

        setMapInfo({
          url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          minZoom: 6,
          maxZoom: 22 /** 8 is maxium */
        })
        break;
      default:
        setMapInfo({ ...defaultMapInfo })
        break;
    }
  }, [MapType])



  return { mapInfo }
}
