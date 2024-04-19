import React from 'react';

const PlayerSearch = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="search">
            <input
                type="text"
                placeholder="Search by name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
};

export default PlayerSearch;
