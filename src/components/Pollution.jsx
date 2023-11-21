/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import "../styles/Pollution.css";
import LinkIcon from "../Images/LinkIcon.png";

const PollutionType = (props) => {
  return (
    <div className="Pollution">
      <h2>
        <img src={LinkIcon} className="LinkIcon" alt="LinkIcon" />
        {props.title}
      </h2>
      <p>{props.Description}</p>
      <img src={props.Img} className="PollutionImage" alt={props.title}></img>
    </div>
  );
};

PollutionType.propTypes = {
  title: PropTypes.string.isRequired,
  Description: PropTypes.string.isRequired,
  Img: PropTypes.string.isRequired,
};
export default PollutionType;
