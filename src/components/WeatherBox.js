import React from "react";
import styled from "styled-components";

const WeatherBox = ({ weather }) => {
  console.log(weather);
  return (
    <WeatherBoxWrap>
      <h3>{weather?.name}</h3>
      <h1>{weather?.main.temp}°C</h1>
      <h1> {weather?.main.temp * 1.8 + 32}°F</h1>
      <h3>{weather?.weather[0].description}</h3>
    </WeatherBoxWrap>
  );
};

export default WeatherBox;

const WeatherBoxWrap = styled.div`
  border: 2px solid white;
  padding: 50px;
  background-color: rgba(1, 1, 1, 0.25);
`;
