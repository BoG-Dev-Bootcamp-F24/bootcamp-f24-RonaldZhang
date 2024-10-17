import { useState, useEffect } from "react";
import NavBar from '../components/Navbar';
import TrainList from '../components/TrainList';
import axios from "axios";
import styles from "./LinesPage.module.css";

const fetchStationData = async () => await axios.get("http://localhost:3000/api/stations");

const fetchTrainData = async () => await axios.get("http://localhost:3000/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("RED"); // Set to uppercase "RED"
  const [stationData, setStationData] = useState([]); 
  const [trainData, setTrainData] = useState([]); 
  const [selectedStation, setSelectedStation] = useState(null); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await fetchStationData();
        const trains = await fetchTrainData();
        setStationData(stations.data); 
        setTrainData(trains.data); 
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleStationSelect = (station) => {
    console.log("Station selected:", station);
    setSelectedStation(station);
  };

  const filteredTrains = selectedStation && trainData.length > 0
    ? trainData.filter((train) =>
        train.STATION_NAME && selectedStation && 
        typeof train.STATION_NAME === "string" && typeof selectedStation === "string" && 
        train.STATION_NAME.trim().toLowerCase() === selectedStation.trim().toLowerCase()
      )
    : trainData;

  console.log("Filtered Trains:", filteredTrains);

  return (
    <div className={styles.page_container}>
      <div className={styles.title_container}>
        <h1>{currColor.toUpperCase()} Line</h1>
      </div>
      <div className={styles.lines_page_container}>
        <div className={styles.navbar_column}>
          <NavBar
            line={currColor}
            stationData={stationData}
            onStationSelect={handleStationSelect}
          />
        </div>
        <div className={styles.train_list_column}>
          {filteredTrains.length > 0 ? (
            <TrainList line={currColor} trainData={filteredTrains} />
          ) : (
            <p>No trains available for the selected station.</p>
          )}
        </div>
      </div>
    </div>
  );
}
