import { useState } from "react";
import '../styles/AboutProject.css';

const Carousel = ({ slides }) => {
  const [slideIndex, setSlideIndex] = useState(0);

  const updateDot = () => {
    var dots = $(".dot");
    dots.map((dot, idx) => {
      if (idx === slideIndex) {
        dot.addClass("active");
        dot.removeClass("dot");
      } else {
        dot.addClass("dot");
        dot.removeClass("active");
      }
    });
  };

  const nextSlide = () => {
    if (slides.length === slideIndex + 1) {
      setSlideIndex(0);
    } else {
      setSlideIndex(slideIndex + 1);
    }
    updateDot();
  };
  const prevSlide = () => {
    if (slideIndex - 1 < 0) {
      setSlideIndex(slides.length - 1);
    } else {
      setSlideIndex(slideIndex - 1);
    }
    updateDot();
  };

  const jumpToSilde = (index) => {
    setSlideIndex(index);
    updateDot();
  };

  return (
    <div
      className="carousel" id="HomeCarousel"
      style={{ backgroundImage: `url(${slides[slideIndex].url})` }}
    >
      <div className="slide">
        <div className="arrow" onClick={prevSlide}>
          <img src="/ArrowLeft.png" alt="left arrow" className="img" />
        </div>
        <div className="title-container">
          <h1 className="slide-title">{slides[slideIndex].title}</h1>
          <button className="title-button">LEARN MORE</button>
        </div>
        <div className="arrow" onClick={nextSlide}>
          <img src="/ArrowRight.png" alt="right arrow" className="img"/>
        </div>
        <div className="dot-container">
          {slides.map((slide, idx) => (
            <div key={idx} className="dot" onClick={() => jumpToSilde(idx)}>
              &#9679;
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
