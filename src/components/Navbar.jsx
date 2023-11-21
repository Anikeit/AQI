import { Link } from "react-router-dom";
import "../styles/navbar.css";

const Navbar = () => {
  const handleScrollToAboutMe = () => {
    const currentURL = window.location.href;
    if (currentURL.includes("/projects")) {
      window.location.href = "/";
    }
    const aboutMeSection = document.getElementById("about-me");
    if (aboutMeSection) {
      aboutMeSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollTopHandler = () => {
    const homeTopSection = document.getElementById("HomeCarousel");
    if (homeTopSection) {
      homeTopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header>
      <div className="logo">
        <Link to="/" className="Logo">
          LOGO
        </Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/" onClick={scrollTopHandler}>
              HOME
            </Link>
          </li>
          <li>
            <Link to="#" onClick={handleScrollToAboutMe}>
              ABOUT ME
            </Link>
          </li>
          <li>
            <Link to="/projects">PROJECTS</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
