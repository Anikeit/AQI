import "../styles/Footer.css";
import Yt from "../Images/YT.png";
import FB from "../Images/FB.png";
import Insta from "../Images/Insta.png";
import Twitter from "../Images/Twitter.png";
import LinkedIn from "../Images/LinkedIn.png";

const Footer = () => {
  return (
    <footer>
      <div className="copyright">
        <h3>CompanyName @202X. All Rights reserved.</h3>
      </div>
      <div className="logos">
        <a href="">
          <img src={Yt} alt="Youtube Logo" className="img1"></img>
        </a>
        <a href="">
          <img src={FB} alt="FaceBook Logo" className="img2"></img>
        </a>
        <a href="">
          <img src={Twitter} alt="Twitter Logo" className="img3"></img>
        </a>
        <a href="">
          <img src={Insta} alt="Instagram Logo" className="img4"></img>
        </a>
        <a href="">
          <img src={LinkedIn} alt="LinkedIn Logo" className="img5"></img>
        </a>
      </div>
    </footer>
  );
};
export default Footer;
