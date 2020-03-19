import React, { useState, useEffect } from 'react';
import './Stats.css';
import Singlestat from '../Singlestat/Singlestat';


const Stats = (props) => {
    

    return (
        <div className="stats-wrapper">
            {props.children}
            <div className="stats">
                <Singlestat color="#FFD13A" type="INFECTED" data={props.data.infected}></Singlestat>
                <Singlestat color="#ff6b6b" type="DEATHS" data={props.data.deaths}></Singlestat>
                <Singlestat color="#1dd1a1" type="RECOVERED" data={props.data.recovered}></Singlestat>
             </div>
        </div>
        
    );
};

export default Stats;