import React, { useState, useEffect, useRef } from 'react';
import './HighlightCarousel.css';

const HighlightCarousel = () => {
  const [highlights, setHighlights] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const playerRef = useRef(null);

  useEffect(() => {
    fetch('https://hackathon00api.onrender.com/highlights')
      .then((response) => response.json())
      .then((data) => setHighlights(data.media))
      .catch((error) => console.error('Error fetching highlights:', error));
  }, []);

  // Load YouTube IFrame Player API
  const loadYouTubeAPI = () => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
      
      window.onYouTubeIframeAPIReady = () => {
        createPlayer();
      };
    } else {
      createPlayer();
    }
  };

  // Create the YouTube player instance
  const createPlayer = () => {
    const videoId = highlights[currentIndex]?.videoId;
    playerRef.current = new window.YT.Player(`youtube-player-${currentIndex}`, {
      videoId: videoId,
      playerVars: { autoplay: 1, mute: 1, enablejsapi: 1 },
      events: {
        onReady: (event) => {
          setIsVideoReady(true);
        },
      },
    });
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % highlights.length);
    setIsVideoReady(false);
    stopVideo();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? highlights.length - 1 : prevIndex - 1));
    setIsVideoReady(false);
    stopVideo();
  };

  const stopVideo = () => {
    if (playerRef.current) {
      playerRef.current.stopVideo();
    }
  };

  const playVideo = () => {
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  if (highlights.length === 0) return <p>Loading highlights...</p>;

  const currentHighlight = highlights[currentIndex];

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
        {isVideoReady && (
          <div
            id={`youtube-player-${currentIndex}`}
            className="carousel-video"
          ></div>
        )}
        <button onClick={playVideo} className="play-button">Play Video</button>
      </div>

      <button onClick={nextSlide} className="carousel-button right">&#10095;</button>
    </div>
  );
};

export default HighlightCarousel;
