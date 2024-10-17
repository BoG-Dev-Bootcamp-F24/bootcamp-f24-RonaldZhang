import React from "react";
import styles from "./Train.module.css";

export default function Train({ trainData }) {

    const {
        DESTINATION,
        HEAD_SIGN,
        LINE,
        WAITING_TIME,
        DELAY,
    } = trainData;

    const [lineColor, lineName] = getLineColor(LINE);

    const stationLetter = HEAD_SIGN.charAt(0);
    const onTime = DELAY === "T0S"; 
    const destStation = fixCapitalization(DESTINATION) + " Station";
    const currStation = fixCapitalization(HEAD_SIGN) + " Station";
    const [waitNum, waitUnit] = WAITING_TIME.split(" ");

    return (
        <div className={styles.trainContainer}>

            <div className={styles.stationLetter}>
                <span>{stationLetter}</span>
            </div>

            <div className={styles.trainInfo}>
                <div className={styles.routeRow}>
                    <span>{currStation}</span>
                    <span className={styles.arrow}>→</span>
                    <span>{destStation}</span>
                </div>

                <div className={styles.lineRow}>
                    <div className={styles.lineContainer} style={{ backgroundColor: lineColor }}>
                        <span className={styles.lineName}>{LINE.toLowerCase()}</span>
                    </div>
                    <span className={styles.delay} style={{ color: onTime ? "green" : "red" }}>{onTime ? "On time" : "Delayed"}</span>
                </div>
            </div>

            <div className={styles.timeToStation}>
                <div className={styles.timeRow}>
                    <span>{waitNum}</span>
                </div>
                <div className={styles.unitRow}>
                    <span>{waitUnit}</span>
                </div>
            </div>
            
        </div>
    );
}

function fixCapitalization( name ) {
    if (!name) return '';

    let words = name.toLowerCase().split(" ")
    for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(" ");
}

function getLineColor( line ) {
    const lineColors = {
        "RED": ["#FF0000", "Red"],
        "BLUE": ["#0000FF", "Blue"],
        "GREEN": ["#00FF00", "Green"],
        "GOLD": ["#FFD700", "Gold"],
    }
    return lineColors[line];
}