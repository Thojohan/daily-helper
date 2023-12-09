import styles from "./ShopMap.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
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
  setPosition = false,
  mapStyle,
  previousStyle,
  noLayerRemove,
}) {
  if (!lat) return null;

  return (
    <MapContainer
      className={styles.map}
      center={[lat, lng]}
      zoom={12}
      scrollWheelZoom={false}
      placeholder={<MapPlaceholder />}
      animate="true"
    >
      {!mapStyle && (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      )}
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
      ))}
      <ChangePosition
        rangeValue={rangeValue}
        position={[lat, lng]}
        mapStyle={mapStyle}
        previousStyle={previousStyle}
        noLayerRemove={noLayerRemove}
      />
      {setPosition && <Position setPosition={setPosition} />}
    </MapContainer>
  );
}

export default ShopMap;
