import React, { useState, useEffect, useRef } from 'react';
import './HighlightCarousel.css';

const HighlightCarousel = () => {
  const [highlights, setHighlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isThumbnail, setIsThumbnail] = useState(true);
  const playerRef = useRef(null); // Reference for the YouTube Player instance

  // Fetch highlights from the API
  useEffect(() => {
    fetch('https://hackathon00api.onrender.com/highlights')
      .then((response) => response.json())
      .then((data) => setHighlights(data.media))
      .catch((error) => console.error('Error fetching highlights:', error));
  }, []);

  // Initialize YouTube Player API when needed
  useEffect(() => {
    if (!isThumbnail) {
      loadYouTubeAPI();
    }
  }, [isThumbnail]);

  // Reset thumbnail and player state when slide changes
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length);
    setIsThumbnail(true);
    stopVideo();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? highlights.length - 1 : prevIndex - 1
    );
    setIsThumbnail(true);
    stopVideo();
  };

  // Load the YouTube IFrame Player API
  const loadYouTubeAPI = () => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = createPlayer;
    } else {
      createPlayer();
    }
  };

  // Create the YouTube Player instance
  const createPlayer = () => {
    const videoId = highlights[currentIndex]?.videoId;
    playerRef.current = new window.YT.Player(`youtube-player-${currentIndex}`, {
      videoId: videoId,
      playerVars: { autoplay: 1, mute: 1 },
      events: {
        onReady: (event) => event.target.playVideo(),
      },
    });
  };

  // Stop the video when navigating between slides
  const stopVideo = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
    }
  };

  // Display a loading state until highlights are fetched
  if (highlights.length === 0) return <p>Loading highlights...</p>;

  const currentHighlight = highlights[currentIndex];

  return (
    <div className="carousel-container">
      <button onClick={prevSlide} className="carousel-button left">&#10094;</button>

      <div className="carousel-slide">
        {isThumbnail ? (
          <img
            src={currentHighlight.thumbnailUrl}
            alt={currentHighlight.title}
            className="carousel-image"
            onLoad={() => setTimeout(() => setIsThumbnail(false), 4000)} // Switch to video after 4s
          />
        ) : (
          <div
            id={`youtube-player-${currentIndex}`}
            className="carousel-video"
          ></div>
        )}
        <h2>{currentHighlight.title}</h2>
        <p>{currentHighlight.subtitle}</p>
      </div>

      <button onClick={nextSlide} className="carousel-button right">&#10095;</button>
    </div>
  );
};

export default HighlightCarousel;
