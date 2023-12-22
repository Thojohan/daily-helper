import styles from "./Home.module.css";
import PageNav from "../components/PageNav";
import Map from "../components/Map";
import Selector from "../components/Selector";
import { mapOptions } from "../utility/mapOptions";
// const mapOptions2 = [
//   [
//     "Default Leaflet Style",
//     {
//       url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//     },
//   ],
//   [
//     "Open StreetMap Hot",
//     {
//       url: "https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
//       attribution:
//         '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Tiles style by <a href="https://www.hotosm.org/" target="_blank">Humanitarian OpenStreetMap Team</a> hosted by <a href="https://openstreetmap.fr/" target="_blank">OpenStreetMap France</a>',
//       maxZoom: 19,
//     },
//   ],
//   [
//     "Stamen Terrain",
//     {
//       url: "https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png",
//       attribution:
//         '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//       minZoom: 0,
//       maxZoom: 18,
//     },
//   ],
//   [
//     "World Topo Map",
//     {
//       url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
//       attribution:
//         "Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community",
//     },
//   ],
//   [
//     "World Imagery",
//     {
//       url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
//       attribution:
//         "Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
//     },
//   ],
// ];

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
              dispatch={dispatch}
              mapStyle={mapStyle}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
