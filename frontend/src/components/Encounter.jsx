import { useState, useEffect } from "react";

const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl"
];


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

    const [pokemons, setPokemons] = useState(null);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = [];
                usersPokemon.forEach(async url => {
                    const response = await fetch(url);
                    const data = await response.json();
                    result.push(data);
                });
                setPokemons(result);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, []);


    const [selectedAlly, setSelectedAlly] = useState(null);
    
    const handleAllySelection = (selectedPokemon) => {
        setSelectedAlly(selectedPokemon);
    }

    return (
        <div>
            {encounter && !selectedAlly && (
            <div className="encounter">
                <div className="enemy-container">
                    <img src={encounter.sprites.front_default} alt={encounter.name}></img>
                    <p>{encounter.name.includes('location') ? "This location doesn't seem to have any pokémon" : `A wild ${encounter.name} appeared!`}</p>
                </div>
                <div>
                    <p className="info">Choose your pokemon to fight!</p>
                    <div className="ally-container">
                        {pokemons && pokemons.map((data, index) => (
                        <div key={index} onClick={() => handleAllySelection(data)}>
                            <img src={data.sprites.front_default} alt={data.name}></img>
                            <p>{data.name}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            )}
            {selectedAlly && (
            <div className="battle">
                <div className="enemy-container">
                    <img src={encounter.sprites.front_default} alt={encounter.name}></img>
                    <p>{encounter.name}</p>
                </div>
                <div className="ally-container">
                    <img src={selectedAlly.sprites.front_default} alt={selectedAlly.name}></img>
                    <p>{selectedAlly.name}</p>
                </div>
            </div>
            )}
        </div>
    );

}

export default Encounter;