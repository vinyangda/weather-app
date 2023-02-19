import React, { useState } from "react";
// import { Button } from "react-bootstrap";
import styled from "styled-components";

const WeatherButton = ({ cities }) => {
  console.log(cities);

  //   const searchByCities=(cityName)=>{
  //  const [city,setCity]=useState('')

  //  const searchByCities=(cityName)=>{
  //   setCity(cityName)
  //   let url =
  //  }
  // }
  return (
    <ButtonWrap>
      <CurrentButton>Current</CurrentButton>

      {cities.map((item, index) => (
        <CityButton key={index}>{item}</CityButton>
      ))}
    </ButtonWrap>
  );
};

export default WeatherButton;
const ButtonWrap = styled.div`
  margin: 50px;
`;
const CurrentButton = styled.button`
  background-color: rgba(1, 1, 1, 0.5);
  border: 1px solid white;
  margin: 10px;
`;
const CityButton = styled.button`
  background-color: rgba(1, 1, 1, 0.1);
  border: 1px solid white;
  margin: 10px;
`;
