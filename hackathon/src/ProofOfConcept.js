import React, { useState, useEffect } from 'react';
import './ProofOfConcept.css';
import PlayerCard from './PlayerCard';
import PlayerSearch from './PlayerSearch';

const ProofOfConcept = ({ fetchPlayerInfo }) => {
    const [players, setPlayers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        fetchPlayers();
    }, []);

    useEffect(() => {
        console.log('Players:', players);
        setLoading(false);
    }, [players]);

    const fetchPlayers = async () => {
        try {
            const response = await fetch('https://hackathon00api.onrender.com/');
            if (!response.ok) {
                throw new Error('Failed to fetch player info');
            }
            const data = await response.json();
            console.log('Player Data:', data);
            setPlayers(data);
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

    const filteredPlayers = players.filter(player => {
        const fullName = `${player.first_name} ${player.last_name}`.toLowerCase();
        return fullName.includes(searchTerm.toLowerCase());
    });

    return (
        <div className="proof-of-concept">
            <h2>Explore Former & Current Memphis Grizzlies</h2>
            <p>Find Out About Grizzlies.</p>
            <PlayerSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className="row">
                    {filteredPlayers.length > 0 ? (
                        filteredPlayers.map(player => (
                            <PlayerCard key={player.id} player={player} getDraftInfo={getDraftInfo} />
                        ))
                    ) : (
                        <p>No matching players found</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProofOfConcept;
