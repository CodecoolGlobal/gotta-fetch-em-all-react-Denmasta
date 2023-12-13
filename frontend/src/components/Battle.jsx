import React, { useState } from 'react';
import battlehelper from './battlehelper';


export default function Battle(props) {

  const [gameData, setGameData] = useState(battlehelper.gameData);
  const allyPokemon = props.allyPokemon;
  const enemyPokemon = props.enemyPokemon;
  const setPage = props.setPage;

/*
  if (!yourPokemons.includes(enemyPokemon.name)){
    yourPokemons += ",https://pokeapi.co/api/v2/pokemon/"+enemyPokemon.name;
  }
  localStorage.setItem('currentPokemons',yourPokemons);
*/
console.log(battlehelper.gameData);
function handleAttack(enemy, ally) {
  battlehelper.gameLoop(enemy,ally);
  setGameData({...battlehelper.gameData});
}

  // return (
  // <div className="battle">
  //   <div className="enemy-container">
  //       <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
  //       <p>{enemyPokemon.name}</p>
  //       <p>HP{enemyPokemon.stats[0].base_stat}/{gameData.enemy.hp === undefined ? enemyPokemon.stats[0].base_stat : gameData.enemy.hp}</p>
  //   </div>
  //   <div className="ally-container">
  //       <img src={allyPokemon.sprites.front_default} alt={allyPokemon.name}></img>
  //       <p>{allyPokemon.name}</p>
  //       <p>HP{allyPokemon.stats[0].base_stat}/{gameData.ally.hp === undefined ? allyPokemon.stats[0].base_stat : gameData.ally.hp}</p>
  //   </div>
  //   <button onClick={() => handleAttack(enemyPokemon,allyPokemon)}>Attack</button>
  // </div>
  // )

  return (
    <div>
      {!gameData.gameOver ? (
          <div className="battle">
          <div className="enemy-container">
              <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
              <p>{enemyPokemon.name}</p>
              <p>HP{enemyPokemon.stats[0].base_stat}/{gameData.enemy.hp === undefined || gameData.gameStart ? enemyPokemon.stats[0].base_stat : gameData.enemy.hp}</p>
          </div>
          <div className="ally-container">
              <img src={allyPokemon.sprites.back_default} alt={allyPokemon.name}></img>
              <p>{allyPokemon.name}</p>
              <p>HP{allyPokemon.stats[0].base_stat}/{gameData.ally.hp === undefined || gameData.gameStart ? allyPokemon.stats[0].base_stat : gameData.ally.hp}</p>
          </div>
          <button onClick={() => handleAttack(enemyPokemon,allyPokemon)}>Attack</button>
        </div>
      ) : (
        <div className="battle">
          <div>{gameData.winner}</div>
          <div className="enemy-container">
              <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
              <p>{enemyPokemon.name}</p>
              <p>HP{enemyPokemon.stats[0].base_stat}/{gameData.enemy.hp === undefined ? enemyPokemon.stats[0].base_stat : gameData.enemy.hp}</p>
          </div>
          <div className="ally-container">
              <img src={allyPokemon.sprites.back_default} alt={allyPokemon.name}></img>
              <p>{allyPokemon.name}</p>
              <p>HP{allyPokemon.stats[0].base_stat}/{gameData.ally.hp === undefined ? allyPokemon.stats[0].base_stat : gameData.ally.hp}</p>
          </div>
          <button onClick={() => {battlehelper.resetBattle(enemyPokemon, allyPokemon); setPage('home')}}>Go home</button>
        </div>
      )}
    </div>
  )
}