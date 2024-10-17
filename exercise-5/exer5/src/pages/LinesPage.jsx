import { useState, useEffect } from "react";
import NavBar from '../components/Navbar';
import TrainList from '../components/TrainList';
import axios from "axios";

import styles from "./LinesPage.module.css";

const fetchStationData = async () => await axios.get("http://localhost:3000/api/stations");
const fetchTrainData = async () => await axios.get("http://localhost:3000/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("red");
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const stations = await fetchStationData();
      const trains = await fetchTrainData();
      setStationData(stations.data);
      setTrainData(trains.data);
    };
    fetchData();
  }, []);

  return (
    <div className={styles.page_container}>
      <div className={styles.title_container}>
        <h1>{currColor.toUpperCase()} Line</h1>
      </div>
      <div className={styles.lines_page_container}>
        <div className={styles.navbar_column}>
          <NavBar line={currColor} stationData={stationData} />
        </div>
        <div className={styles.train_list_column}> 
          <div className={styles.options_container}>
            <button>Arriving</button>
            <button>Scheduled</button>
            <button>Northbound</button>
            <button>Southbound</button>
          </div>
          <TrainList line={currColor} trainData={trainData} />
        </div>
      </div>
    </div>
  );
}