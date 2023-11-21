import Carousel from "../components/Carousel";
import AboutMe from "../components/AboutMe";
import ProjectInfo from "../components/ProjectInfo";
import "../styles/home.css";
import AboutProject from "../components/AboutProject";
import Navbar from "../components/Navbar";
const Home = () => {
  const slides = [
    { url: "/Slide1.png", title: "AIR\nPOLLUTION" },
    { url: "/Slide1.png", title: "WATER\nPOLLUTION" },
    { url: "/Slide1.png", title: "NOISE\nPOLLUTION" },
  ];

  return (
    <div className="HomeMain">
      <Navbar />
      <Carousel slides={slides} />
      <AboutProject />
      <ProjectInfo />
      <AboutMe />/
    </div>
  );
};

export default Home;
