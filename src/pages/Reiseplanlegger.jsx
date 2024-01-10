import { useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import styles from "./Reiseplanlegger.module.css";
import { useSearchParams } from "react-router-dom";
import Map from "../components/Map";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import { logoFinder } from "../utility/logoFinder";
import { useMemo } from "react";
import Rutetider from "../components/Reiseplanlegger/Rutetider";
import Reiseruter from "../components/Reiseplanlegger/Reiseruter";
const rangeValue = 5;

function Reiseplanlegger() {
  const [travel, setTravel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const [activeStop, setActiveStop] = useState([]);
  const [goTo, setGoTo] = useState({});
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const home = {
    position: [lat, lng],
    text: "You are here",
    logo: "nice-house.png",
    id: "Your position",
    size: [45, 50],
  };

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

  function mapCallBack(e) {
    setGoTo({
      position: [e.latlng.lat, e.latlng.lng],
      text: "You want to travel here",
      logo: "target.png",
      id: "Your target",
      size: [38, 56],
    });
  }

  const clickMarkerHandler = useMemo(
    (e) => ({
      click(e) {
        if (e.target.options.uniqueID === 0) return;

        const arr = createMapArray(travel);

        const objID = [
          arr.at(e.target.options.uniqueID).id,
          arr.at(e.target.options.uniqueID).text.split(/\n/).at(0),
        ];

        setActiveStop(objID);
      },
    }),
    [travel]
  );

  function createMapArray(array) {
    if (array.length === 0) return [home];
    const arr = array.reduce(
      (acc, el) => {
        return [
          ...acc,

          {
            position: [
              el.geometry.coordinates.at(1),
              el.geometry.coordinates.at(0),
            ],
            text: `${el.properties.name}
        ${el.properties.distance}km unna`,
            logo: logoFinder(el),
            id: el.properties.id,
            size: el.properties.id === activeStop?.at(0) ? [50, 50] : [35, 35],
          },
        ];
      },
      [home]
    );
    return arr;
  }

  useEffect(function () {
    async function fetchTravel() {
      setError(false);
      setIsLoading(true);
      try {
        const data = await fetch(
          `https://api.entur.io/geocoder/v1/reverse?point.lat=${lat}&point.lon=${lng}&boundary.circle.radius=5&size=100&layers=venue`,
          {
            method: "GET",
            headers: {
              // Replace this with your own client name:
              "ET-Client-Name": "TJ-learningReact",
              "Content-Type": "application/json",
            },
          }
        );

        if (!data.ok) throw new Error("Failed to fetch data ");

        const jsonData = await data.json();
        setTravel(jsonData.features);
      } catch (er) {
        setError(er);
      } finally {
        setIsLoading(false);
      }
    }
    fetchTravel();
  }, []);

  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <div className={styles.upperContainer}>
        <div className={styles.directions}>
          <h2>1. Velg holdeplass for å se neste avganger.</h2>
          <h2>
            2. Klikk et punkt på kartet for å se ruteforslag fra <br /> valgt
            holdeplass til dette punktet. Forslagene er sortert etter <br />
            estimert reisetid.
          </h2>
        </div>
        <div className={styles.mapContainer}>
          {error && <ErrorMessage error={error} />}
          {isLoading && <Loading />}
          <Map
            myMarkers={[
              ...createMapArray(travel),
              ...(goTo.position ? [goTo] : []),
            ]}
            lat={lat}
            lng={lng}
            rangeValue={rangeValue}
            mapStyle={map || mapStyle}
            clickMarkerHandler={clickMarkerHandler}
            mapCallBack={mapCallBack}
          />
        </div>
      </div>
      <div className={styles.results}>
        {activeStop.length > 0 && <Rutetider activeStop={activeStop[0]} />}
        {activeStop.length > 0 && goTo.position && (
          <Reiseruter activeStop={activeStop} goTo={goTo} />
        )}
      </div>
    </div>
  );
}
export default Reiseplanlegger;
