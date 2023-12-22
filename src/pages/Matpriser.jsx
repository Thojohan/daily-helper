import styles from "./Matpriser.module.css";
import HentMatPriser from "../components/Matpriser/HentMatPriser";
import ButikkVelger from "../components/Matpriser/ButikkVelger";
import PageNav from "../components/PageNav";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Map from "../components/Map";
import Prices from "../components/Matpriser/Prices";

var days = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
function Matpriser({ mapStyle }) {
  const [matPriser, setMatPriser] = useState([]);
  const [myMarkers, setMyMarkers] = useState([]);
  const [rangeValue, setRangeValue] = useState(5);
  const [selectedShops, setSelectedShops] = useState([]);
  console.log(mapStyle);

  const [searchParams] = useSearchParams();
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lng");
  const map = [
    searchParams.get("map"),
    {
      attribution: searchParams
        .get("mapAt")
        .toString()
        .replaceAll("$$$", "&copy"),
      url: searchParams.get("mapUrl"),
    },
  ];
  console.log(map);
  console.log(selectedShops);
  const home = {
    position: [latitude, longitude],
    text: "You are here",
    logo: "nice-house.png",
    id: "Your position",
    size: [45, 50],
  };
  console.log(matPriser);

  useEffect(
    function () {
      if (!matPriser.data || matPriser.data.length < 1) {
        setMyMarkers([home]);
        return;
      }

      setMyMarkers([
        ...matPriser.data.reduce((acc, el) => {
          return [
            ...acc,
            // home,
            {
              iconUrl: el.logo,
              position: [el.position.lat, el.position.lng],
              text: `${el.name}
              ${el.address}
              Åpent i dag ${el.openingHours[days.at(new Date().getDay())]} `,
              address: el.address,
              logo: el.logo,
              id: el.id,
              size: [30, 30],
            },
          ];
        }, []),
        home,
      ]);
    },
    [matPriser, rangeValue]
  );

  console.log(myMarkers.length);

  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <div className={styles.mainContainer}>
        <div className={styles.sideSection}>
          <ButikkVelger setRangeValue={setRangeValue} />
          <HentMatPriser
            lat={latitude}
            lng={longitude}
            matPriser={matPriser}
            setMatPriser={setMatPriser}
            rangeValue={rangeValue}
            setSelectedShops={setSelectedShops}
            selectedShops={selectedShops}
          />
        </div>
        <div className={styles.mapContainer}>
          <Map
            myMarkers={myMarkers}
            lat={latitude}
            lng={longitude}
            rangeValue={rangeValue}
            mapStyle={map || mapStyle}
          />
        </div>
      </div>
      {myMarkers.length > 2 && <Prices selectedShops={selectedShops} />}
    </div>
  );
}

export default Matpriser;
