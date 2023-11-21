import jsonData from "../data/air_2013.json"
import data_final from "../data/data.json"
import state_year from "../data/testing.json"
import trial from "../data/state_wise.json"
// import data_19 from '../data/air_19.json'
// import data_20 from '../data/air_20.json'
// import data_21 from '../data/air_21.json'
// import data_18 from '../data/air_18.json'
// import data_17 from '../data/air_17.json'
// import data_16 from '../data/air_16.json'
// import data_15 from '../data/air_15.json'
// import data_14 from '../data/air_14.json'
// import data_13 from '../data/air_13.json'
import React from 'react'
//const fs = require("fs");
function Converter() {

  // const data_final = {};
  // data_final["2021"] = data_21;
  // data_final["2020"] = data_20;
  // data_final["2019"] = data_19;
  // data_final["2018"] = data_18; 
  // data_final["2017"] = data_17;
  // data_final["2016"] = data_16;
  // data_final["2015"] = data_15;
  // data_final["2014"] = data_14;
  // data_final["2013"] = data_13;

  //  console.log(JSON.stringify(data_final));
  //console.log(JSON.stringify(jsonData));
  let s_low = 1000, n_low = 1000, p10_low = 1000, p25_low = 1000;
  let s_high = 0, n_high = 0, p10_high = 0, p25_high = 0;

  for (const state in trial) {
    for (const year in trial[state]) {
      const obj = trial[state][year];
      if (obj["So2"]) {
        const value = obj["So2"];
        if (value > s_high)
          s_high = value;
        if (value < s_low)
          s_low = value;
      }
      if (obj["No2"]) {
        const value = obj["No2"];
        if (value > n_high)
          n_high = value;
        if (value < n_low)
          n_low = value;
      }
      if (obj["pm10"]) {
        const value = obj["pm10"];
        if (value > p10_high)
          p10_high = value;
        if (value < p10_low)
          p10_low = value;
      }
      if (obj["pm2.5"]) {
        const value = obj["pm2.5"];
        if (value > p25_high)
          p25_high = value;
        if (value < p25_low)
          p25_low = value;
      }
    }
  }

console.log(`So2 : high = ${s_high} ; low = ${s_low} No2 : high = ${n_high} ; low = ${n_low} Pm10 : high = ${p10_high} ; low = ${p10_low} pm2.5 : high = ${p25_high} ; low = ${p25_low}`)



  const state_yearwise = {};
  for (const year in data_final) {
    const states = data_final[year];
    for (const state in states) {
      if (!state_yearwise[state])
        state_yearwise[state] = {};
      if (!state_yearwise[state][year])
        state_yearwise[state][year] = {};
      const obj = states[state];
      //const obj = state_yearwise[state][year];
      for (const cities in obj) {
        const city = obj[cities];
        //console.log(obj[city]);
        if (city["So2"]) {
          if (!state_yearwise[state][year]["So2"])
            state_yearwise[state][year]["So2"] = [];
          state_yearwise[state][year]["So2"].push(city["So2"])
        }
        if (city["No2"]) {
          if (!state_yearwise[state][year]["No2"])
            state_yearwise[state][year]["No2"] = [];
          state_yearwise[state][year]["No2"].push(city["No2"])
        }
        if (city["pm10"]) {
          if (!state_yearwise[state][year]["pm10"])
            state_yearwise[state][year]["pm10"] = [];
          state_yearwise[state][year]["pm10"].push(city["pm10"])
        }
        if (city["pm2.5"]) {
          if (!state_yearwise[state][year]["pm2.5"])
            state_yearwise[state][year]["pm2.5"] = [];
          state_yearwise[state][year]["pm2.5"].push(city["pm2.5"])
        }
      }
    }
  }

  // for(const state in state_year)
  // {
  //   for(const year in state_year[state])
  //   {
  //     if(state_year[state][year]["So2"])
  //     {
  //       state_year[state][year]["So2"] = calculateMedian(state_year[state][year]["So2"]);
  //     }
  //     if(state_year[state][year]["No2"])
  //     {
  //       state_year[state][year]["No2"] = calculateMedian(state_year[state][year]["No2"]);
  //     }
  //     if(state_year[state][year]["pm10"])
  //     {
  //       state_year[state][year]["pm10"] = calculateMedian(state_year[state][year]["pm10"]);
  //     }
  //     if(state_year[state][year]["pm2.5"])
  //     {
  //       state_year[state][year]["pm2.5"] = calculateMedian(state_year[state][year]["pm2.5"]);
  //     }
  //   }
  // }

  //console.log(JSON.stringify(state_year));

  const nestedObject = {};

  for (const tablename in jsonData) {
    const table = jsonData[tablename];

    for (const item in table) {
      const obj = table[item];
      const state = obj.state;
      const city = obj.city;

      if (!nestedObject[state]) {
        nestedObject[state] = {};
      }
      if (!nestedObject[state][city]) {
        nestedObject[state][city] = {};
      }
      if (obj["so2"] !== undefined) {
        if (!nestedObject[state][city]["So2"]) {
          nestedObject[state][city]["So2"] = [];
        }
        nestedObject[state][city]["So2"].push(obj["so2"]);
      }

      if (obj["no2"] !== undefined) {
        if (!nestedObject[state][city]["No2"]) {
          nestedObject[state][city]["No2"] = [];
        }
        nestedObject[state][city]["No2"].push(obj["no2"]);
      }
      if (obj["pm10"] !== undefined) {
        if (!nestedObject[state][city]["pm10"]) {
          nestedObject[state][city]["pm10"] = [];
        }
        nestedObject[state][city]["pm10"].push(obj["pm10"]);
      }

      if (obj["pm2.5"] !== undefined) {
        if (!nestedObject[state][city]["pm2.5"]) {
          nestedObject[state][city]["pm2.5"] = [];
        }
        nestedObject[state][city]["pm2.5"].push(obj["pm2.5"]);
      }
    }
  }

  function calculateMedian(arr) {
    arr.sort((a, b) => a - b);
    const mid = Math.floor(arr.length / 2);

    if (arr.length % 2 === 0) {
      return (arr[mid - 1] + arr[mid]) / 2;
    } else {
      return arr[mid];
    }
  }


  for (const state in nestedObject) {
    for (const city in nestedObject[state]) {
      if (nestedObject[state][city]["So2"]) {
        nestedObject[state][city]["So2"] = calculateMedian(nestedObject[state][city]["So2"]);
      }
      if (nestedObject[state][city]["No2"]) {
        nestedObject[state][city]["No2"] = calculateMedian(nestedObject[state][city]["No2"]);
      }
      if (nestedObject[state][city]["pm10"]) {
        nestedObject[state][city]["pm10"] = calculateMedian(nestedObject[state][city]["pm10"]);
      }
      if (nestedObject[state][city]["pm2.5"]) {
        nestedObject[state][city]["pm2.5"] = calculateMedian(nestedObject[state][city]["pm2.5"]);
      }
    }
  }



  // const data_1 = JSON.stringify(nestedObject);
  // console.log(data_1);

  // // writing the JSON string content to a file
  // fs.writeFile("air.json", data_1, (error) => {
  //   // throwing the error
  //   // in case of a writing problem
  //   if (error) {
  //     // logging the error
  //     console.error(error);

  //     throw error;
  //   }

  //   console.log("data.json written correctly");
  // });

  //console.log(nestedObject);
  return (
    <div></div>
  )
}

export default Converter