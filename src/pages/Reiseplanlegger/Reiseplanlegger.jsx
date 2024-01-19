import { useEffect, useState, useMemo } from "react";
import PageNav from "../../components/PageNav/PageNav";
import styles from "./Reiseplanlegger.module.css";
import { useSearchParams } from "react-router-dom";
import Map from "../../components/Map/Map";
import Loading from "../../components/Status/LoadingMessage/Loading";
import ErrorMessage from "../../components/Status/ErrorMessage/ErrorMessage";
import { logoFinder } from "../../utility/logoFinder";
import Rutetider from "../../components/Reiseplanlegger/Rutetider/Rutetider";
import Reiseruter from "../../components/Reiseplanlegger/Reiseruter/Reiseruter";

const rangeValue = 5;

function Reiseplanlegger({ state }) {
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

  function mapCallBack([lat, lng]) {
    setGoTo({
      position: [lat, lng],
      text: "You want to travel here",
      logo: "target.png",
      id: "Your target",
      size: [38, 56],
    });
  }

  const markerHandler = useMemo(
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
    [travel, state]
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
          `${
            import.meta.env.VITE_ENTUR_URL
          }/geocoder/v1/reverse?point.lat=${lat}&point.lon=${lng}&boundary.circle.radius=5&size=100&layers=venue`,
          {
            method: "GET",
            headers: {
              // Replace this with your own client name:
              "ET-Client-Name": `${import.meta.env.VITE_ET_CLIENT_NAME}`,
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
      <div className={`${styles.changeOnMobile} ${styles.upperContainer}`}>
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
            markerHandler={markerHandler}
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
