import React, { useState } from 'react';
import SplashSection from './SplashSection';
import AboutSection from './AboutSection';
import ProofOfConcept from './ProofOfConcept';
import Header from './Header';
import HighlightCarousel from './HighlightCarousel';
// import 'slick-carousel/slick/';
// import 'slick-carousel/slick/slick-theme.css';



const App = () => {
    const [playerInfo, setPlayerInfo] = useState(null);

    const fetchPlayerInfo = async () => {
        try {
            const response = await fetch('/'); 
            const data = await response.json();
            setPlayerInfo(data);
        } catch (error) {
            console.error('Error fetching player info:', error);
        }
    };

    return (
        <div>
            <Header />
            <SplashSection />
            <h1>Recent Grizzlies Highlights</h1>
            <HighlightCarousel />
            <AboutSection />
            <ProofOfConcept fetchPlayerInfo={fetchPlayerInfo} playerInfo={playerInfo} />
        </div>
    );
};

export default App;
