import React from "react";
import styled from "styled-components";

const WeatherBox = () => {
  return (
    <WeatherBoxWrap>
      <div>Seoul</div>
      <h2>30</h2>
      <h3>Clear</h3>
    </WeatherBoxWrap>
  );
};

export default WeatherBox;

const WeatherBoxWrap = styled.div`
  border: 2px solid white;
  padding: 50px;
  background-color: rgba(1, 1, 1, 0.25);
`;
