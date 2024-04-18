import React, { useState } from 'react';
import SplashSection from './SplashSection';
import AboutSection from './AboutSection';
import ProofOfConcept from './ProofOfConcept';

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
            <SplashSection />
            <AboutSection />
            <ProofOfConcept fetchPlayerInfo={fetchPlayerInfo} playerInfo={playerInfo} />
        </div>
    );
};

export default App;
