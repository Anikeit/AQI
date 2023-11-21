import { useEffect, useRef, useState } from "react";
import { Form, Button } from "react-bootstrap";
import Select from "react-select";
// import { getStatefunc, getCityfunc } from '../services/api'
function Home() {
  const [selectyear, setSelectYear] = useState("");
  const [stateOptions, setStateOptions] = useState([]);
  const [selectState, setSelectState] = useState("");
  const [cityOptions, setCityOptions] = useState([]);
  const [selectCity, setSelectCity] = useState("");
  const [info, setinfo] = useState({
    So2: "",
    No2: "",
    "pm2.5": "", // Property name with a dot
    pm10: "",
  });
  const selectStateInputRef = useRef();
  const selectCityInputRef = useRef();

  const onClear = () => {
    if (selectStateInputRef.current.props.value) {
      selectStateInputRef.current.clearValue();
    }
    if (selectCityInputRef.current.props.value) {
      selectCityInputRef.current.clearValue();
    }
  };

  const onClearCity = () => {
    if (selectCityInputRef.current.props.value) {
      selectCityInputRef.current.clearValue();
    }
  };

  const getStateFuncWrapper = async (
    selectedYear = "",
    selectedState = "",
    selectedCity = ""
  ) => {
    if (selectedState === "") {
      const response = await getStatefunc(
        selectedYear,
        selectedState,
        selectedCity
      );
      if (response.status === 200) {
        const state_array = response.data;
        const state_option = state_array.map((value) => ({
          value,
          label: value,
        }));
        setStateOptions(state_option);
      } else console.log("Error in " + selectedState);
    } else if (selectedCity === "") {
      const response = await getStatefunc(
        selectedYear,
        selectedState,
        selectedCity
      );
      if (response.status === 200 && response.data !== "") {
        const city_array = response.data;
        const city_option = city_array?.map((value) => ({
          value,
          label: value,
        }));
        setCityOptions(city_option);
      } else console.log("Error in" + selectedCity);
    } else {
      const response = await getStatefunc(
        selectedYear,
        selectedState,
        selectedCity
      );
      if (response.status === 200) {
        let infoData = response.data;
        setinfo(infoData);
      } else console.log("Error in Info");
    }
  };

  useEffect(() => {
    if (selectyear !== "") {
      onClear();
      setSelectState("");
      setStateOptions([]);
      setSelectCity("");
      setCityOptions([]);
      setinfo({
        So2: "",
        No2: "",
        "pm2.5": "", // Property name with a dot
        pm10: "",
      });
      getStateFuncWrapper(selectyear);
    }
  }, [selectyear]);

  useEffect(() => {
    if (selectState === "" && selectyear) {
      getStateFuncWrapper(selectyear);
    } else if (selectState !== "") {
      onClearCity();
      setSelectCity("");
      setCityOptions([]);
      setinfo({
        So2: "",
        No2: "",
        "pm2.5": "", // Property name with a dot
        pm10: "",
      });
      getStateFuncWrapper(selectyear, selectState);
    }
  }, [selectState]);

  useEffect(() => {
    if (selectState && selectyear && selectCity === "") {
      getStateFuncWrapper(selectyear, selectState);
    } else if (selectCity !== "") {
      getStateFuncWrapper(selectyear, selectState, selectCity);
    }
  }, [selectCity]);

  const getStateOptions = async (event) => {
    const selectyear = event?.value;
    setSelectYear(selectyear);
  };

  const getCityOptions = async (event) => {
    const selectState = event?.value;
    setSelectState(selectState);
  };

  const getInfo = async (event) => {
    const selectCity = event?.value;
    setSelectCity(selectCity);
    getStateFuncWrapper(selectyear, selectState, selectCity);
  };

  const option_year = [
    {
      value: "2021",
      label: "2021",
    },
    {
      value: "2020",
      label: "2020",
    },
    {
      value: "2019",
      label: "2019",
    },
    {
      value: "2018",
      label: "2018",
    },
    {
      value: "2017",
      label: "2017",
    },
    {
      value: "2016",
      label: "2016",
    },
    {
      value: "2015",
      label: "2015",
    },
    {
      value: "2014",
      label: "2014",
    },
    {
      value: "2013",
      label: "2013",
    },
  ];
  return (
    <div>
      <Form.Group
        className="mb-3 "
        style={{ width: "50vh", margin: "30px 30px 30px 30px" }}
        controlId="formtype"
      >
        <Form.Label>Select Your Year</Form.Label>
        <Select options={option_year} onChange={getStateOptions} />
      </Form.Group>
      <Form.Group
        className="mb-3 "
        style={{ width: "50vh", margin: "30px 30px 30px 30px" }}
        controlId="formtype"
      >
        <Form.Label>Select State</Form.Label>
        <Select
          ref={selectStateInputRef}
          options={stateOptions}
          onChange={getCityOptions}
        />
      </Form.Group>
      <Form.Group
        className="mb-3 "
        style={{ width: "50vh", margin: "30px 30px 30px 30px" }}
        controlId="formtype"
      >
        <Form.Label>Select City</Form.Label>
        <Select
          ref={selectCityInputRef}
          options={cityOptions}
          onChange={getInfo}
        />
      </Form.Group>

      <div>
        <h2>Information</h2>
        <p>SO2: {info.So2}</p>
        <p>NO2: {info.No2}</p>
        <p>PM2.5: {info["pm2.5"]}</p>
        <p>PM10: {info.pm10}</p>
      </div>
    </div>
  );
}

export default Home;
