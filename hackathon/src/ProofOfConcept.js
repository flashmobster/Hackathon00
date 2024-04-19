import React, { useState, useEffect } from 'react';
import './ProofOfConcept.css';

const ProofOfConcept = ({ fetchPlayerInfo }) => {
    const [players, setPlayers] = useState([]);
    const [newPlayerData, setNewPlayerData] = useState({
        first_name: '',
        last_name: '',
        position: '',
        height: '',
        weight: '',
        jersey_number: '',
        college: '',
        country: '',
        draft_year: '',
        draft_round: '',
        draft_number: ''
    });
    const [updatedPlayerData, setUpdatedPlayerData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        position: '',
        height: '',
        weight: '',
        jersey_number: '',
        college: '',
        country: '',
        draft_year: '',
        draft_round: '',
        draft_number: ''
    });

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

    const handleCreatePlayer = async () => {
        try {
            const response = await fetch('https://hackathon00api.onrender.com/players', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newPlayerData)
            });
            const data = await response.json();
            console.log(data);
            setPlayers([...players, data]); // Add new player to the players array
        } catch (error) {
            console.error('Error creating player:', error);
        }
    };

    const handleUpdatePlayer = async () => {
        try {
            const response = await fetch(`https://hackathon00api.onrender.com/players/${updatedPlayerData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPlayerData)
            });
            const data = await response.json();
            console.log(data);
            const updatedPlayers = players.map(player => player.id === updatedPlayerData.id ? data : player); // Update player in players array
            setPlayers(updatedPlayers);
        } catch (error) {
            console.error('Error updating player:', error);
        }
    };

    const handleDeletePlayer = async () => {
        try {
            const response = await fetch(`https://hackathon00api.onrender.com/players/${updatedPlayerData.id}`, {
                method: 'DELETE'
            });
            const data = await response.json();
            console.log(data);
            const updatedPlayers = players.filter(player => player.id !== updatedPlayerData.id); // Remove deleted player from players array
            setPlayers(updatedPlayers);
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    return (
        <div className="proof-of-concept">
            <h2>Explore Former & Current Memphis Grizzlies</h2>
            <p>Find Out About Every Grizzly.</p>
            <div className="row">
                <div>
                    <h3>Create Player</h3>
                    <input type="text" placeholder="First Name" value={newPlayerData.first_name} onChange={(e) => setNewPlayerData({ ...newPlayerData, first_name: e.target.value })} />
                    <input type="text" placeholder="Last Name" value={newPlayerData.last_name} onChange={(e) => setNewPlayerData({ ...newPlayerData, last_name: e.target.value })} />
                    <input type="text" placeholder="Position" value={newPlayerData.position} onChange={(e) => setNewPlayerData({ ...newPlayerData, position: e.target.value })} />
                    <input type="text" placeholder="Jersey Number" value={newPlayerData.jersey_number} onChange={(e) => setNewPlayerData({ ...newPlayerData, jersey_number: e.target.value })} />
                    <input type="text" placeholder="Height" value={newPlayerData.height} onChange={(e) => setNewPlayerData({ ...newPlayerData, height: e.target.value })} />
                    <input type="text" placeholder="Weight" value={newPlayerData.weight} onChange={(e) => setNewPlayerData({ ...newPlayerData, weight: e.target.value })} />
                    <input type="text" placeholder="Country" value={newPlayerData.country} onChange={(e) => setNewPlayerData({ ...newPlayerData, country: e.target.value })} />
                    <input type="text" placeholder="College" value={newPlayerData.college} onChange={(e) => setNewPlayerData({ ...newPlayerData, college: e.target.value })} />
                    <input type="text" placeholder="Draft Year" value={newPlayerData.draft_year} onChange={(e) => setNewPlayerData({ ...newPlayerData, draft_year: e.target.value })} />
                    <input type="text" placeholder="Draft Round" value={newPlayerData.draft_round} onChange={(e) => setNewPlayerData({ ...newPlayerData, draft_round: e.target.value })} />
                    <input type="text" placeholder="Draft Number" value={newPlayerData.draft_number} onChange={(e) => setNewPlayerData({ ...newPlayerData, draft_number: e.target.value })} />
                    <button onClick={handleCreatePlayer}>Create Player</button>
                </div>
                <div>
                    <h3>Update Player</h3>
                    <input type="text" placeholder="Player ID" value={updatedPlayerData.id} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, id: e.target.value })} />
                    <input type="text" placeholder="First Name" value={updatedPlayerData.first_name} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, first_name: e.target.value })} />
                    <input type="text" placeholder="Last Name" value={updatedPlayerData.last_name} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, last_name: e.target.value })} />
                    <input type="text" placeholder="Position" value={updatedPlayerData.position} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, position: e.target.value })} />
                    <input type="text" placeholder="Jersey Number" value={updatedPlayerData.jersey_number} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, jersey_number: e.target.value })} />
                    <input type="text" placeholder="Height" value={updatedPlayerData.height} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, height: e.target.value })} />
                    <input type="text" placeholder="Weight" value={updatedPlayerData.weight} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, weight: e.target.value })} />
                    <input type="text" placeholder="Country" value={updatedPlayerData.country} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, country: e.target.value })} />
                    <input type="text" placeholder="College" value={updatedPlayerData.college} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, college: e.target.value })} />
                    <input type="text" placeholder="Draft Year" value={updatedPlayerData.draft_year} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, draft_year: e.target.value })} />
                    <input type="text" placeholder="Draft Round" value={updatedPlayerData.draft_round} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, draft_round: e.target.value })} />
                    <input type="text" placeholder="Draft Number" value={updatedPlayerData.draft_number} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, draft_number: e.target.value })} />
                    <button onClick={handleUpdatePlayer}>Update Player</button>
                </div>
                <div>
                    <h3>Delete Player</h3>
                    <input type="text" placeholder="Player ID" value={updatedPlayerData.id} onChange={(e) => setUpdatedPlayerData({ ...updatedPlayerData, id: e.target.value })} />
                    <button onClick={handleDeletePlayer}>Delete Player</button>
                </div>
            </div>
            <div className="row">
                {players.length > 0 ? (
                    players.map(player => (
                        <div key={player.id} className="player-card">
                            <div className="card">
                                <div className="card-body" style={{ backgroundColor: 'skyblue', color: 'gold', border: '3px solid white', fontWeight: "bold", display: 'inline-block', margin: '10px' }}>
                                    <h6>ID# <strong>{player.id}</strong></h6>
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
