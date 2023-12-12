import React from 'react'

function Locations(props) {
    const locationName = props.label;
    const className = props.className;
    return (
        <div className={className}>
            <li>{locationName}</li>
        </div>
    );
};

export default Locations
