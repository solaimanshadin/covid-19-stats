import React from 'react';
import './Singlestat.css'

const Singlestat = (props) => {
    console.log(props.data)
    const style = {
        borderLeft:"8px solid",
        borderColor: props.color
    }
    return (
        <div style={style} className="single-stat">
            <h2>{props.type}</h2>
            <h1 style={{color:props.color}}>{props.data}</h1>
        </div>
    );
};

export default Singlestat;