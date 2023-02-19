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
  const cities = ["Ohio", "Seoul", "Chicago"];
  const getCurrentLocation = () => {
    //포지션을 매개변수(parameter)로 위도(lat) 경도(lon) 값을 받아온다
    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      console.log("current position", lat, lon);
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

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <WeatherWrap>
      <div className="container">
        <WeatherBox weather={weather} />
        <WeatherButton cities={cities} />
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
