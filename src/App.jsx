import {React,Fragment, useState, useEffect} from 'react'
import axios from 'axios'
import { BsArrowDown,BsArrowUp,BsFillGeoAltFill } from "react-icons/bs";

import './App.css'

function App() {

  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);


  let getWeather = async (lat, long) => {
    let res = await axios.get("https://api.openweathermap.org/data/2.5/weather", {
      params: {
        lat: lat,
        lon: long,
        appid: '9a47cf04f40d474099cf9b225e74d283',
        lang: 'pt',
        units: 'metric'
      }
      
    });
    console.log(res);
    setWeather(res.data)
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position)=> {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true)
    })
  }, [])

    if(location == false){
      return(
        <div className='bloqueado'>
          Você precisa habilitar a localização no browser
        </div>
      )
    
    }else if (weather == false){
      return(
        <div className='carregando'>
          Carregando o clima...
        </div>
      )
    
    }else{
      return(
        <div className='temperatura'>
          <h4><BsFillGeoAltFill/> {weather['name']} - {weather['sys']['country']}</h4>
          <div className='atual'>
            <div>
              <p>{Math.round(weather['main']['temp'])}°</p>
              <ul>
                <li><BsArrowUp/>{weather['main']['temp_max']}°</li>
                <li><BsArrowDown/>{weather['main']['temp_min']}°</li>
              </ul>
            </div>

            <div className='descricao'>
              <img src={`https://openweathermap.org/img/wn/${weather['weather'][0]['icon']}@2x.png`} alt="" />
              <h5>{weather['weather'][0]['description']} </h5>
            </div>
          </div>
            
          <ul className='info'>
            <li><p className='text'>Pressão</p><p>{weather['main']['pressure']} mb</p></li>
            <li><p className='text'>Umidade</p> <p>{weather['main']['humidity']}%</p></li>
            <li><p className='text'>Vento</p><p>{weather['wind']['speed']} km/h</p></li>
          </ul>
        </div>
      )
    }

}

export default App
