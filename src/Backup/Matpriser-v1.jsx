import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
} from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import { useSearchParams } from "react-router-dom";
import styles from "./Matpriser.module.css";
import HentMatPriser from "../components/HentMatPriser";
import PageNav from "../components/PageNav";
import { useState } from "react";

function MapPlaceholder() {
  return (
    <p>
      Kart over butikker.{" "}
      <noscript>JavaScript må være aktivert for å vise dette.</noscript>
    </p>
  );
}

function Matpriser() {
  const [matPriser, setMatPriser] = useState([]);
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  console.log(matPriser);
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <div className={styles.mainContainer}>
        <div className={styles.sideSection}>
          <HentMatPriser
            lat={lat}
            lng={lng}
            matPriser={matPriser}
            setMatPriser={setMatPriser}
          />
        </div>
        <MapContainer
          className={styles.map}
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
          placeholder={<MapPlaceholder />}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[lat, lng]}>
            <Popup className={styles.popup}>Din posisjon</Popup>
          </Marker>

          {matPriser.data &&
            matPriser.data.map((el) => {
              <div key={el.address}>
                <Marker position={[el.position.lat, el.position.lng]}>
                  <Popup className={styles.popup}>Din posisjon</Popup>
                </Marker>
              </div>;
            })}
        </MapContainer>
      </div>
    </div>
  );
}

export default Matpriser;
