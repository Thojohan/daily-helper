import { useMap } from "react-leaflet";

export default function ChangePosition({ rangeValue, position }) {
  const map = useMap();

  map.setView(position, 16 - rangeValue / 3);

  return null;
}
