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



export function shadeColor(color, percent) {

  var R = parseInt(color.substring(1, 3), 16);
  var G = parseInt(color.substring(3, 5), 16);
  var B = parseInt(color.substring(5, 7), 16);

  R = parseInt(R * (100 + percent) / 100);
  G = parseInt(G * (100 + percent) / 100);
  B = parseInt(B * (100 + percent) / 100);

  R = (R < 255) ? R : 255;
  G = (G < 255) ? G : 255;
  B = (B < 255) ? B : 255;

  var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
  var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
  var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

  return "#" + RR + GG + BB;
}
