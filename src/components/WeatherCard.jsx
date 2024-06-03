import React, { useRef, useState } from 'react';
import './styles/weatherCard.css';
import Icons from './js/Icons';

const WeatherCard = ({weather, temp, icon}) => {

console.log(Icons(icon));
 
   // console.log(weather);

    const[isCel, setIsCel] = useState(true);    
    

    const handleTemp = () =>{
        setIsCel(!isCel);
    }

    
  return (
    <div className='weathercard'>
        
        <h1 className='weathercard_title'>Weather App</h1>
        <h2 className='weathercard_city'>{weather?.name} {weather?.sys.country}</h2>
        <section className='weathercard_body'>
            <figure className='weathercard_img'>
               <img src={Icons(icon)} alt="weather image"/>               
               
            </figure>
            <article className='weathercard_data'>
                <h3 className='weatehrcard_description'>"{weather?.weather[0].description}"</h3>
                <ul className='weathercard_list'>
                    <li className='weathercard_item'><span>wind speed  </span><span>{weather?.wind.speed} m/s</span></li>
                    <li className='weathercard_item'><span>clouds  </span><span>{weather?.clouds.all} %</span></li>
                    <li className='weathercard_item'><span>presure  </span><span>{weather?.main.pressure} hPa</span></li>
                </ul>
            </article>
        </section>
        <h2 className='weathercard_temp'>
            {
            isCel ? 
            temp?.cel + "°C"
                : 
                temp?.fah + "°F"
            }
        </h2>
        <button className='weathercard_btn' onClick={handleTemp}>
            Change to {isCel ? "°F" : "°C"}
        </button>
    </div>
  )
}

export default WeatherCard