// import React from "react";

const Legend = ({element}) => {
    console.log("outside ", element)

    let So2 = [
        { value : 5, color : "#ffe6e6" },
        { value : 10, color : "#ffb3b3" },
        { value : 15, color : "#ff8080" },
        { value : 20, color : "#ff4d4d" },
        { value : 25, color : "#ff1a1a" },
    ]

    let No2 = [
        { value : 15, color : "#ffffff" },
        { value : 30, color : "#B1D4E0" },
        { value : 45, color : "#2E8BC0" },
        { value : 60, color : "#145DA0" },
        { value : 75, color : "#0C2D48" },
    ]

    let pm10 = [
        { value : 60, color : "#C5D1EB" },
        { value : 120, color : "#92AFD7" },
        { value : 180, color : "#5A7684" },
        { value : 240, color : "#395B50" },
        { value : 300, color : "#1F2F16" },
    ]

    let pm2 = [
        { value : 25, color : "#E8FCCF" },
        { value : 50, color : "#96E072" },
        { value : 75, color : "#3DA35D" },
        { value : 100, color : "#3E8914" },
        { value : 125, color : "#134611" },
    ]
    let AQI = [
        { value : 60, color : "#C5D1EB" },
        { value : 120, color : "#92AFD7" },
        { value : 180, color : "#5A7684" },
        { value : 240, color : "#395B50" },
        { value : 300, color : "#1F2F16" },
    ]


    const renderLegend = (element) => {
        console.log(element)
        if(element === "So2"){
            return So2.map((obj) => {
                return(
                    <div key={Math.random()}>
                        <div style={{backgroundColor : obj.color, width: '50px', height: '30px'}}></div>
                        <div style={{display : 'flex' ,justifyContent: 'end'}}>{obj.value}</div>
                    </div>
                )
            })
        }
        else if(element === "No2"){
            return No2.map((obj) => {
                return(
                    <div key={Math.random()}>
                        <div style={{backgroundColor : obj.color, width: '50px', height: '30px'}}></div>
                        <div style={{display : 'flex' ,justifyContent: 'end'}}>{obj.value}</div>
                    </div>
                )
            })
        }
        else if(element === "pm10"){
            return pm10.map((obj) => {
                return(
                    <div key={Math.random()}>
                        <div style={{backgroundColor : obj.color, width: '50px', height: '30px'}}></div>
                        <div style={{display : 'flex' ,justifyContent: 'end'}}>{obj.value}</div>
                    </div>
                )
            })
        }
        else if(element === "pm2.5"){
            return pm2.map((obj) => {
                return(
                    <div key={Math.random()}>
                        <div style={{backgroundColor : obj.color, width: '50px', height: '30px'}}></div>
                        <div style={{display : 'flex' ,justifyContent: 'end'}}>{obj.value}</div>
                    </div>
                )
            })
        }
        else if(element === "AQI"){
            return pm10.map((obj) => {
                return(
                    <div key={Math.random()}>
                        <div style={{backgroundColor : obj.color, width: '50px', height: '30px'}}></div>
                        <div style={{display : 'flex' ,justifyContent: 'end'}}>{obj.value}</div>
                    </div>
                )
            })
        }
    }

    return(
        <div className="legend-container" style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            {
                element ? 
                renderLegend(element) : null
            }
            
        </div>
    )
}

export default Legend;
