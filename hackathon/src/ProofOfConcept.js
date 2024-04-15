import React, { useState, useEffect } from 'react';
import './ProofOfConcept.css';

const ProofOfConcept = () => {
    const [players, setPlayers] = useState([]);
    const [showPlayerInfo, setShowPlayerInfo] = useState(false);

    useEffect(() => {
        fetchPlayers();
    }, []);

    const fetchPlayers = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/players');
            if (!response.ok) {
                throw new Error('Failed to fetch player info');
            }
            const data = await response.json();
            setPlayers(data);
        } catch (error) {
            console.error('Error fetching player info:', error.message);
        }
    };

    const togglePlayerInfo = () => {
        setShowPlayerInfo(!showPlayerInfo);
    };

    return (
        <div className="proof-of-concept">
            <h2>Explore Memphis Grizzlies Legends</h2>
            <p>Discover career statistics, highlights, and achievements of legendary Memphis Grizzlies players.</p>
            <button onClick={togglePlayerInfo}>
                {showPlayerInfo ? "Hide Player Info" : "Show Player Info"}
            </button>
            {showPlayerInfo && (
                players.map(player => (
                    <div className="player-info-box" key={player.id}>
                        <h3>{player.name}</h3>
                        <p>Position: {player.position}</p>
                        <p>Years with Grizzlies: {player.yearsWithGrizzlies}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProofOfConcept;
