import styles from "./Home.module.css";
import PageNav from "../components/PageNav";
import Map from "../components/Map";
import Selector from "../components/Selector";
import { mapOptions } from "../utility/mapOptions";

function Home({ state, dispatch }) {
  const { latitude, longitude, accuracy } = state.position;
  const { location, mapStyle } = state;
  const home = {
    position: [latitude, longitude],
    text: "You are here",
    logo: "nice-house.png",
    id: "Your position",
    size: [45, 50],
  };
  const myMarkers = [home];
  const maps = mapOptions();

  function mapCallBack(e) {
    dispatch({
      type: "changePosition",
      payload: {
        latitude: e.latlng.lat,
        longitude: e.latlng.lng,
        accuracy: 0,
      },
    });
  }

  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <div className={styles.mainContainer}>
        <div>
          <Selector
            updateSelection={dispatch}
            options={maps}
            reducerType={"mapStyleChange"}
            index={mapStyle.at(2)}
          />
        </div>
        <div>
          <p className={styles.position}>{`Posisjon ${location?.city}, ${
            location?.countryName
          } - Nøyakighet: ${(Number(accuracy) / 1000).toFixed(2)} km`}</p>
          <div className={styles.mapContainer}>
            <Map
              myMarkers={myMarkers}
              lat={latitude}
              lng={longitude}
              rangeValue={17}
              mapCallBack={mapCallBack}
              mapStyle={mapStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
