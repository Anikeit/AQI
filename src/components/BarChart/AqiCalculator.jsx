export const calculateAQI_PM2 = (Cp) => {
  const breakpoints = [0, 30, 60, 90, 120, 250]; // Concentration breakpoints
  const AQI_values = [0, 50, 100, 200, 300, 400, 500]; // Corresponding AQI values

  // Find the appropriate interval for Cp
  let i = 0;
  while (i < breakpoints.length - 1 && Cp > breakpoints[i + 1]) {
    i++;
  }

  // Calculate the AQI using the formula
  const IHi = AQI_values[i + 1];
  const ILo = AQI_values[i];
  const BPHi = breakpoints[i + 1];
  const BPLo = breakpoints[i];

  const Ip = ((IHi - ILo) / (BPHi - BPLo)) * (Cp - BPLo) + ILo;
  return Ip;
};

export const calculateAQI_PM10 = (Cp) => {
  // Breakpoints and AQI values for PM10
  const breakpoints = [0, 50, 100, 250, 350, 430]; // Concentration breakpoints
  const AQI_values = [0, 50, 100, 200, 300, 400, 500]; // Corresponding AQI values

  // Find the appropriate interval for Cp
  let i = 0;
  while (i < breakpoints.length - 1 && Cp > breakpoints[i + 1]) {
      i++;
  }

  // Calculate the AQI using the formula
  const IHi = AQI_values[i + 1];
  const ILo = AQI_values[i];
  const BPHi = breakpoints[i + 1];
  const BPLo = breakpoints[i];

  const Ip = ((IHi - ILo) / (BPHi - BPLo)) * (Cp - BPLo) + ILo;
  return Ip;
};

export const calculateAQI_SO2 = (Cp) => {
  const breakpoints = [0, 40, 80, 380, 800, 1600];
  const AQI_values = [0, 50, 100, 200, 300, 400, 500];
  let i = 0;
  while (i < breakpoints.length - 1 && Cp > breakpoints[i + 1]) {
      i++;
  }
  const IHi = AQI_values[i + 1];
  const ILo = AQI_values[i];
  const BPHi = breakpoints[i + 1];
  const BPLo = breakpoints[i];
  const Ip = ((IHi - ILo) / (BPHi - BPLo)) * (Cp - BPLo) + ILo;
  return Ip;
}

export const calculateAQI_NO2 = (Cp) => {
  const breakpoints = [0, 40, 80, 180, 280, 400];
  const AQI_values = [0, 50, 100, 200, 300, 400, 500];
  let i = 0;
  while (i < breakpoints.length - 1 && Cp > breakpoints[i + 1]) {
      i++;
  }
  const IHi = AQI_values[i + 1];
  const ILo = AQI_values[i];
  const BPHi = breakpoints[i + 1];
  const BPLo = breakpoints[i];
  const Ip = ((IHi - ILo) / (BPHi - BPLo)) * (Cp - BPLo) + ILo;
  return Ip;
}
