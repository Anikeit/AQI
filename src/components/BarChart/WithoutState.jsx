import { useState } from "react";
import Select from "react-select";
import Viz3 from "./Viz3";
import "../../styles/Chart.css";
// eslint-disable-next-line react/prop-types
const WithoutState = ({ data }) => {
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedElement, setSelectedElement] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);
  const [selectedNewEle, setSelectedNewEle] = useState("");

  const handleYearChange = (selectedOption) => {
    setSelectedYear(selectedOption);
    setSelectedElement(null);
    setSelectedCities([]);
  };

  const handleElementChange = (selectedOption) => {
    let elePm2 = "pm2.5";
    let elePm10 = "pm10";
    let eleSo2 = "So2";
    let eleNo2 = "No2";
    if (selectedOption.value === "AQI" && selectedYear) {
      setSelectedNewEle("AQI");
      if (elements.includes(elePm10)) {
        setSelectedElement(elePm10);
      } else if (elements.includes(elePm2)) {
        setSelectedElement(elePm2);
      } else if (elements.includes(eleSo2)) {
        setSelectedElement(eleSo2);
      } else if (elements.includes(eleNo2)) {
        setSelectedElement(eleNo2);
      }
    } else {
      setSelectedNewEle(selectedOption.value);
      setSelectedElement(selectedOption.value);
    }
    setSelectedCities([]);
  };

  const handleCityChange = (selectedOptions) => {
    setSelectedCities(selectedOptions);
  };

  const years = Object.keys(data).map((year) => ({
    value: year,
    label: year,
  }));

  let elements = [];
  if (selectedYear) {
    const firstState = Object.keys(data[selectedYear.value])[0];
    const firstCity = Object.keys(data[selectedYear.value][firstState])[0];
    if (firstCity) {
      elements = Object.keys(data[selectedYear.value][firstState][firstCity]);
    }
  }
  selectedYear && elements.push("AQI");
  let cityOptions = [];
  if (selectedYear && selectedElement) {
    Object.keys(data[selectedYear.value]).forEach((state) => {
      Object.keys(data[selectedYear.value][state]).forEach((city) => {
        if (data[selectedYear.value][state][city][selectedElement]) {
          cityOptions.push({
            value: city,
            label: city,
          });
        }
      });
    });
  }

  let selectedData = [];
  if (
    selectedYear &&
    selectedElement &&
    selectedCities.length > 0 &&
    selectedNewEle != "AQI"
  ) {
    console.log("From first");
    selectedCities.forEach((city) => {
      const stateKeys = Object.keys(data[selectedYear.value]);
      for (let i = 0; i < stateKeys.length; i++) {
        const state = stateKeys[i];
        if (data[selectedYear.value][state][city.value]) {
          const concentration =
            data[selectedYear.value][state][city.value][selectedElement];
          if (concentration) {
            selectedData.push({
              city: city.label,
              data: concentration,
            });
            break;
          }
        }
      }
    });
  } else if (
    selectedYear &&
    selectedElement &&
    selectedNewEle == "AQI" &&
    selectedCities.length > 0
  ) {
    const reqpm10 = 150;
    const reqpm2 = 60;
    const reqso2 = 50;
    const reqno2 = 40;
    selectedCities.forEach((city) => {
      let ele = selectedElement;
      const stateKeys = Object.keys(data[selectedYear.value]);
      for (let i = 0; i < stateKeys.length; i++) {
        const state = stateKeys[i];
        if (data[selectedYear.value][state][city.value]) {
          let concentration =
            data[selectedYear.value][state][city.value][selectedElement];
          if (concentration) {
            if (ele == "pm2.5") {
              concentration = (concentration / reqpm2) * 100;
              selectedData.push({
                city: city.label,
                data: concentration,
              });
            } else if (ele == "pm10") {
              concentration = (concentration / reqpm10) * 100;
              selectedData.push({
                city: city.label,
                data: concentration,
              });
              // console.log(data)
            } else if (selectedElement == "So2") {
              concentration = (concentration / reqso2) * 100;
              selectedData.push({
                city: city.label,
                data: concentration,
              });
            } else if (selectedElement == "No2") {
              concentration = (concentration / reqno2) * 100;
              selectedData.push({
                city: city.label,
                data: concentration,
              });
            }
            break;
          }
        }
      }
    });
  }
  // console.log(selectedData)

  return (
    <div className="container">
      <div className="heading">City Wise Comparison for all Cities</div>
      <div className="chartComp">
        <div className="form">
          <label className="sel">Select Year:</label>
          <Select
            options={years}
            onChange={handleYearChange}
            value={selectedYear}
            className="Year"
          />
          {selectedYear && (
            <>
              <label className="sel">Select Element:</label>
              <br></br>
              <select
                value={selectedNewEle}
                onChange={(e) => handleElementChange({ value: e.target.value })}
                className="Element"
              >
                <option value="">Select</option>
                {elements.map((element) => (
                  <option key={element} value={element}>
                    {element}
                  </option>
                ))}
              </select>
              <br></br>

              <label className="sel">Select Cities:</label>
              <Select
                options={cityOptions}
                onChange={handleCityChange}
                value={selectedCities}
                isMulti
                className="City"
              />
            </>
          )}
        </div>
        <div>
          {selectedCities.length > 0 && selectedElement && (
            <div className="chart-container">
              {selectedData != null && <Viz3 data={selectedData} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithoutState;
