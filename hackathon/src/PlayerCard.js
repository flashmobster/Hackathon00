import React from 'react';

const PlayerCard = ({ player, getDraftInfo }) => {
    return (
        <div className="player-card" >
            <div className="card">
            <div className="card-body" style={{ backgroundColor: 'skyblue', color: 'gold', border: '3px solid white', fontWeight: "bold", display: 'inline-block', margin: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h6 style={{ marginRight: '5px' }}>ID# <strong>{player.id}</strong></h6>
                        <img alt='card ai logo' src='/mAyD7o1L.png' width="60px" height="60px" style={{ float: 'right', marginLeft: '0 10px' }} />
                    </div>
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
    );
};

export default PlayerCard;
