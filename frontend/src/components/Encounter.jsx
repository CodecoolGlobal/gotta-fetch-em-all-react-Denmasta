import { useState, useEffect } from "react";

function Encounter(props){
    const encId = props.encId

    const locKey = 'https://pokeapi.co/api/v2/location';

    const [encounter, setEncounter] = useState(null);

    useEffect(() => {
        fetch(`${locKey}/${encId}`)
        .then(response => response.json())
        .then(data => {
            const locArea = data.areas;
            if (locArea.length > 0 && Array.isArray(locArea)) {
                fetch(locArea[0].url)
                .then(response => response.json())
                .then(data => {
                    const pokemonEncounters = data.pokemon_encounters;
                    const rand = Math.floor(Math.random() * pokemonEncounters.length);
                    const pokemonUrl = pokemonEncounters[rand].pokemon.url;
                    fetch(pokemonUrl)
                    .then(response => response.json())
                    .then(data => {setEncounter(data)})
                })            
            } else {
                setEncounter({
                    name: "This location doesn't seem to have any pokémon",
                    sprites: {
                        front_default: "https://www.pngkey.com/png/full/757-7574864_bola-pokemon-png.png",
                    },
                })
            }
        })
        .catch(err => console.error(err));
    }, [encId]);

    return (
    <div>
        {encounter && <img src={encounter.sprites.front_default} alt={encounter.name}></img>}
        {encounter && <p>A wild {encounter.name} appeared!</p>}
    </div>
        )

}

export default Encounter;