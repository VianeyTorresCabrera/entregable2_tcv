import { useEffect, useRef, useState } from 'react'
import './App.css'
import axios from 'axios';
import WeatherCard from './components/WeatherCard';
const key= '5fae0d2f60caf1bfe9c6c5dafcc4bf42';



function App() {
  const[coords, setCoords]=useState();
  const[weather, setWeather]=useState();
  const[temp, setTemp] = useState();
  const[icon, setIcon] = useState(); 
  const[isLoading, setIsLoading]=useState(true); 
   

  const success= (pos) =>{
    //console.log(pos);
    setCoords({
      lat: pos.coords.latitude,
      lon: pos.coords.longitude,
    });
  }

  useEffect(() =>{
    navigator.geolocation.getCurrentPosition(success);
  },[]);

  useEffect(() => {
    if(coords){
      const {lat, lon} = coords;
    }    
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords?.lat}&lon=${coords?.lon}&appid=${key}`
    axios.get(url)
      .then(res =>{ 
        console.log(res);        
        const kel = res.data.main.temp;
        const cel = (kel - 273.15).toFixed(2);
        const fah = (cel * 9/5 +32).toFixed(2);
        const main = res.data.weather[0].main;
        setIcon(main);
        setTemp({cel: cel, fah: fah});        
        setWeather(res.data);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        },5000);
      })
  },[coords])

 
   //console.log(temp);
   //console.log(img);

   

  return (
    <div className='app'>
      
      {
        isLoading ?
         <figure className='app_progress'>
          <img src="../../assets/loading.svg" alt="is Loading" />
         </figure>
         :         
         <WeatherCard         
         weather = {weather}
         temp = {temp}
         icon = {icon}        
      />
      }      
      
    </div>
  )
}

export default App;
