import { useMapEvents } from "react-leaflet";

export default function changePos({ clickHandler }) {
  const map = useMapEvents({
    click: (e) => {
      clickHandler(e);
    },
  });
  return null;
}
