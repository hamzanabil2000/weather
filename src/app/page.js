"use client";

import axios from 'axios';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import Weather from '../components/Weather';
import Spinner from '../components/Spinner';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}`;

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    axios.get(url).then((response) => {
      setWeather(response.data);
    });
    setCity('');
    setLoading(false);
  };

  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div className="relative w-screen h-screen overflow-hidden">
        <div className="absolute inset-0 bg-blue-950 z-[1]" />
        <div className="relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 text-white z-10">
          <form
            onSubmit={fetchWeather}
            className="flex justify-between items-center w-full p-3 bg-transparent border border-gray-300 text-white rounded-2xl"
          >
            <input
              onChange={(e) => setCity(e.target.value)}
              className="bg-transparent border-none text-white focus:outline-none text-2xl"
              type="text"
              placeholder="Search city"
            />
            <button onClick={fetchWeather} type="submit">
              <BsSearch size={20} />
            </button>
          </form>
        </div>
        {weather.main && <Weather data={weather} />}
      </div>
    );
  }
}
