import { useEffect, useState } from "react";
import StateViz from "./StateViz";
import "../../styles/Chart.css";
import Legend from "./Demographic/components/Legend";
import LegendTable from "./Demographic/components/Table";
import {
  calculateAQI_NO2,
  calculateAQI_PM10,
  calculateAQI_PM2,
  calculateAQI_SO2,
} from "./AqiCalculator";

// eslint-disable-next-line react/prop-types
const DropDownComponent = ({ data }) => {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedElement, setSelectedElement] = useState("");
  const [selectedNewEle, setSelectedNewEle] = useState("");

  let selectedYear = "2021";
  const states = data[selectedYear] ? Object.keys(data[selectedYear]) : [];
  const cities =
    selectedState && data[selectedYear] && data[selectedYear][selectedState]
      ? Object.keys(data[selectedYear][selectedState])
      : [];
  const elements =
    selectedCity &&
    data[selectedYear] &&
    data[selectedYear][selectedState] &&
    data[selectedYear][selectedState][selectedCity]
      ? Object.keys(data[selectedYear][selectedState][selectedCity])
      : [];
  selectedCity && elements.push("AQI");

  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    if (selectedCity) {
      setSelectedCity("");
    }
    if (selectedElement) {
      setSelectedElement("");
    }
    if (selectedNewEle) {
      setSelectedNewEle("");
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    if (selectedElement) {
      setSelectedElement("");
    }
    if (selectedNewEle) {
      setSelectedNewEle("");
    }
  };
  const handleElementChange = (event) => {
    setSelectedElement(event.target.value);
    setSelectedNewEle(event.target.value);
  };

  let allData = [];
  if (
    selectedCity &&
    selectedState &&
    selectedElement &&
    selectedNewEle != "AQI"
  ) {
    for (let i = 2013; i < 2022; i++) {
      let ele = selectedElement;
      if (
        data[i] &&
        data[i][selectedState] &&
        data[i][selectedState][selectedCity]
      ) {
        allData.push({
          year: i,
          'ug/m3' : data[i][selectedState][selectedCity][ele],
        });
      }
    }
  } else if (
    selectedCity &&
    selectedState &&
    selectedElement &&
    selectedNewEle == "AQI"
  ) {
    let AQIpm10 = 0,
      AQIpm2 = 0,
      AQIso2 = 0,
      AQIno2 = 0;
    for (let i = 2013; i < 2022; i++) {
      if (
        data[i] &&
        data[i][selectedState] &&
        data[i][selectedState][selectedCity]
      ) {
        if (!isNaN(data[i][selectedState][selectedCity]["pm10"])) {
          AQIpm10 = calculateAQI_PM10(
            data[i][selectedState][selectedCity]["pm10"]
          );
        }
        if (!isNaN(data[i][selectedState][selectedCity]["pm2"])) {
          AQIpm2 = calculateAQI_PM2(
            data[i][selectedState][selectedCity]["pm2"]
          );
        }
        if (!isNaN(data[i][selectedState][selectedCity]["So2"])) {
          AQIso2 = calculateAQI_SO2(
            data[i][selectedState][selectedCity]["So2"]
          );
        }
        if (!isNaN(data[i][selectedState][selectedCity]["No2"])) {
          AQIno2 = calculateAQI_NO2(
            data[i][selectedState][selectedCity]["No2"]
          );
        }
      }
      let calcAQI = Math.max(AQIpm10, AQIpm2, AQIno2, AQIso2);
      if (!AQIpm10 && !AQIpm2) {
        continue;
      } else if (calcAQI) {
        allData.push({
          year: i,
          'ug/m3' : calcAQI,
        });
      }
    }
  }

  return (
    <div className="container">
      <div className="heading">Year Wise Comparison</div>
      <div className="chartComp-yearwise">
        <div className="form-yearwise">
          <div>
            <label className="sel">Select State:</label>
            <br></br>
            <select
              value={selectedState}
              onChange={handleStateChange}
              className="state-yearwise"
            >
              <option value="">Select...</option>
              {states.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
            <br></br>
          </div>
          <div>
            <label className="sel">Select City:</label>
            <br></br>
            <select
              value={selectedCity}
              onChange={handleCityChange}
              className="city-yearwise"
            >
              <option value="">Select...</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
            <br></br>
          </div>
          <div>
            <label className="sel">Select Element:</label>
            <br></br>
            <select
              value={selectedNewEle}
              onChange={handleElementChange}
              className="element-yearwise"
            >
              <option value="">Select...</option>
              {elements.map((element) => (
                <option key={element} value={element}>
                  {element}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="chart-container">
          {allData != null && <StateViz data={allData} />}
        </div>
      </div>
      {allData != null && selectedNewEle && (
        <div style={{ padding: "15px" }}>
          <LegendTable element={selectedNewEle} />
        </div>
      )}
    </div>
  );
};
export default DropDownComponent;
