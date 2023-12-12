import './App.css';
import { useState, useEffect } from 'react';
import Locations from './components/Locations';



function App() {
  const [page , setPage] = useState('locations');


  const renderPage = () => {
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