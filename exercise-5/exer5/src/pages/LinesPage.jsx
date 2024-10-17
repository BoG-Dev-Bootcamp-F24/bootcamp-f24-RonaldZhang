import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import TrainList from "../components/TrainList";
import axios from "axios";

import styles from "./LinesPage.module.css";

const fetchStationData = async () => await axios.get("http://localhost:3000/api/stations");
const fetchTrainData = async () => await axios.get("http://localhost:3000/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("red"); 
  const [stationData, setStationData] = useState([]);
  const [trainData, setTrainData] = useState([]);
  const [selectedStation, setSelectedStation] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stationsResponse = await fetchStationData(); 
        const trainsResponse = await fetchTrainData(); 
        setStationData(stationsResponse.data); 
        setTrainData(trainsResponse.data);  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const filteredTrainData = selectedStation
    ? trainData.filter(train => train.STATION_NAME === selectedStation)
    : trainData; 

  const handleStationSelect = (stationName) => {
    setSelectedStation(stationName); 
  };

  return (
    <div className={styles.page_container}>
      <div className={styles.title_container}>
        <h1>{currColor.toUpperCase()} Line</h1>
      </div>
      
      <div className={styles.lines_page_container}>
        <div className={styles.navbar_column}>
          <Navbar line={currColor} stationData={stationData} onStationSelect={handleStationSelect} />
        </div>

        <div className={styles.train_list_column}>
          <div className={styles.options_container}>
            <button>Arriving</button>
            <button>Scheduled</button>
            <button>Northbound</button>
            <button>Southbound</button>
          </div>

          <TrainList line={currColor} trainData={filteredTrainData} />
        </div>
      </div>
    </div>
  );
}
