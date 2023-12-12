import { useState, useEffect } from "react";

function Encounter(props){
    const encId = props.encId

    const locKey = 'https://pokeapi.co/api/v2/location-area';

    const [encounter, setEncounter] = useState(null);

    useEffect(() => {
        fetch(`${locKey}/${encId}`)
        .then(response => response.json())
        .then(data => {setEncounter(data)})
        .catch(err => console.log(err));
    }, [encId]);

    return <div>{encounter && encounter.name}</div>

}

export default Encounter;