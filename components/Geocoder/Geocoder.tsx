import React, { useContext } from "react";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useControl } from "react-map-gl";
import DataContext from "../../context/LocationContext";

const Geocoder = () => {
  const { setLocation } = useContext(DataContext);
  const cl = new MapboxGeocoder({
    accessToken: process.env.NEXT_PUBLIC_MAP_TOKEN,
    marker: false,
    collapsed: true,
  });
  useControl(() => cl);
  cl.on("result", (e) => {
    console.log(e.result);
    const coords = e.result.geometry.coordinates;
    setLocation({ lng: coords[0], lat: coords[1] });
  });

  return <div>Geocoder</div>;
};

export default Geocoder;
