import { MongoClient } from 'mongodb';
import { readFileSync } from 'fs';
import path from 'path';

const uri = "mongodb+srv://ronaldarezhang:TzMtsfRQ6kGWbhvF@data.mmfva.mongodb.net/?retryWrites=true&w=majority&appName=data";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const database = client.db('exer5');
    const trainsCollection = database.collection('trains');
    const stationsCollection = database.collection('stations');

    const stationDataPath = '/Users/ronaldarezhang/pseudo-desktop/clubs/BoG/bootcamp-f24-RonaldZhang/exercise-5/stationData.json';
    const trainDataPath = '/Users/ronaldarezhang/pseudo-desktop/clubs/BoG/bootcamp-f24-RonaldZhang/exercise-5/trainData.json';

    const stationData = JSON.parse(readFileSync(stationDataPath, 'utf8'));
    const trainData = JSON.parse(readFileSync(trainDataPath, 'utf8')).RailArrivals;

    const stationDocuments = [];
    for (const line in stationData) {
      stationData[line].forEach(station => {
        stationDocuments.push({
          STATION_NAME: station,
          LINE: line.toUpperCase()
        });
      });
    }

    const stationInsertResult = await stationsCollection.insertMany(stationDocuments);
    console.log(`${stationInsertResult.insertedCount} stations inserted successfully`);

    const trainInsertResult = await trainsCollection.insertMany(trainData);
    console.log(`${trainInsertResult.insertedCount} trains inserted successfully`);

  } catch (err) {
    console.error("Error inserting data:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

run().catch(console.dir);
