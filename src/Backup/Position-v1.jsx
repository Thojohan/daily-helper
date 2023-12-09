import { useMapEvents } from "react-leaflet";

export default function changePos({ setPosition }) {
  const map = useMapEvents({
    click: (e) => {
      console.log(e.target);
      map.locate();
    },
    locationfound: (location) => {
      console.log(location);
      setPosition({
        latitude: location.latlng.lat,
        longitude: location.latlng.lng,
        accuracy: location.accuracy,
      });
    },
  });
  return null;
}
