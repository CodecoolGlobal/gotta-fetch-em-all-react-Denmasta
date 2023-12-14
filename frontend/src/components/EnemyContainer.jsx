import React from 'react'
import Healtbar from './Healtbar'
import battlehelper from './battlehelper';

export default function EnemyContainer({enemyPokemon}) {

  return (
    <div className="enemy-container slide-in-left">
        <div className='enemy-data'>
            <p>{enemyPokemon.name}</p>
            <Healtbar currentHealt={battlehelper.gameData.enemy.hp} healt={enemyPokemon.stats[0].base_stat}/>
        </div>
        <div className='enemy-picture'>
            <div className='img-container'>
                <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name} id='enemyImg'></img>
            </div>
        </div>
    </div>
  )
}
