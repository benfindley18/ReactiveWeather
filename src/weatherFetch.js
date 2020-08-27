import React, { useState, useEffect } from 'react';
import './weatherFetch.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTint } from '@fortawesome/free-solid-svg-icons'
import { faThermometerFull } from '@fortawesome/free-solid-svg-icons'
import { faCloud } from '@fortawesome/free-solid-svg-icons'

const drip = <FontAwesomeIcon icon={faTint} />
const thermo = <FontAwesomeIcon icon={faThermometerFull} />
const cloud = <FontAwesomeIcon icon={faCloud} />

function WeatherFetch() {
    const key = process.env.REACT_APP_WEATHER_API_KEY;
    const city = '4259418'

    const [minTemp, setMinTemp] = useState('');
    const [mainTemp, setMainTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');

    const [iconID, setIconID] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [windDeg, setWindDeg] = useState('');

    const [humidity, setHumidity] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [cloudCover, setCloudCover] = useState('');

    useEffect(() => {
        fetch('https://api.openweathermap.org/data/2.5/weather?id=' + city + '&APPID=' + key + '&units=imperial')
            .then(res => res.json())
            .then(data => {
                console.log(data);

                setMinTemp(data.main.temp_min)
                setMainTemp(data.main.temp);
                setMaxTemp(data.main.temp_max)

                setIconID(data.weather[0].icon);
                setDescription(data.weather[0].description);
                setLocation(data.name)
                setWindSpeed(data.wind.speed)
                setWindDeg(data.wind.deg)

                setHumidity(data.main.humidity)
                setFeelsLike(data.main.feels_like);
                setCloudCover(data.clouds.all)
            })
    }, [])

    return (
        <div className='container'>
            <h1 className='title'> Reactive Weather</h1>

            <div className='temp'>
                <div className='low'>
                    <h2>Low</h2>
                    <p>{minTemp}°F</p>
                </div>

                <div className='current'>
                    <h2>Current</h2>
                    <p>{mainTemp}°F</p>
                </div>

                <div className='high'>
                    <h2>High</h2>
                    <p>{maxTemp}°F</p>
                </div>
            </div>

            <div className='general'>
                <div className='description'>
                    <h3>{description}</h3>
                    <img alt='Weather Icon' src={"http://openweathermap.org/img/wn/" + iconID + "@2x.png"} />
                </div>

                <div className='info'>
                    <p>Location: {location} </p>
                    <p>Wind Speed: {windSpeed} MPH </p>
                    <p>Wind Direction: {windDeg}° </p>
                </div>
            </div>

            <div className='cards'>

                <div className='humidity'>
                    <h3>Humidity</h3>
                    <div className='flexbox'>
                        <p>{humidity}%</p>
                        {drip}
                    </div>
                </div>

                <div className='feelsLike'>
                    <h3>Feels Like</h3>
                    <div className='flexbox'>
                        <p>{feelsLike}°F</p>
                        {thermo}

                    </div>
                </div>

                <div className='cloud'>
                    <h3>Cloud Coverage</h3>
                    <div className='flexbox'>
                        <p>{cloudCover}%</p>
                        {cloud}

                    </div>
                </div>
            </div>
        </div>
    )
}

export default WeatherFetch;
