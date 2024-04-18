import React from 'react';
import './SplashSection.css'; 

const SplashSection = () => {
    return (
        <div className="splash-section">
            <h1>Welcome to Digital Delta!</h1>
            <h2>Home of the Grizzlies Data</h2>
            <img className='logo' src="/HokWsgRC.jpeg" alt="Grizzlies Generated Logo"></img>
            <p>We've got your Grizzlies Info!</p>
        </div>
    );
};

export default SplashSection;
