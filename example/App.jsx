import React, {useRef, useEffect, useState} from "react";

import mapboxgl from "!mapbox-gl";

import Weather from "weather-radar-usa";

mapboxgl.accessToken = "Mapbox Token";
/**
 *
 * @return {App}
 */
export default function App() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-96);
  const [lat, setLat] = useState(37.8);
  const [zoom, setZoom] = useState(3.5);
  const [playControl, setPlayControl] = useState(true);
  const [onOffControl, setOnOffControl] = useState(true);
  const [displayTime, setDisplayTime] = useState("");
  const [loader, setLoader] = useState(false);
  const weatherRef = useRef(null);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
  }, []);

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  }, []);

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container">
        {loader && (
          <div className="loader">
            <span>Loading...</span>
          </div>
        )}
        <Weather
          ref={weatherRef}
          options={{
            opacity: 0.8,
          }}
          getTime={(time) => setDisplayTime(time)}
          getLoader={(isLoader) => setLoader(isLoader)}
        ></Weather>
        <div className="control-bar">
          <div className="controls">
            <div
              onClick={() => {
                weatherRef.current.trunOnRadar(onOffControl, map.current);
                setOnOffControl(!onOffControl);
              }}
            >
              {onOffControl ? "Turn On" : "Turn Off"}
            </div>
            {!onOffControl && (
              <div
                className="play-control"
                onClick={() => {
                  weatherRef.current.weatherAnimation(playControl, map.current);
                  setPlayControl(!playControl);
                }}
              >
                {playControl ? (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-icon="play"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="15px"
                  >
                    <path
                      fill="currentColor"
                      d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-icon="pause"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    width="15px"
                  >
                    <path
                      fill="currentColor"
                      d="M144 479H48c-26.5 0-48-21.5-48-48V79c0-26.5 21.5-48 48-48h96c26.5 0 48 21.5 48 48v352c0 26.5-21.5 48-48 48zm304-48V79c0-26.5-21.5-48-48-48h-96c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h96c26.5 0 48-21.5 48-48z"
                    ></path>
                  </svg>
                )}{" "}
              </div>
            )}
            {!onOffControl && displayTime != "" && <div>{displayTime}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
