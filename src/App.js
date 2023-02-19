import { useEffect, useState } from "react";
import styled from "styled-components";
import "./App.css";

import WeatherButton from "./components/WeatherButton";
import WeatherBox from "./components/WeatherBox";

//앱이 실행 되자마자 현제 위치기반 날씨가 보인다
//날씨 정보에는 도시, 섭씨, 화씨, 날씨상태정보가 들어간다
//아래에는 5개의 버튼이 있다(1개는 현재위치 4개는 다른 도시)
//도시버튼을 누를 떄마다 상태가 업데이트 된다.
//현재위치 버튼은 누르면 다시 현재 위치기반 데이터가 나온다
//로딩스피너
function App() {
  // 현재 위치를 가져 올 수 있는 함수 작성
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const cities = ["Ohio", "Seoul", "Chicago"];
  const getCurrentLocation = () => {
    //포지션을 매개변수(parameter)로 위도(lat) 경도(lon) 값을 받아온다
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat, lon);
    });
  };

  const getWeatherByCurrentLocation = async (lat, lon) => {
    //매개변수, 위도와 경도를 받아 현제 위치의 날씨를 받아오는 API를 사용한다
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=d61cf641bb98e61451beaace9c15aa17&units=metric`;
    let res = await fetch(url); // 부를게요(res) = 기다려주세요(await) 이 url을 가져올 때 까지
    let data = await res.json(); //부를게요(res) = 기다려주세요(await) res의 json파일을 읽어와야 하므로
    setWeather(data);
  };

  const getWeatherByCity = async () => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d61cf641bb98e61451beaace9c15aa17&units=metric`;
    let res = await fetch(url);
    let data = await res.json();
    setWeather(data);
    console.log(data);
  };

  // useEffect 정리

  // useEffect가 호출 되는 원리는
  // 1. 앱이 실행이 될 때마다 호출
  // 2. 의존성배열안에 있는 인자를 받게 되면 호출

  // useEffect(() => {
  //   getCurrentLocation();
  // }, []);

  // useEffect(() => {
  //   getWeatherByCity();
  // }, [city]);

  // 위 useEffect가 호출 된 후 아래 useEffect가 호출되면
  // 아래 useEffect가 최신 불러오는 값이 되며, 처음 불러오는 값은 정보가 비어있기 때문에,
  // 앱이 실행 될때 불러올 값이 없어서 컴퓨터 입장에서 당황, 나도 당황

  // so if문으로 분기점을 나눠준다

  useEffect(() => {
    if (city == "") {
      getCurrentLocation();
    } else {
      getWeatherByCity();
    }
  }, [city]);

  // city의 값이 비어 있다면 현제위치를 호출하는 함수 실행
  // city 값이 정해진다면 정해진 도시 날씨 실행
  // 굿

  return (
    <WeatherWrap>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} setCity={setCity} />
      </div>
    </WeatherWrap>
  );
}

//API key : d61cf641bb98e61451beaace9c15aa17

export default App;

const WeatherWrap = styled.div`
  * {
    color: white;
  }
  background-image: url("https://w0.peakpx.com/wallpaper/489/382/HD-wallpaper-cloudy-earth-cloud-cosmos-earth-space.jpg");
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
  }
`;
