import React from 'react'

export default function Battle(props) {
  const allyPokemon = props.allyPokemon;
  const enemyPokemon = props.enemyPokemon;
  console.log(allyPokemon);
  console.log(enemyPokemon);
  return (
  <div className="battle">
    <div className="enemy-container">
        <img src={enemyPokemon.sprites.front_default} alt={enemyPokemon.name}></img>
        <p>{enemyPokemon.name}</p>
    </div>
    <div className="ally-container">
        <img src={allyPokemon.sprites.front_default} alt={allyPokemon.name}></img>
        <p>{allyPokemon.name}</p>
    </div>
  </div>
  )
}
