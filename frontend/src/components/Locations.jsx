import React from 'react'
import { useState, useEffect } from "react";

function Locations(props) {
    const setPage = props.setPage;

    const locKey = 'https://pokeapi.co/api/v2/location';
  
    const [locations, setLocation] = useState(null);
  
    useEffect(() => {
      fetch(`${locKey}`)
          .then(res => res.json())
          .then(data => { setLocation(data) })
    },[]);
  
    return (
        <div className='page'>
            {locations && <ul>
                {locations.results.map((location,index) => (
                 <li onClick={() => {setPage(`encounter/${index + 1 }`)}} key={index} className='location'>{location.name}</li>
                ))}
            </ul>}
        </div>
    );
};

export default Locations;