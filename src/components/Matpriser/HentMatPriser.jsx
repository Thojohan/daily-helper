// API-nøkkel for kassal.app
import { useEffect, useState } from "react";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

const key = "4HlFoWeBFqsWPoEId3gdP0ke9lwj3XndHk4n7WHr";

function HentMatPriser({
  lat,
  lng,
  matPriser,
  setMatPriser,
  rangeValue,
  setSelectedShops,
  selectedShops,
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  function updateShops(target, selected) {
    if (selected.find((el) => el === target.closest("li").dataset.group)) {
      const newArr = selected.filter(
        (el) => el !== target.closest("li").dataset.group
      );
      setSelectedShops(newArr);
    } else {
      const newArr = [
        ...new Set([...selected, target.closest("li").dataset.group]),
      ];
      setSelectedShops(newArr);
    }
  }

  useEffect(
    function () {
      async function finnMatButikker() {
        setIsLoading(true);
        try {
          const data = await fetch(
            `https://kassal.app/api/v1/physical-stores?size=100&lat=${lat}&lng=${lng}&km=${rangeValue}`,
            {
              headers: {
                Authorization:
                  "Bearer 4HlFoWeBFqsWPoEId3gdP0ke9lwj3XndHk4n7WHr",
              },
            }
          );

          if (!data.ok) throw new Error("Kunne ikke hente liste over butikker");
          const dataJSON = await data.json();
          setMatPriser(dataJSON);
        } catch (err) {
          setError(err);
        } finally {
          setIsLoading(false);
        }
      }
      finnMatButikker();
    },
    [rangeValue]
  );

  return (
    <>
      {isLoading && <Loading />}
      {error && <ErrorMessage error={error} />}
      {matPriser.data && !isLoading && (
        <ul>
          {matPriser?.data.map((butikk, i) => (
            <li
              key={i}
              onClick={(e) => updateShops(e.target, selectedShops)}
              data-group={butikk.group}
              style={{
                color: `${
                  selectedShops.find((el) => el === butikk.group)
                    ? "rgb(255, 255, 200)"
                    : "black"
                }`,
                backgroundColor: `${
                  selectedShops.find((el) => el === butikk.group)
                    ? "rgb(5, 5, 5, 0.3)"
                    : "inherit"
                }`,
                cursor: "pointer",
              }}
            >
              <p>
                <span>
                  {String(butikk.group).replace("_NO", "").replace("_", " ")}
                </span>
                {" - "}
                <span>{butikk.name}</span>
                <span></span>
              </p>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default HentMatPriser;
