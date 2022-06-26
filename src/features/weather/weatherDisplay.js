import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

// Slice funcs
import { 
    selectWeatherConditions, 
    selectWeatherIconUrl,
    selectLoading,
    selectFailed, 
    fetchWeather 
} from './weatherSlice';

export const WeatherDisplay = () => {
    const [location, setLocation] = useState({});
    const loading = useSelector(selectLoading);
    const failed = useSelector(selectFailed);
    const weather = useSelector(selectWeatherConditions);
    const iconUrl = useSelector(selectWeatherIconUrl);

    const dispatch = useDispatch();

    const convertToTime = time => {
        const date = new Date(time * 1000);
        let hours = date.getHours();
        let suffix = ' AM';
        if (hours >= 12) {
            hours = hours > 12 ? hours - 12 : hours;
            suffix = ' PM';
        }
        const minutes = "0" + date.getMinutes();
        return hours + ':' + minutes.substr(-2) + suffix;
    }

    const convertToTextDirection = windDegree => {
        var val = Math.floor((windDegree / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                setLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            },
            function(error) {
              console.error("Error Code = " + error.code + " - " + error.message);
            }
          );
    }, [loading, failed]);

    useEffect(() => {
        if (location.lat && location.lng)   
            dispatch(fetchWeather(location));
    }, [location.lat, location.lng]);

    return (
        <div className='weather-disp'>
            <div className='weather-main'>
                <img src={iconUrl} />
                <div className='weather-main-info'>
                    <h3>{weather.main || '???'}</h3>
                    <p>Temp: {weather.temp || '???'}°F</p>
                </div>
            </div>
            <hr/>
            <div className='weather-secondary-info'>
                <div className='vertical-cont weather'>
                    <div className='weather-infoblock'>
                        <p>Feels like:</p><p>{weather.feelsLike || '???'}°F</p>
                    </div>
                    <div className='weather-infoblock'>
                        <p>Sunrise:</p><p>{convertToTime(weather.sunrise) || '???'}</p>
                    </div>
                    <div className='weather-infoblock'>
                        <p>Sunset:</p><p>{convertToTime(weather.sunset) || '???'}</p>
                    </div>
                </div>
                <div className='vertical-cont weather'>
                    <div className='weather-infoblock'>
                        <p>Wind speed:</p><p>{weather.wind ? weather.wind.speed : '???'} MPH</p>
                    </div>
                    <div className='weather-infoblock'>
                        <p>Wind direction:</p><p>{weather.wind ? convertToTextDirection(weather.wind.deg) : '???'}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}