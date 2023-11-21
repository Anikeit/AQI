import PollutionType from "./Pollution";
import "../styles/Pollution.css";
import AirPollutionImage from "../Images/AirPollution.jpeg";
import WaterPollutionImage from "../Images/WaterPollution.jpeg";
import NoisePollutionImage from "../Images/NoisePollution.jpeg";

const ProjectData = [
  {
    id: 1,
    title: "Air Pollution",
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptate eum perspiciatis, eveniet aperiam soluta impedit quis dolore mollitia facilis?",
    Img: AirPollutionImage,
  },
  {
    id: 2,
    title: "Water Pollution",
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptate eum perspiciatis, eveniet aperiam soluta impedit quis dolore mollitia facilis?",

    Img: WaterPollutionImage,
  },
  {
    id: 3,
    title: "Noise Pollution",
    Description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta voluptate eum perspiciatis, eveniet aperiam soluta impedit quis dolore mollitia facilis?",
    Img: NoisePollutionImage,
  },
];

const ProjectInfo = () => {
  return (
    <div className="ProjectInfo">
      <h1>More about the project...</h1>
      <div className="PollutionTypes">
        <PollutionType
          title={ProjectData[0].title}
          Description={ProjectData[0].Description}
          Img={ProjectData[0].Img}
        />
        <PollutionType
          title={ProjectData[1].title}
          Description={ProjectData[1].Description}
          Img={ProjectData[1].Img}
        />
        <PollutionType
          title={ProjectData[2].title}
          Description={ProjectData[2].Description}
          Img={ProjectData[2].Img}
        />
      </div>
    </div>
  );
};
export default ProjectInfo;
