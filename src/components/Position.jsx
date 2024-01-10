import { useMapEvents } from "react-leaflet";

export default function changePos({ mapCallBack }) {
  const map = useMapEvents({
    click: (e) => {
      map.setView(e.latlng, map.getZoom());
      mapCallBack(e);
      //  setPosition({
      //    latitude: e.latlng.lat,
      //    longitude: e.latlng.lng,
      //    accuracy: 0,
      //  });
    },
  });
  return null;
}
