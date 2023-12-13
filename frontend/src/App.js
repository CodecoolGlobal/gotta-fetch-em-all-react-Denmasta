import './App.css';
import { useState } from 'react';
import Locations from './components/Locations';
import Encounter from './components/Encounter';
import Battle from './components/Battle';



function App() {
  const [page , setPage] = useState('home');
  const [enemyPokemon , setEnemyPokemon] = useState(null);
  const [allyPokemon , setAllyPokemon] = useState(null);


  const renderPage = () => {
    if (page.startsWith('encounter')){
      const encId = page.split('/')[1];
      return <Encounter encId = {encId} setPage={setPage} setEnemyPokemon={setEnemyPokemon} setAllyPokemon={setAllyPokemon}/>
    }
    switch(page){
      case "home":
        return <Locations setPage={setPage}/>
      case "battle":
        return <Battle setPage={setPage} enemyPokemon={enemyPokemon} allyPokemon={allyPokemon}/>
      default:
        break;
    }
  }
  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;