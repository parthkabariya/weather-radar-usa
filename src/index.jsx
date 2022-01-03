import React, {forwardRef, useState, useImperativeHandle} from "react";
import PropTypes from "prop-types";

const WeatherRadar = forwardRef((props, ref) => {
  const [timeSlots, setTimeSlots] = useState([
    {
      USA: [],
      Alaska: [],
    },
  ]);
  const [currentTimeSolt, setCurrentTimeSolt] = useState(0);
  const [intervalUSA, setIntervalUSA] = useState(null);
  const [intervalAlaska, setIntervalAlaska] = useState(null);
  const currentOpacity = props.options.opacity ?? 0.9;


  useImperativeHandle(ref, () => ({
    trunOnRadar(isOn, map) {
      if (isOn) {
        props.getLoader(true);
        const promiseArr = [];
        Object.keys(timeSlots[0]).map((key) => {
          promiseArr.push(getCapabilities(key, map));
        });
        Promise.all(promiseArr).then((results) => {
          const newSolts = [];
          const newTemp = {};
          newTemp["USA"] = results[0]["USA"];
          newTemp["Alaska"] = results[1]["Alaska"];
          newSolts.push(newTemp);
          setTimeSlots(newSolts);
          map.on('sourcedata', () => {
            props.getLoader(false);
            map.off('sourcedata', () => {});
          });
        });
      } else {
        for (let i = 0; i < timeSlots[0]['USA'].length; i++) {
          if (map.getSource("weatherRadarUSA" + timeSlots[0]['USA'][i])) {
            if (map.getLayer("weatherRadarUSA" + timeSlots[0]['USA'][i])) {
              map.removeLayer("weatherRadarUSA" + timeSlots[0]['USA'][i]);
            }
            map.removeSource("weatherRadarUSA" + timeSlots[0]['USA'][i]);
          }
        }
        for (let j = 0; j < timeSlots[0]['Alaska'].length; j++) {
          if (map.getSource("weatherRadarAlaska" + timeSlots[0]['Alaska'][j])) {
            if (map.getLayer("weatherRadarAlaska"+timeSlots[0]['Alaska'][j])) {
              map.removeLayer("weatherRadarAlaska" + timeSlots[0]['Alaska'][j]);
            }
            map.removeSource("weatherRadarAlaska" + timeSlots[0]['Alaska'][j]);
          }
        }
        map.off('sourcedata', () => {});
        props.getTime('');
      }
    },
    weatherAnimation(isPlay, map) {
      if (isPlay) {
        playAction("USA", map);
        playAction("Alaska", map);
      } else {
        clearInterval(intervalUSA);
        clearInterval(intervalAlaska);
      }
    },
  }));

  const getCapabilities = (key, map) => {
    return new Promise((resolve) => {
      let region = "conus/conus_bref_qcd";
      if (key == "Alaska") {
        region = "alaska/alaska_bref_qcd";
      }
      fetch(
          `https://opengeo.ncep.noaa.gov/geoserver/${region}/ows?service=wms&version=1.1.1&request=GetCapabilities`,
      )
          .then((response) => response.text())
          .then((str) => {
            return new window.DOMParser().parseFromString(str, "text/xml");
          })
          .then((html) => {
            const timeSoltsElement = html.querySelector('Extent[name="time"]');
            const tempTimeSlots = timeSoltsElement.innerHTML.split(",");
            const firstTimeSlot = tempTimeSlots[0];
            let alternate2count = 0;
            const newTimeSlices = [];
            for (let si = 0; si < tempTimeSlots.length; si++) {
              if (alternate2count == 0) {
                newTimeSlices.push(tempTimeSlots[si]);
                alternate2count = 5;
              }
              alternate2count--;
            }
            resolve({
              [key]: newTimeSlices,
            });
            setWeatherRadar(key, region, map, firstTimeSlot, currentOpacity);
            for (let j = 1; j < newTimeSlices.length; j++) {
              setWeatherRadar(key, region, map, newTimeSlices[j], 0);
            }
          });
    });
  };

  const setWeatherRadar = (key, region, map, time, opacity) => {
    let layer = "conus_bref_qcd";
    if (key == "Alaska") {
      layer = "alaska_bref_qcd";
    }
    map.addSource("weatherRadar" + key + time, {
      type: "raster",
      tiles: [
        `https://opengeo.ncep.noaa.gov/geoserver/${region}/ows?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image%2Fpng&TRANSPARENT=true&TILED=true&LAYERS=${layer}&TIME=${time}&WIDTH=256&HEIGHT=256&SRS=EPSG%3A3857&BBOX={bbox-epsg-3857}`,
      ],
      tileSize: 256,
    });

    map.addLayer({
      id: "weatherRadar" + key + time,
      type: "raster",
      source: "weatherRadar" + key + time,
      paint: {
        "raster-opacity": opacity,
        "raster-opacity-transition": {
          duration: 0,
          delay: 0,
        },
      },
    });
  };

  const playAction = (key, map) => {
    let i = currentTimeSolt;
    let previoustime = timeSlots[0][key][timeSlots[0][key].length - 1];
    const intervalId = setInterval(function() {
      if (i > timeSlots[0][key].length - 1) {
        i = 0;
      }
      if (i == 0) {
        previoustime = timeSlots[0][key][timeSlots[0][key].length - 1];
      } else {
        previoustime = timeSlots[0][key][i - 1];
      }
      const currentTime = timeSlots[0][key][i];
      if (key == 'USA') {
        props.getTime(timeSlots[0]["USA"][i]);
      }
      // wait until the source is loaded
      if (
        map.getSource("weatherRadar" + key + currentTime) &&
        map.isSourceLoaded("weatherRadar" + key + currentTime)
      ) {
        setWeatherRadarLayerOpacity(
            map,
            "weatherRadar" + key + currentTime,
            currentOpacity,
        );
        setWeatherRadarLayerOpacity(
            map,
            "weatherRadar" + key + previoustime,
            0,
        );
        setCurrentTimeSolt(i);
        i++;
      }
    }, 500);
    if (key == "USA") {
      setIntervalUSA(intervalId);
    } else {
      setIntervalAlaska(intervalId);
    }
  };

  const setWeatherRadarLayerOpacity = (mapData, id, opacity) => {
    if (!mapData.getLayer(id)) {
      return false;
    }
    mapData.setPaintProperty(id, "raster-opacity", opacity);
  };

  return <>{props.childern}</>;
});

WeatherRadar.propTypes = {
  options: PropTypes.array.isRequired,
  childern: PropTypes.any,
  getTime: PropTypes.func,
  getLoader: PropTypes.func,
};
WeatherRadar.displayName = "WeatherRadar";
export default WeatherRadar;
