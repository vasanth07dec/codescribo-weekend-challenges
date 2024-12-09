import { WiStrongWind } from "react-icons/wi";
import { MdOutlineWaterDrop } from "react-icons/md";
import axios from "axios";
import { useState, useEffect } from "react";
import styles from "./Weather.module.css";
import WeatherCard from "../../components/cards/WeatherCard";
import { getWeather } from "../../utils/weather";

/**
 * Component - Weather
 * showing weather data in houly, daily, current weather
 * For more info read README.md
 * 
 * @returns {JSX.Element}
 */
const Weather = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [dailyWeather, setDailyWeather] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [greeting, setGreeting] = useState("");
  const now = new Date();
  const currentHour = now.getHours();

  // Determine greeting based on the current hour
  useEffect(() => {
    if (currentHour < 12) {
      setGreeting("Good Morning");
    } else if (currentHour < 18) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }
  }, [currentHour]);

  /**
   * Fetch weather data on component mount
   */
  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_WEATHER_API_URL);
        console.log(response.data, "response");
        const dailyWeather = response.data.daily.time.map((time, i) => ({
          day: time,
          temp: response.data.daily.temperature_2m_max[i],
          wind: response.data.daily.wind_speed_10m_max[i],
          probability: response.data.daily.precipitation_probability_max[i],
          status: response.data.daily.weather_code[i],
        }));
        setDailyWeather(dailyWeather);
        setCurrentWeather(response.data.current);
        setSelectedDay(dailyWeather[0]);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };
    fetchWeather();
  }, []);

  return (
    <main className={styles.main}>
      {/* Today's weather */}
      <section className={styles.week}>
        <header>
          <p>Chennai</p> <p>{selectedDay?.day}</p>
        </header>
        <div className={styles["total-weather-container"]}>
          <div className={styles["weather-status-container"]}>
            <h1 className={styles["big-font"]}>
              {selectedDay?.temp}
              <span>&deg;</span>
            </h1>
            <p className={styles["weather-status-big"]}>
              {getWeather(selectedDay?.status)}
            </p>
          </div>
          <div className={styles["icon-container"]}>
            <div className={styles["icon-label"]}>
              <WiStrongWind color="#696969" size={38} />
              <p>{selectedDay?.wind} mph</p>
            </div>
            <div className={styles["icon-label"]}>
              <MdOutlineWaterDrop color="#696969" size={35} />
              <p>{selectedDay?.probability}%</p>
            </div>
          </div>
        </div>
        <div className={styles["card-container"]}>
          {dailyWeather?.map((dw, i) => (
            <WeatherCard
              key={i + 1}
              day={dw.day}
              temp={dw.temp}
              status={dw.status}
              wind={dw.wind}
              probability={dw.probability}
              setSelectedDay={setSelectedDay}
            />
          ))}
        </div>
      </section>
      {/* current weather */}
      <section className={styles.today}>
        <h3 className={styles.header}>{greeting}</h3>
        <p className={styles.time}>{currentWeather?.time?.split("T")?.[1]}</p>
        <div className={styles["total-weather-container"]}>
          <h1 className={styles["temp-small"]}>
            {currentWeather?.temperature_2m}
            <span>&deg;</span>
          </h1>
          <div className={styles["icon-container-small"]}>
            <div className={styles["icon-label-small"]}>
              <WiStrongWind color="#696969" size={25} />
              <p>{currentWeather?.wind_speed_10m} mph</p>
            </div>
            <div className={styles["icon-label-small"]}>
              <MdOutlineWaterDrop color="#696969" size={25} />
              <p>{currentWeather?.precipitation}%</p>
            </div>
          </div>
        </div>
        <div className={styles["weather-status-small"]}>
          <p>Feel like {currentWeather.apparent_temperature}</p>
          <p>{getWeather(currentWeather?.weather_code)}</p>
        </div>
        <div className={styles["hourly-grid"]}>
          {dailyWeather?.slice(0, 6)?.map((dw, i) => (
            <WeatherCard
              key={i + 1}
              day={dw.day}
              temp={dw.temp}
              status={dw.status}
              wind={dw.wind}
              probability={dw.probability}
              setSelectedDay={setSelectedDay}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default Weather;
