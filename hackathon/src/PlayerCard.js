import React from 'react';

const PlayerCard = ({ player, getDraftInfo }) => {
    return (
        <div className="player-card">
            <div className="card">
                <div className="card-body" style={{ backgroundColor: 'navy', color: 'gold', border: '3px solid gold', borderRadius: '10px', padding: '20px', marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h6>ID# <strong>{player.id}</strong></h6>
                            <h3>{player.first_name} {player.last_name}</h3>
                            {player.height && <p>Position: {player.height}" {player.position}</p>}
                            {player.jersey_number && <p>Jersey #: {player.jersey_number}</p>}
                            {player.weight && <p>Weight: {player.weight} lbs</p>}
                            {player.country && <p>Country: {player.country}</p>}
                            {player.college && <p>College: {player.college}</p>}
                            <p>Draft Info: {getDraftInfo(player)}</p>
                        </div>
                        <img alt='card ai logo' src='/mAyD7o1L.png' style={{ width: '60px', height: '60px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
