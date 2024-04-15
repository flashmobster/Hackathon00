// import React from 'react';
// import './ProofOfConcept.css'; 

// const ProofOfConcept = () => {
//     return (
//         <div className="proof-of-concept">
//             <h2>Explore NBA Stats</h2>
//             <p>Discover player profiles, team statistics, and game highlights. Dive deep into the world of NBA basketball!</p>
//         </div>
//     );
// };

// export default ProofOfConcept;


import React from 'react';
import './ProofOfConcept.css';

const ProofOfConcept = ({ fetchPlayerInfo, playerInfo }) => {
    return (
        <div className="proof-of-concept">
            <h2>Explore Memphis Grizzlies Legends</h2>
            <p>Discover career statistics, highlights, and achievements of legendary Memphis Grizzlies players.</p>
            <button onClick={fetchPlayerInfo}>Get Player Info</button>
            {playerInfo && (
                <div>
                    <h3>{playerInfo.name}</h3>
                    <p>Position: {playerInfo.position}</p>
                    <p>Years with Grizzlies: {playerInfo.yearsWithGrizzlies}</p>
                </div>
            )}
        </div>
    );
};

export default ProofOfConcept;
