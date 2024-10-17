import React, { useState, useEffect, useRef } from 'react';
import './HighlightCarousel.css';

const HighlightCarousel = () => {
  const [highlights, setHighlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRef = useRef(null); // Reference to the video element
  const [isThumbnail, setIsThumbnail] = useState(true);

  // Fetch highlights from the API
  useEffect(() => {
    fetch('https://hackathon00api.onrender.com/highlights')
      .then((response) => response.json())
      .then((data) => setHighlights(data.media))
      .catch((error) => console.error('Error fetching highlights:', error));
  }, []);

  // Switch from thumbnail to video after 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => setIsThumbnail(false), 4000);
    return () => clearTimeout(timer); // Cleanup on unmount or slide change
  }, [currentIndex]);

  // Reset to thumbnail when slide changes
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length);
    setIsThumbnail(true); // Reset to thumbnail
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? highlights.length - 1 : prevIndex - 1
    );
    setIsThumbnail(true); // Reset to thumbnail
  };

  // Play video when available
  useEffect(() => {
    if (videoRef.current && !isThumbnail) {
      videoRef.current.muted = true;
      videoRef.current.play();
    }
  }, [isThumbnail]);

  if (highlights.length === 0) return <p>Loading highlights...</p>;

  const currentHighlight = highlights[currentIndex];
  const videoUrl = `https://www.youtube.com/embed/${currentHighlight.videoId}?autoplay=1&mute=1`;

  return (
    <div className="carousel-container">
      <button onClick={prevSlide} className="carousel-button left">&#10094;</button>

      <div className="carousel-slide">
        {isThumbnail ? (
          <img
            src={currentHighlight.thumbnailUrl}
            alt={currentHighlight.title}
            className="carousel-image"
          />
        ) : (
          <iframe
            ref={videoRef}
            src={videoUrl}
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="carousel-video"
            title={currentHighlight.title}
          ></iframe>
        )}
        <h2>{currentHighlight.title}</h2>
        <p>{currentHighlight.subtitle}</p>
      </div>

      <button onClick={nextSlide} className="carousel-button right">&#10095;</button>
    </div>
  );
};

export default HighlightCarousel;
