import React, { useState, useEffect } from 'react';
import './ProofOfConcept.css';

const ProofOfConcept = ({ fetchPlayerInfo }) => {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        fetchPlayers();
    }, []);

    useEffect(() => {
        console.log('Players:', players);
    }, [players]);

    const fetchPlayers = async () => {
        try {
            const response = await fetch('https://hackathon00api.onrender.com/');
            if (!response.ok) {
                throw new Error('Failed to fetch player info');
            }
            const data = await response.json();
            console.log('Player Data:', data);
            setPlayers(data.data);
        } catch (error) {
            console.error('Error fetching player info:', error.message);
        }
    };

    const getDraftInfo = (player) => {
        if (player.draft_year === null || player.draft_round === null || player.draft_number === null) {
            return 'Undrafted';
        } else {
            return `${player.draft_year} (Round ${player.draft_round}, Pick ${player.draft_number})`;
        }
    };

    return (
        <div className="proof-of-concept">
            <h2>Explore Former & Current Memphis Grizzlies</h2>
            <p>Find Out About Every Grizzly.</p>
            <div className="row">
                {players.length > 0 ? (
                    players.map(player => (
                        <div key={player.id} className="player-card">
                            <div className="card">
                                <div className="card-body" style={{ backgroundColor: 'skyblue', color: 'gold', border: '3px solid white', fontWeight: "bold", display: 'inline-block', margin: '10px' }}>
                                    <h5 className="card-title">{player.first_name} {player.last_name}</h5>
                                    <p className="card-text">Height: {player.height}</p>
                                    <p className="card-text">Jersey Number: {player.jersey_number}</p>
                                    <p className="card-text">Weight: {player.weight}</p>
                                    <p className="card-text">Country: {player.country}</p>
                                    <p className="card-text">College: {player.college}</p>
                                    <p className="card-text">Draft Info: {getDraftInfo(player)}</p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No player information available</p>
                )}
            </div>
        </div>
    );
};

export default ProofOfConcept;
