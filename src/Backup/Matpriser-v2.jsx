import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  CircleMarker,
  useMap,
  ZoomControl,
} from "react-leaflet";
// import "leaflet/dist/leaflet.css";
import { useSearchParams } from "react-router-dom";
import styles from "./Matpriser.module.css";
import HentMatPriser from "../components/Matpriser/HentMatPriser";
import ButikkVelger from "../components/Matpriser/ButikkVelger";
import PageNav from "../components/PageNav";
import { useEffect, useState } from "react";
import { Icon } from "leaflet";

function MapPlaceholder() {
  return (
    <p>
      Kart over butikker.{" "}
      <noscript>JavaScript må være aktivert for å vise dette.</noscript>
    </p>
  );
}

function Matpriser() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [matPriser, setMatPriser] = useState([]);
  const [myMarkers, setMyMarkers] = useState([
    {
      position: [lat, lng],
      text: "You are here",
      logo: "house.png",
      id: "Your position",
      size: [35, 65],
    },
  ]);
  const [rangeValue, setRangeValue] = useState(5);

  console.log(rangeValue);
  useEffect(
    function () {
      if (!matPriser.data) return;
      setMyMarkers([
        ...myMarkers,
        ...matPriser.data.reduce((acc, el) => {
          console.log(el);
          return [
            ...acc,
            {
              iconUrl: el.logo,
              position: [el.position.lat, el.position.lng],
              text: `${el.name}`,
              address: el.address,
              logo: el.logo,
              id: el.id,
              size: [30, 55],
            },
          ];
        }, []),
      ]);
    },
    [matPriser, rangeValue]
  );

  console.log(matPriser);
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <div className={styles.mainContainer}>
        <div className={styles.sideSection}>
          <ButikkVelger setRangeValue={setRangeValue} />
          <HentMatPriser
            lat={lat}
            lng={lng}
            matPriser={matPriser}
            setMatPriser={setMatPriser}
            rangeValue={rangeValue}
          />
        </div>
        <MapContainer
          className={styles.map}
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={false}
          placeholder={<MapPlaceholder />}
          animate="true"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {myMarkers.map((el, i) => (
            <Marker
              key={i}
              position={el.position}
              opacity={0.6}
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
        </MapContainer>
      </div>
    </div>
  );
}

export default Matpriser;
