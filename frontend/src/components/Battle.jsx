import React, { useEffect, useState } from 'react';
import battlehelper from './battlehelper';
import Healtbar from './Healtbar';


export default function Battle(props) {

  const [gameData, setGameData] = useState(battlehelper.gameData);
  const allyPokemon = props.allyPokemon;
  const enemyPokemon = props.enemyPokemon;
  const setPage = props.setPage;

console.log(battlehelper.gameData);
function handleAttack(enemy, ally) {
  battlehelper.gameLoop(enemy,ally);
  setGameData({...battlehelper.gameData});
  setTimeout(() => setGameData({...battlehelper.gameData}), 2005);
}

  return (
    <div>
      {!gameData.gameOver ? (
          <div className="battle">
          <div className="enemy-container slide-in-left">
            <div className='enemy-data'>
              <p>{enemyPokemon.name}</p>
              <Healtbar currentHealt={gameData.enemy.hp} healt={enemyPokemon.stats[0].base_stat}/>
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
              <Healtbar currentHealt={gameData.ally.hp} healt={allyPokemon.stats[0].base_stat}/>
            </div>
          </div>
        </div>
      ) : (
        <div className="battle">
          <div className="enemy-container">
              <div className='enemy-data'>
                <p>{enemyPokemon.name}</p>
                <Healtbar currentHealt={gameData.enemy.hp} healt={enemyPokemon.stats[0].base_stat}/>
              </div>
              <div>
                <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
              </div>
          </div>
          <div className='info-container'>
            <div>{gameData.winner}</div>
            {gameData.winner === 'You won' ? <p>{enemyPokemon.name} has been added to your pokemon collection!</p> : <p>better luck next time!</p>}
            <button onClick={() => {battlehelper.resetBattle(); setGameData({...battlehelper.gameData}) ; setPage('home')}}>Go home</button>
          </div>
          <div className="ally-container">
              <div>
                <img src={allyPokemon.sprites.back_default} alt={allyPokemon.name}></img>
              </div>
              <div className='ally-data'>
                <p>{allyPokemon.name}</p>
                <Healtbar currentHealt={gameData.ally.hp} healt={allyPokemon.stats[0].base_stat}/>
              </div>
          </div>
        </div>
      )}
    </div>
  )
}