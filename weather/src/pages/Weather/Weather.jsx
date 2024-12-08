import { WiStrongWind } from "react-icons/wi";
import { MdOutlineWaterDrop } from "react-icons/md";

import styles from "./Weather.module.css";

const Weather = () => {
  return (
    <main className={styles.main}>
      <section className={styles.week}>
        <header>
          <p>Chennai</p> <p>21.4.2024</p>
        </header>
        <div>
          <h1 className={styles["big-font"]}>
            20<span>&deg;</span>
          </h1>
          <WiStrongWind color="#696969" size={38} />
          <MdOutlineWaterDrop color="#696969" size={35} />
        </div>
      </section>
      <section className={styles.today}>This is the weather page</section>
    </main>
  );
};

export default Weather;
