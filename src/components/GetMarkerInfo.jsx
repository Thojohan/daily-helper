import { useMapEvents } from "react-leaflet";

export default function changePos({ clickMarkerHandler }) {
  const map = useMapEvents({
    click: (e) => {
      clickMarkerHandler(e);
    },
  });
  return null;
}
