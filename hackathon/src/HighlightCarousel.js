import React, { useState, useEffect } from 'react';
import './HighlightCarousel.css';

const HighlightCarousel = () => {
  const [highlights, setHighlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch('https://hackathon00api.onrender.com/highlights')
      .then((response) => response.json())
      .then((data) => setHighlights(data.media))
      .catch((error) => console.error('Error fetching highlights:', error));
  }, []);

  if (highlights.length === 0) return <p>Loading highlights...</p>;

  const currentHighlight = highlights[currentIndex];

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length);
    closeModal(); // Close the modal when changing slides
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? highlights.length - 1 : prevIndex - 1));
    closeModal(); // Close the modal when changing slides
  };

  return (
    <div className="carousel-container">
      <button onClick={prevSlide} className="carousel-button left">&#10094;</button>

      <div className="carousel-slide">
        <img
          src={currentHighlight.thumbnailUrl}
          alt={currentHighlight.title}
          className="carousel-image"
        />
        <h2>{currentHighlight.title}</h2>
        <p>{currentHighlight.subtitle}</p>
        <button onClick={openModal} className="play-button">Play Video</button>
      </div>

      <button onClick={nextSlide} className="carousel-button right">&#10095;</button>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="close-button">&times;</button>
            <h2>{currentHighlight.title}</h2>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${currentHighlight.videoId}?autoplay=1&mute=1`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
              title="YouTube Video"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default HighlightCarousel;
