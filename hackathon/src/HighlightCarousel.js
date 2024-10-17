import React, { useState, useEffect } from 'react';
import './HighlightCarousel.css';

const HighlightCarousel = () => {
  const [highlights, setHighlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch highlights from the API
  useEffect(() => {
    fetch('https://hackathon00api.onrender.com/highlights')
      .then((response) => response.json())
      .then((data) => setHighlights(data.media))
      .catch((error) => console.error('Error fetching highlights:', error));
  }, []);

  // Handle navigation
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? highlights.length - 1 : prevIndex - 1
    );
  };

  // Render only if highlights are available
  if (highlights.length === 0) return <p>Loading highlights...</p>;

  return (
    <div className="carousel-container">
      <button onClick={prevSlide} className="carousel-button left">&#10094;</button>

      <div className="carousel-slide">
        <a href={highlights[currentIndex].url} target="_blank" rel="noopener noreferrer">
          <img
            src={highlights[currentIndex].thumbnailUrl}
            alt={highlights[currentIndex].title}
            className="carousel-image"
          />
        </a>
        <h2>{highlights[currentIndex].title}</h2>
        <p>{highlights[currentIndex].subtitle}</p>
      </div>

      <button onClick={nextSlide} className="carousel-button right">&#10095;</button>
    </div>
  );
};

export default HighlightCarousel;
