import Image from "next/image";
import React, { useState } from "react";

const Weather = ({ data }) => {
  const [isCelsius, setIsCelsius] = useState(false);

  const temperature = isCelsius
    ? ((data.main.temp - 32) * (5 / 9)).toFixed(0)
    : data.main.temp.toFixed(0);

  const handleToggle = () => setIsCelsius(!isCelsius);

  const currentDate = new Date().toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).replace(/ /g, "-");

  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div>
      <div className="relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 text-gray-300 z-10">
    
        <div className="flex justify-between items-center pb-4 text-lg">
          <span>{currentDate}</span>
          <span>{currentTime}</span>
        </div>

        <div className="relative flex justify-between items-center pt-4">
          <div className="flex flex-col items-center">
            <Image
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="Weather Icon"
              width="100"
              height="100"
            />
            <p className="text-2xl">{data.weather[0].main}</p>
          </div>
            <p className="text-9xl">
              {temperature}&#176;{isCelsius ? "C" : "F"}
            </p>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleToggle}
              className="flex items-center justify-center text-lg bg-gray-800 text-white font-bold py-1 px-2 rounded-md border border-gray-500"
            >
              <span className={`mr-1 ${!isCelsius ? "text-blue-400" : ""}`}>F</span>
              <span>|</span>
              <span className={`ml-1 ${isCelsius ? "text-blue-400" : ""}`}>C</span>
            </button>
          </div>
        </div>
        
        <div className="bg-black/50 relative p-8 mt-4 rounded-md">
          <p className="text-2xl text-center pb-6">Weather in {data.name}</p>
          <div className="flex justify-between text-center">
            <div>
              <p className="font-bold text-2xl">
                {isCelsius
                  ? ((data.main.feels_like - 32) * (5 / 9)).toFixed(0)
                  : data.main.feels_like.toFixed(0)}
                &#176; {isCelsius ? "C" : "F"}
              </p>
              <p className="text-xl">Feels Like</p>
            </div>
            <div>
              <p className="font-bold text-2xl">{data.main.humidity}%</p>
              <p className="text-xl">Humidity</p>
            </div>
            <div>
              <p className="font-bold text-2xl">
                {data.wind.speed.toFixed(0)} MPH
              </p>
              <p className="text-xl">Winds</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
