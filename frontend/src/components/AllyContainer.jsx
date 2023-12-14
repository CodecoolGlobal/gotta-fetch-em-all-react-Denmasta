import React from 'react'
import Healtbar from './Healtbar'

export default function AllyContainer({allyPokemon, gameData}) {
  return (
    <div className="ally-container slide-in-right">
        <div className='ally-picture'>
            <img src={allyPokemon.sprites.back_default} alt={allyPokemon.name}></img>
        </div>
        <div className='ally-data'>
            <p>{allyPokemon.name}</p>
            <Healtbar currentHealt={gameData.ally.hp} healt={allyPokemon.stats[0].base_stat}/>
        </div>
    </div>
  )
}
