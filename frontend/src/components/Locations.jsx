import React from 'react'
import { useState, useEffect } from "react";

function Locations(props) {
    const setPage = props.setPage;

    const locKey = 'https://pokeapi.co/api/v2/location';
  
    const [locations, setLocation] = useState(null);

    const importAll = (r) => r.keys().map(r);
    const images = importAll(require.context('../images', false, /\.(webp)$/));

    useEffect(() => {
      fetch(`${locKey}`)
          .then(res => res.json())
          .then(data => { setLocation(data) })
    },[]);
  
    return (
        <div className='page'>
            <h1 className='title'>Locations</h1>
            <div className='info'>Choose a location to find pokemons!</div>
            {locations && <ul>
                {locations.results.map((location,index) => (
                 <div onClick={() => {setPage(`encounter/${index + 1 }`)}} key={index} className='location'>
                    <img src={images[images.findIndex(img => img.includes(location.name))]} alt={location.name}></img>
                    <p>{location.name.replaceAll('-', ' ')}</p>
                </div>
                ))}
            </ul>}
        </div>
    );
}

export default Locations;