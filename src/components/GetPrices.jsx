// API-nøkkel for kassal.app

import { useEffect } from "react";

const key = "4HlFoWeBFqsWPoEId3gdP0ke9lwj3XndHk4n7WHr";

function GetPrices() {
  useEffect(function () {
    async function finnMatButikker() {
      try {
        const data = await fetch(
          "https://kassal.app/api/v1/products?search=grandiosa&sort=price_desc&size=100",
          {
            headers: {
              Authorization: "Bearer 4HlFoWeBFqsWPoEId3gdP0ke9lwj3XndHk4n7WHr",
            },
          }
        );
        const dataJSON = await data.json();
        console.log(dataJSON);
      } catch (err) {
        console.log(err);
      }
    }
    finnMatButikker();
  }, []);

  return <div></div>;
}

export default GetPrices;
