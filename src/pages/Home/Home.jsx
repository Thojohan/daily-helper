import styles from "./Home.module.css";
import PageNav from "../../components/PageNav/PageNav";
import Map from "../../components/Map/Map";
import Selector from "../../components/SelectorCheckboxes/Selector";
import { startValues } from "../../utility/startValues";
import { changeHome } from "../../utility/changeHome";

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
  const maps = startValues().mapStyles;

  function mapCallBack([lat, lng]) {
    changeHome([lat, lng], dispatch);
  }

  const hei = maps.findIndex((el) => el.at(0) === state.mapStyle.at(0) && el);
  return (
    <div className={styles.pageContainer}>
      <PageNav />
      <div className={styles.mainContainer}>
        <div>
          <Selector
            updateSelection={dispatch}
            options={maps}
            reducerType={"mapStyleChange"}
            index={Number(
              maps.findIndex((el) => el.at(0) === state.mapStyle.at(0) && el)
            )}
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
