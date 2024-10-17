import React from "react";
import Train from "./Train";

export default function TrainList({ line, trainData }) {
    const filteredTrains = trainData.filter(train => train.LINE.toLowerCase() === line.toLowerCase());

    return (
        <div className="trainList">
            {filteredTrains.map((trainObject) => (
                <Train key={trainObject._id} trainData={trainObject} />
            ))}
        </div>
    );
}