import React, { useState } from 'react';
import battlehelper from './battlehelper';
import EnemyContainer from './EnemyContainer';
import AllyContainer from './AllyContainer';
import InfoContainer from './InfoContainer';


export default function Battle(props) {

  const [gameData, setGameData] = useState(battlehelper.gameData);
  const allyPokemon = props.allyPokemon;
  const enemyPokemon = props.enemyPokemon;
  const setPage = props.setPage;


  return (
    <div>
        <div className="battle">
          <EnemyContainer enemyPokemon={enemyPokemon} setGameData={setGameData}/>
          <InfoContainer enemyPokemon={enemyPokemon} allyPokemon={allyPokemon} setGameData={setGameData} setPage={setPage}/>
          <AllyContainer allyPokemon={allyPokemon} gameData={gameData}/>
        </div>
    </div>
  )
}