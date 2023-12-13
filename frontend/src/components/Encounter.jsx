import { useState, useEffect } from "react";

const usersPokemon = [
    "https://pokeapi.co/api/v2/pokemon/bulbasaur",
    "https://pokeapi.co/api/v2/pokemon/charizard",
    "https://pokeapi.co/api/v2/pokemon/poliwhirl"
];

let currentPokemons = '';

function Encounter(props){
    const encId = props.encId;
    const setPage = props.setPage;
    const setEnemyPokemon = props.setEnemyPokemon;
    const setAllyPokemon = props.setAllyPokemon;

    if (localStorage.getItem('currentPokemons') !== null){
        currentPokemons = localStorage.getItem('currentPokemons');
    } else {
        localStorage.setItem('currentPokemons', usersPokemon);
        currentPokemons = localStorage.getItem('currentPokemons');
    }

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
                currentPokemons.split(',').forEach(async url => {
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

    return (
        <div>
            {encounter && encounter.name.includes('location') && (
            <div className="encounter">
                <div className="enemy-container">
                    <img src={encounter.sprites.front_default} alt={encounter.name}></img>
                    <p>This location doesn't seem to have any pokémon</p>
                    <button onClick={() => setPage('home')}>get bact to locations</button>
                </div>
            </div>
            )}
                {encounter && !encounter.name.includes('location') && (
                    <div className="encounter">
                        <div className="enemy-container">
                            <img src={encounter.sprites.front_default} alt={encounter.name}></img>
                            <p> A wild {encounter.name} appeared!</p>
                            <button onClick={() => setPage('home')}>run away</button>
                        </div>
                <div>
                    <p className="info">Choose your pokemon to fight!</p>
                    <div className="ally-container">
                        {pokemons && pokemons.map((data, index) => (
                        <div key={index} onClick={() => {setAllyPokemon(data); setPage('battle'); setEnemyPokemon(encounter)}
                        }>
                            <img src={data.sprites.front_default} alt={data.name}></img>
                            <p>{data.name}</p>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
            )}
        </div>
    );

}

export default Encounter;