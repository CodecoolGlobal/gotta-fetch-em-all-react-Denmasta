import './App.css';
import { useState, useEffect } from 'react';
import Locations from './components/Locations';
import Encounter from './components/Encounter';



function App() {
  const [page , setPage] = useState('home');


  const renderPage = () => {
    if (page.startsWith('encounter')){
      const encId = page.split('/')[1];
      return <Encounter encId = {encId}/>
    }
    /*switch(page){
      case "main": */
        return <Locations setPage={setPage}/>
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;