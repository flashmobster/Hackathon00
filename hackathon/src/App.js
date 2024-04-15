// App.js
import React from 'react';
import SplashSection from './SplashSection';
import AboutSection from './AboutSection';
import ProofOfConcept from './ProofOfConcept';
import './App.css'; // Import global CSS file for additional styling

const App = () => {
    return (
        <div className="app">
            <SplashSection />
            <AboutSection />
            <ProofOfConcept />
        </div>
    );
};

export default App;
