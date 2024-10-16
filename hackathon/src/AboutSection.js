import React from 'react';
import './AboutSection.css'; 
import poole from './Screenshot_20241016_144806_Chrome.jpg'

const AboutSection = () => {
    return (
        <div className="about-section">
            <h2>About NBA Stats</h2>
            <img>
                src={poole}
                alt="Poole & The Gang"
                style{{width: '400px', height: '400px'}}
            </img>
            <p>This app will return stats for players in Memphis Grizzlies history.</p>
            <p>By doing this, our website streamlines information gathering on Grizzlies' players profiles. No need to filter through sites that may be bloated.</p>
        </div>
        
    );
};

export default AboutSection;
