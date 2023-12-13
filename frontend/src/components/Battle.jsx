import React from 'react';
import battlehelper from './battlehelper';


export default function Battle(props) {

  const allyPokemon = props.allyPokemon;
  const enemyPokemon = props.enemyPokemon;
/*
  if (!yourPokemons.includes(enemyPokemon.name)){
    yourPokemons += ",https://pokeapi.co/api/v2/pokemon/"+enemyPokemon.name;
  }
  localStorage.setItem('currentPokemons',yourPokemons);
*/
console.log(battlehelper.gameData);

  return (
  <div className="battle">
    <div className="enemy-container">
        <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
        <p>{enemyPokemon.name}</p>
        <p>HP{enemyPokemon.stats[0].base_stat}/{battlehelper.gameData.enemy.hp}</p>
    </div>
    <div className="ally-container">
        <img src={allyPokemon.sprites.front_default} alt={allyPokemon.name}></img>
        <p>{allyPokemon.name}</p>
        <p>HP{allyPokemon.stats[0].base_stat}/{battlehelper.gameData.ally.hp}</p>
    </div>
    <button onClick={() => battlehelper.gameLoop(enemyPokemon,allyPokemon)}>Attack</button>
  </div>
  )
}
