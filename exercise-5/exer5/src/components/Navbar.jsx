import React from "react";
import styles from "./Navbar.module.css";

export default function Navbar({ line, stationData }) {
  const currLine = line.toLowerCase();
  console.log("Current Line:", currLine);
  console.log("Station Data:", stationData);

  const lineStations = stationData
    .filter((station) => station.LINE.toLowerCase() === currLine)
    .map((station) => station.STATION_NAME); 

  console.log("Line Stations:", lineStations);

  return (
    <div className={styles.navbar_container}>
      <h2 className={styles.instructions}>Select your starting station.</h2>
      <div className={styles.station_container}>
        <div className={styles.button_container}>
          <button className={styles.station_button}>
            All Stations
          </button>
          {lineStations.length > 0 ? (
            lineStations.map((station) => (
              <button 
                key={station} 
                className={styles.station_button}
              >
                {station}
              </button>
            ))
          ) : (
            <p>No stations available for this line. (Line: {currLine})</p>
          )}
        </div>
      </div>
    </div>
  );
}
