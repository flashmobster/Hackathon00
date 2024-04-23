import React from 'react';
import './AllSportsApiHeader.css'; 

const AllSportsApiHeader = () => {
    return (
        <div className="background">
            <h5>Powered By:<a href="https://allsportsapi.com"><img className='apiLogo' alt="All Sports API" src="/logo.png"></img></a></h5>
        </div>
    );
};

export default AllSportsApiHeader;