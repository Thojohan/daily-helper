import { useMapEvents } from "react-leaflet";

export default function changePos({ dispatch }) {
  const map = useMapEvents({
    click: (e) => {
      dispatch({
        type: "changePosition",
        payload: {
          latitude: e.latlng.lat,
          longitude: e.latlng.lng,
          accuracy: 0,
        },
      });
      //  setPosition({
      //    latitude: e.latlng.lat,
      //    longitude: e.latlng.lng,
      //    accuracy: 0,
      //  });
    },
  });
  return null;
}
