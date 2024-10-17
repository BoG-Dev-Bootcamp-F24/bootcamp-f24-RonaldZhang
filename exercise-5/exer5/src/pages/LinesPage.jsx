import { useState, useEffect } from "react";
import NavBar from '../components/Navbar';
import TrainList from '../components/TrainList';
import axios from "axios";
import styles from "./LinesPage.module.css";

// Fetch station data
const fetchStationData = async () => await axios.get("http://localhost:3000/api/stations");

// Fetch train data
const fetchTrainData = async () => await axios.get("http://localhost:3000/api/trains");

export default function LinesPage() {
  const [currColor, setCurrColor] = useState("red"); // Current line color
  const [stationData, setStationData] = useState([]); // All station data
  const [trainData, setTrainData] = useState([]); // All train data
  const [selectedStation, setSelectedStation] = useState(null); // The station the user selects

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stations = await fetchStationData();
        const trains = await fetchTrainData();
        console.log("Fetched stations (LinesPage):", stations.data); // Log station data to verify
        console.log("Fetched trains (LinesPage):", trains.data); // Log train data to verify
        setStationData(stations.data); // Set stations
        setTrainData(trains.data); // Set trains
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Handle station selection
  const handleStationSelect = (station) => {
    console.log("Station selected:", station); // Log selected station
    setSelectedStation(station); // Update state with selected station
  };

  // Ensure trainData and selectedStation are valid
  const filteredTrains = selectedStation && trainData.length > 0
    ? trainData.filter((train) =>
        train.STATION_NAME && selectedStation && 
        typeof train.STATION_NAME === "string" && typeof selectedStation === "string" && 
        train.STATION_NAME.trim().toLowerCase() === selectedStation.trim().toLowerCase()
      )
    : trainData; // Show all trains if no station is selected or if trainData is empty

  console.log("Filtered Trains:", filteredTrains);  // Log the filtered train data to check if the filtering is working

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
          {/* Ensure there is data to display, or show a message */}
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
