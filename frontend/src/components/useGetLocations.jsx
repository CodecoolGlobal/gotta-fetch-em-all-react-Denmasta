import { useState, useEffect } from "react";

export default function useGetLocations(){

    const locKey = 'https://pokeapi.co/api/v2/location';
  
    const [locations, setLocation] = useState(null);
  
    useEffect(() => {
      fetch(`${locKey}`)
          .then(res => res.json())
          .then(data => { setLocation(data) })
    },[]);
  
    return locations;
  }

//  export default useGetLocations;