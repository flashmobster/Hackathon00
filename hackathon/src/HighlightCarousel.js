// HighlightCarousel.js
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "./HighlightCarousel.css";
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";


const HighlightCarousel = () => {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    fetch("https://hackathon00api.onrender.com/highlights")
      .then((response) => response.json())
      .then((data) => setHighlights(data.media))
      .catch((error) => console.error("Error fetching highlights:", error));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  const getYouTubeEmbedUrl = (url) => {
    const videoId = new URL(url).searchParams.get("v");
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div className="carousel-container">
      <Slider {...settings}>
        {highlights.map((highlight) => (
          <div key={highlight.id} className="highlight-card">
            <iframe
              width="100%"
              height="250"
              src={getYouTubeEmbedUrl(highlight.url)}
              title={highlight.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="video-frame"
            ></iframe>
            <div className="details">
              <h3>{highlight.title}</h3>
              <p>{highlight.subtitle}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HighlightCarousel;
