import React, { useRef, useEffect, useContext, ChangeEvent } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, {
  GeolocateControl,
  MapRef,
  Marker,
  NavigationControl,
} from "react-map-gl";
import Geocoder from "../../../components/Geocoder/Geocoder";
import DataContext from "../../../context/LocationContext";
import styles from "../../../styles/MyMap.module.scss";
import HomeButton from "../../../components/homeButton/HomeButton";
import { TextField } from "@mui/material";

interface stringType {
  string: string;
}
interface numberType {
  number: number;
}
type notKnown = stringType | numberType;

function isString(value: notKnown): value is stringType {
  return (value as stringType).string !== undefined;
}

const MyMap = () => {
  const { location, setLocation } = useContext(DataContext);

  const mapRef = useRef<MapRef | null>(null);

  useEffect(() => {
    if (!mapRef?.current) return;
    if (mapRef?.current) {
      console.log(mapRef.current);
      mapRef.current.flyTo({
        center: [location.lng, location.lat],
        zoom: 10,
      });
    }
  }, [location]);

  const setLocationLatWithLimits = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const max = 90;
    const min = -90;
    if (
      Number(e.currentTarget.value) > max ||
      Number(e.currentTarget.value) < min
      // typeof e.currentTarget.value === string
    ) {
      console.log("NOPE");
      return;
    }
    setLocation({ lng: location.lng, lat: Number(e.target.value) });
  };

  const setLocationLngWithLimits = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const max = 90;
    const min = -90;
    if (
      Number(e.currentTarget.value) > max ||
      Number(e.currentTarget.value) < min
    ) {
      console.log("over max or under min");
      return;
    }
    setLocation({ lat: location.lat, lng: Number(e.target.value) });
  };

  return (
    <div className={styles.app_flex}>
      <Map
        // onLoad={onMapLoaded}
        ref={mapRef}
        initialViewState={{
          longitude: location.lng,
          latitude: location.lat,
          zoom: 8,
        }}
        style={{ width: "80vw", height: "80vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAP_TOKEN}
        onClick={(e) => {
          setLocation({
            lat: e.lngLat.lat,
            lng: e.lngLat.lng,
          });
        }}
      >
        <Marker
          latitude={location.lat}
          longitude={location.lng}
          draggable
          onDragEnd={(e) => {
            setLocation({
              lat: e.lngLat.lat,
              lng: e.lngLat.lng,
            });
          }}
        />
        <NavigationControl position="bottom-right" />
        <GeolocateControl
          position="top-left"
          trackUserLocation
          onGeolocate={(e) => {
            // if()
            setLocation({
              lat: e.coords.latitude,
              lng: e.coords.longitude,
            });
          }}
          onError={(err) => {
            console.log(err.message);
          }}
        />
        <Geocoder />
      </Map>
      <div className={styles.app_flex}>
        <div className={styles.app_input}>
          <label htmlFor="latitude">latitude </label>

          <TextField
            id="latitude"
            value={location.lat}
            onChange={
              // (e) =>
              //   setLocation({ lat: Number(e.target.value), lng: location.lng })
              (e) => setLocationLatWithLimits(e)
            }
          />
        </div>
        <div className={styles.app_input}>
          <label htmlFor="longitude">longitude </label>
          <TextField
            id="longitude"
            value={location.lng}
            onChange={
              // (e) => {
              //   if (Number(e.target.value) > 90) {
              //     console.log("over 90");
              //     return;
              //   }
              //   setLocation({ lat: location.lat, lng: Number(e.target.value) });
              // }
              (e) => setLocationLngWithLimits(e)
            }
          />
        </div>
      </div>
      <HomeButton />
    </div>
  );
};

export default MyMap;
