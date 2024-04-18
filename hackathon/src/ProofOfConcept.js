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
            const response = await fetch('https://hackathon00api.onrender.com/');
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
            <h2>Explore Former & Current Memphis Grizzlies</h2>
            <p>Find Out About Every Grizzly.</p>
            <button onClick={togglePlayerInfo}>
                {showPlayerInfo ? "Hide Player Info" : "Show Player Info"}
            </button>
            {showPlayerInfo && (
                players.map(player => (
                    <div className="player-info-box" key={player.id}>
                        <h3>{player.first_name} {player.last_name}</h3>
                        <p>Position: {player.position}</p>
                        <p>Draft Year: {player.draft_year}</p>
                    </div>
                ))
            )}
        </div>
    );
};

export default ProofOfConcept;
