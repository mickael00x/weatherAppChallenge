import React, { useEffect, useState }  from 'react';
import './App.css';
import { fetchWeatherDataApi } from './api/weather';
import { fetchCities } from './api/placeSuggestion';

type TWeatherInfos = {
  [key: string]: any; 
}
type TCIties = {
  [key: string]: any; 
}

type TTempsValue = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  humidity: number;
}

function App() {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [userHasSearchedCity, setUserHasSearchedCity] = useState<boolean>(false);
  const [userHasSelectedCity, setUserHasSelectedCity] = useState<boolean>(false);
  const [citySelected, setCitySelected] = useState<boolean>(false);
  const [cityData, setCityData] = useState<TWeatherInfos>({});
  
  const [allCities, setAllCities] = useState<[{
    id: number | any;
    name: string,
    sys: {
      country: string
    }
  }]>([{
    id: 0,
    name: "",
    sys: {
      country: ""
    }
  }]);
  const [cityID, setCityID] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [temperature, setTemperature] = useState<TTempsValue>({
    temp: 0,
    feels_like: 0,
    temp_min: 0,
    temp_max: 0,
    humidity: 0,
  });
  const [weather, setWeather] = useState<string>("");
  const [weatherIcon, setWeatherIcon] = useState<string>("");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(input === "") return;

    const promiseReponseAllCities = async () => {
      const response = await fetchWeatherDataApi(input, true)
      console.log(response);
      if(response.count === 0) {
        setIsLoaded(false);
        return setError("Query not found, try again")
      } else {
        setIsLoaded(true);
        setError("");
        setAllCities(response.list);
        return setUserHasSearchedCity(true);
      }
    }

    promiseReponseAllCities();
  }

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    document.querySelectorAll("." +e.currentTarget.className.split(" ")[0]).forEach(option => option.classList.remove("active"));
    e.currentTarget.classList.toggle("active");

      allCities.map(city => {
          if(e.currentTarget.id === city.id.toString()) {
            setCityData(city);
            setCitySelected(true);
          }
        })
    }  


  useEffect(() => {
    if(citySelected) {
      setCountry(cityData.sys.country);
      setTemperature(cityData.main);
      setWeather(cityData.weather[0].main);
      setWeatherIcon(cityData.weather[0].icon);
      setIsLoaded(true);
      setError("");
    }
  })
  return (
    <div className="App">
      <div className='left'>
        <h1>Get weather by city</h1>
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="city">1. Enter your city</label>
            <input id="city" name="city" type="text" onChange={handleChange} value={input} placeholder="Enter your city" />
            <button type="submit">&#128269;</button>
        </form>
        {!isLoaded && error && <div className="error-message">{error}</div>}
        {isLoaded && allCities && userHasSearchedCity && <div className="cities-choice">
            <h2>Please, select a city</h2>
            {allCities && allCities.map((city, key) => (
                <div onClick={handleClick} 
                    id={city.id}
                    className="city"
                    key={city.id}>
                      {city.name}, {city.sys.country}
                </div>
            ))}
          </div>
        }
      </div>
      <div className='right'>
        {isLoaded && citySelected && cityData && <div className="formResult">
            <div className={weather}></div>
            <div className="formResult-icon">
              {weatherIcon && <img alt={weather} src={"http://openweathermap.org/img/wn/"+ weatherIcon + ".png"} />} <span>{weather}</span>
            </div>
            <div className="formResult-country"><span>Country:</span> {country}</div>
            <div className="formResult-temp">Current temperature: {temperature.temp}°C</div>
        </div>}
      </div>
    </div>
  );
}

export default App;
