import { getDayByDate } from "../../utils/day";
import { getWeather } from "../../utils/weather";
import styles from "./WeatherCard.module.css";

/**
 * Component - WeatherCard
 * Displays weather data (daily or hourly) in a card format.
 * For more info read README.md
 * 
 * @returns {JSX.Element}
 */
const WeatherCard = (props) => {
  const { setSelectedDay, ...rest } = props;

  return (
    <div
      className={styles.card}
      onClick={() => {
        setSelectedDay(rest);
        // based onclick show the data on top
      }}
    >
      {/* Day Name */}
      <p>{getDayByDate(props.day)}</p>
      {/* Temperature */}
      <h3>
        {props.temp}
        <span>&deg;</span>
      </h3>
      {/* Weather Status */}
      <p className={styles["weather-sts"]}>{getWeather(props.status)}</p>
    </div>
  );
};

export default WeatherCard;
