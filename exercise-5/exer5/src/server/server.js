import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb+srv://ronaldarezhang:TzMtsfRQ6kGWbhvF@data.mmfva.mongodb.net/?retryWrites=true&w=majority&appName=data", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const trainSchema = new mongoose.Schema({
  DESTINATION: String,
  DIRECTION: String,
  EVENT_TIME: Date,
  HEAD_SIGN: String,
  LINE: String,
  NEXT_ARR: Date,
  STATION: String,
  TRAIN_ID: Number,
  WAITING_SECONDS: Number,
  WAITING_TIME: String,
  RESPONSETIMESTAMP: Date,
  VEHICLELONGITUDE: Number,
  VEHICLELATITUDE: Number,
  DELAY: String,
  TRIP_ID: Number
});

const stationSchema = new mongoose.Schema({
  line: {
    type: String,
    enum: ["red", "gold", "blue", "green"],
    required: true
  },
  stations: [{
    type: String,
    required: true
  }]
});

const Train = mongoose.model('Train', trainSchema);
const Station = mongoose.model('Station', stationSchema);

app.get("/api/trains", async (req, res) => {
  const { line } = req.query;
  try {
    let trains;
    if (line) {
      trains = await Train.find({ LINE: line.toUpperCase() });
    } else {
      trains = await Train.find();
    }
    res.json(trains);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/stations", async (req, res) => {
  try {
    const stations = await Station.find();
    res.json(stations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
