import React from "react";
import "./Table.css";
const LegendTable = ({ element }) => {
  let ranges = [];

  switch (element) {
    case "So2":
      ranges = ["0-5", "5-10", "10-15", "15-20", "20-25", "25-30"];
      break;
    case "No2":
      ranges = ["0-15", "15-30", "30-45", "45-60", "60-75", "75-90"];
      break;
    case "pm10":
      ranges = ["0-60", "60-120", "120-180", "180-240", "240-300", "300-360"];
      break;
    case "pm2.5":
      ranges = ["0-25", "25-50", "50-75", "75-100", "100-125", "125-150"];
      break;
    case "AQI":
      ranges = ["0-60", "60-120", "120-180", "180-240", "240-300", "300-360"];
      break;
    default:
      ranges = [];
  }

  const HealthRemark = [
    "Minimal Impact",
    "Minor breathing discomfort to sensitive people",
    "Breathing discomfort to the people with lungs,asthma and heart disease",
    "Breathing discomfort to most people on prolongued exposure",
    "Respiratory Illness on prolongued Exposure",
    "Affects healthy people and seriously impacts those with existing diseases",
  ];

  const RemarkData = [
    "Good",
    "Satisfactory",
    "Moderate",
    "Poor",
    "Very Poor",
    "Severe",
  ];

  const colorData = [
    "#00ff00",
    "#ffff00",
    "#ffa500",
    "#ff0000",
    "#99004c",
    "#7e0023",
  ];

  const legendData = ranges.map((range, index) => ({
    rangeValue: range,
    remark: RemarkData[index],
    color: colorData[index],
    healthRemark: HealthRemark[index],
  }));

  return (
    <div className="table-container">
      <h2 className="table-title">Legend ({element})</h2>
      <table className="legend-table">
        <thead>
          <tr>
            <th
              className="p-2 border text-center"
              style={{
                padding: 2,
              }}
            >
              Range Value
            </th>
            <th
              className="p-2 border"
              style={{
                padding: 2,
              }}
            >
              Remark
            </th>
           {/* <th
              className="p-2 border"
              style={{
                padding: 2,
              }}
            >
              Color
            </th> */}
            <th
              className="p-2 border"
              style={{
                padding: 2,
              }}
            >
              Health Remark
            </th>
          </tr>
        </thead>
        <tbody>
          {legendData.map((item) => (
            <tr key={item.rangeValue} className="mb-4">
              <td className="p-2 border-2">{item.rangeValue}</td>
              <td className="p-2 border-2">{item.remark}</td>
              {/* <td
                className="p-2 border"
                style={{
                  backgroundColor: item.color,
                  width: "30px",
                  height: "20px",
                }}
              ></td> */}
              <td className="p-4 border text-center">{item.healthRemark}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LegendTable;
