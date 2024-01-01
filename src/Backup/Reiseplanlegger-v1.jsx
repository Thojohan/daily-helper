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

function Reiseplanlegger() {
  const [travel, setTravel] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [searchParams] = useSearchParams();
  const [activeStop, setActiveStop] = useState(null);
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

  const rangeValue = 5;

  const clickHandler = useMemo(
    (e) => ({
      click(e) {
        if (e.target.options.uniqueID === 0) return;

        const arr = createMapArray(travel);

        const objID = arr.at(e.target.options.uniqueID).id;

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
            size: [35, 35],
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

  // useEffect(function () {
  //   async function fetchTravel() {
  //     setError(false);
  //     setIsLoading(true);
  //     try {
  //       const data = await fetch(
  //         "https://api.entur.io/journey-planner/v2/graphql",
  //         {
  //           method: "POST",
  //           headers: {
  //             // Replace this with your own client name:
  //             "ET-Client-Name": "TJ-learningReact",
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify({ query }),
  //         }
  //       );
  //
  //       console.log(data);
  //       if (!data.ok) throw new Error("Failed to fetch data ");
  //
  //       const jsonData = await data.json();
  //       console.log(jsonData);
  //       setTravel(jsonData);
  //     } catch (er) {
  //       setError(er);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   fetchTravel();
  // }, []);
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <div className={styles.mapContainer}>
        {error && <ErrorMessage err={error} />}
        {isLoading && <Loading />}
        <Map
          myMarkers={createMapArray(travel)}
          lat={lat}
          lng={lng}
          rangeValue={rangeValue}
          mapStyle={map || mapStyle}
          clickHandler={clickHandler}
        />
      </div>
      {activeStop && <Rutetider activeStop={activeStop} />}
    </div>
  );
}
export default Reiseplanlegger;
