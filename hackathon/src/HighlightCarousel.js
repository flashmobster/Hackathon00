import React, { useState, useEffect } from 'react';
import './HighlightCarousel.css';

const HighlightCarousel = () => {
  const [highlights, setHighlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('https://hackathon00api.onrender.com/highlights')
      .then((response) => response.json())
      .then((data) => setHighlights(data.media))
      .catch((error) => console.error('Error fetching highlights:', error));
  }, []);

  if (highlights.length === 0) return <p>Loading highlights...</p>;

  const currentHighlight = highlights[currentIndex];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? highlights.length - 1 : prevIndex - 1));
  };

  return (
    <div className="carousel-container">
      <button onClick={prevSlide} className="carousel-button left">&#10094;</button>

      <div className="carousel-slide">
        {/* <img
          src={currentHighlight.thumbnailUrl}
          alt={currentHighlight.title}
          className="carousel-image"
        /> */}
        <h2>{currentHighlight.title}</h2>
        <p>{currentHighlight.subtitle}</p>
        <a href={currentHighlight.url} target="_blank" rel="noopener noreferrer" className="view-button">View on YouTube</a>
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${currentHighlight.url.split('v=')[1]}`}
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          title={currentHighlight.title}
          className="youtube-iframe"
        ></iframe>
      </div>

      <button onClick={nextSlide} className="carousel-button right">&#10095;</button>
    </div>
  );
};

export default HighlightCarousel;
