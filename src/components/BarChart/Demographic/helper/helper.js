export const BASE_URL = "http://localhost:5000"

export const colourPalatte = (val, ele)=>{
    if(ele==="So2")
    {
        if (val < 5) {
            return "#ffe6e6";
        }
        else if (val < 10) {
            return "#ffb3b3";
        }
        else if (val < 15) {
            return "#ff8080";
        }
        else if (val < 20) {
            return "#ff4d4d";
        }
        else if (val <= 25) {
            return "#ff1a1a";
        }
    }
    else if(ele==="No2")
    {
        if (val < 15) {
            return "#ffffff";
        }
        else if (val < 30) {
            return "#B1D4E0";
        }
        else if (val < 45) {
            return "#2E8BC0";
        }
        else if (val < 60) {
            return "#145DA0";
        }
        else if (val <= 75) {
            return "#0C2D48";
        }
    }
    else if(ele==="pm10")
    {
        if (val < 60) {
            return "#C5D1EB";
        }
        else if (val < 120) {
            return "#92AFD7";
        }
        else if (val < 180) {
            return "#5A7684";
        }
        else if (val < 240) {
            return "#395B50";
        }
        else if (val <= 300) {
            return "#1F2F16";
        }
    }
    else{
        if (val < 25) {
            return "#E8FCCF";
        }
        else if (val < 50) {
            return "#96E072";
        }
        else if (val < 75) {
            return "#3DA35D";
        }
        else if (val < 100) {
            return "#3E8914";
        }
        else if (val <= 120) {
            return "#134611";
        }
    }
}