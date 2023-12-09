import styles from "./ShopMap.module.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import ChangePosition from "./ChangePosition";
import Position from "./Position";

function MapPlaceholder() {
  return (
    <p>
      Kart over butikker.{" "}
      <noscript>JavaScript må være aktivert for å vise dette.</noscript>
    </p>
  );
}
function ShopMap({
  myMarkers,
  lat,
  lng,
  rangeValue,
  dispatch = false,
  mapStyle,
}) {
  if (!lat) return null;
  console.log(myMarkers);
  return (
    <MapContainer
      className={styles.map}
      center={[lat, lng]}
      zoom={12}
      maxZoom={18}
      minZoom={2}
      scrollWheelZoom={false}
      placeholder={<MapPlaceholder />}
      animate="true"
    >
      <TileLayer
        attribution={mapStyle[1].attribution}
        url={mapStyle[1].url}
        maxZoom={mapStyle[1].maxZoom}
        minZoom={mapStyle[1].minZoom}
      />
      {myMarkers.map((el, i) => (
        <Marker
          key={i}
          position={el.position}
          icon={
            new Icon({
              iconUrl: el.logo,
              iconAnchor: [5, 55],
              popupAnchor: [10, -44],
              iconSize: el.size,
            })
          }
        >
          <Popup className={styles.popup}>{el.text}</Popup>
        </Marker>
      ))}{" "}
      <ChangePosition rangeValue={rangeValue} position={[lat, lng]} />
      {dispatch && <Position dispatch={dispatch} />}
    </MapContainer>
  );
}

export default ShopMap;
