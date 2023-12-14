import React, { useEffect, useState } from 'react';
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
/*
useEffect(()=> {
  setGameData({...battlehelper.gameData});      // Question HOW TO MAKE IT WORK
},[gameData]);
*/
console.log(battlehelper.gameData);
function handleAttack(enemy, ally) {
  battlehelper.gameLoop(enemy,ally);
  setGameData({...battlehelper.gameData});
  setTimeout(() => setGameData({...battlehelper.gameData}), 2005);
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
          <div className="enemy-container slide-in-left">
            <div className='enemy-data'>
              <p>{enemyPokemon.name}</p>
              <p>HP{enemyPokemon.stats[0].base_stat}/{gameData.enemy.hp === undefined || gameData.gameStart ? enemyPokemon.stats[0].base_stat : gameData.enemy.hp}</p>
              <div className="w3-light-grey w3-large">
                <div className="w3-container w3-green" style={{width:`${(gameData.enemy.hp/enemyPokemon.stats[0].base_stat)*100}%`, color:'black'}}>{enemyPokemon.stats[0].base_stat}/{gameData.enemy.hp === undefined || gameData.gameStart ? enemyPokemon.stats[0].base_stat : gameData.enemy.hp}</div>
              </div>
            </div>
            <div>
              <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
            </div>
          </div>
          <div className='info-container'>
              <p className='info'>{gameData.info}</p>
              <button onClick={() => handleAttack(enemyPokemon,allyPokemon)}>Attack</button>
          </div>
          <div className="ally-container slide-in-right">
            <div>
              <img src={allyPokemon.sprites.back_default} alt={allyPokemon.name}></img>
            </div>
            <div className='ally-data'>
              <p>{allyPokemon.name}</p>
              <p>HP{allyPokemon.stats[0].base_stat}/{gameData.ally.hp === undefined || gameData.gameStart ? allyPokemon.stats[0].base_stat : gameData.ally.hp}</p>
              <div className="w3-light-grey w3-large">
                <div className="w3-container w3-green" style={{width:`${(gameData.ally.hp/allyPokemon.stats[0].base_stat)*100}%`}}>{allyPokemon.stats[0].base_stat}/{gameData.ally.hp === undefined || gameData.gameStart ? allyPokemon.stats[0].base_stat : gameData.ally.hp}</div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="battle">
          <div className="enemy-container">
              <div className='enemy-data'>
                <p>{enemyPokemon.name}</p>
                <p>HP{enemyPokemon.stats[0].base_stat}/{gameData.enemy.hp === undefined ? enemyPokemon.stats[0].base_stat : gameData.enemy.hp}</p>
                <div className="w3-light-grey w3-large">
                  <div className="w3-container w3-green" style={{width:`${(gameData.enemy.hp/enemyPokemon.stats[0].base_stat)*100}%`}}>{enemyPokemon.stats[0].base_stat}/{gameData.enemy.hp === undefined || gameData.gameStart ? enemyPokemon.stats[0].base_stat : gameData.enemy.hp}</div>
                </div>
              </div>
              <div>
                <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
              </div>
          </div>
          <div className='info-container'>
            <div>{gameData.winner}</div>
            <button onClick={() => {battlehelper.resetBattle(enemyPokemon, allyPokemon); setPage('home')}}>Go home</button>
          </div>
          <div className="ally-container">
              <div>
                <img src={allyPokemon.sprites.back_default} alt={allyPokemon.name}></img>
              </div>
              <div className='ally-data'>
                <p>{allyPokemon.name}</p>
                <p>HP{allyPokemon.stats[0].base_stat}/{gameData.ally.hp === undefined ? allyPokemon.stats[0].base_stat : gameData.ally.hp}</p>
              <div className="w3-light-grey w3-large">
                <div className="w3-container w3-green" style={{width:`${(gameData.ally.hp/allyPokemon.stats[0].base_stat)*100}%`}}>{allyPokemon.stats[0].base_stat}/{gameData.ally.hp === undefined || gameData.gameStart ? allyPokemon.stats[0].base_stat : gameData.ally.hp}</div>
              </div>
              </div>
          </div>
        </div>
      )}
    </div>
  )
}