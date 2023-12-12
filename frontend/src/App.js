import './App.css';
//import { useState, useEffect } from 'react';
import Locations from './components/Locations';
import useGetLocations from './components/useGetLocations';


function App() {
  const locations = useGetLocations();
  console.log(locations);
  return (
    <div className="App">
      {locations && <ul>
          {locations.results.map((location,index) => (
            <Locations key={index} className={index} label={location.name}/>
          ))}
      </ul>}
    </div>
  );
}

export default App;

