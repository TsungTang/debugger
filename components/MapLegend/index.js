import L from "leaflet";
import { useEffect } from "react";
export default function MapLegend({ map }) {
  useEffect(() => {
    if (map) {
      const legend = L.control({ position: "topright" });

      legend.onAdd = () => {
        const div = L.DomUtil.create("div", "info legend");
        div.innerHTML =
          "<h4>This is the legend</h4>" +
          "<b>Lorem ipsum dolor sit amet consectetur adipiscing</b>";
        return div;
      };

      legend.addTo(map);
    }
  }, [map]);
  return null;
}
