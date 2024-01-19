import { useMapEvents } from "react-leaflet";

export default function changePos({ mapCallBack }) {
  const map = useMapEvents({
    click: (e) => {
      map.setView(e.latlng, map.getZoom());
      mapCallBack([e.latlng.lat, e.latlng.lng]);
    },
  });

  return null;
}
