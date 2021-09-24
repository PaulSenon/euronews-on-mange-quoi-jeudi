import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

function getWeekId(date) {
  // Copy date so don't modify original
  d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  // Get first day of year
  var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
  // Return array of year and week number
  return d.getUTCFullYear() + weekNo;
}

export default function Home() {
  const today = new Date();
  const isJeudi = today.getDay() === 4;
  const weekId = getWeekId(today);
  console.log({ weekId });
  const meals = ['🍕', '🍔🍟'];
  const todayString = isJeudi
    ? `Aujourd'hui`
    : today.getDay() > 4
    ? 'Jeudi prochain'
    : 'Jeudi';
  const offset = 1;

  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => setHasLoaded(true), 1500);
  }, []);

  function getMeal() {
    return meals[(weekId + offset) % 2];
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>
          {todayString} c'est {hasLoaded ? getMeal() : '...'}
        </title>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {todayString} c'est{' '}
          {hasLoaded ? (
            `${getMeal()}!`
          ) : (
            <Loader
              className={styles.loader}
              type="ThreeDots"
              color="#000000"
              height={70}
              width={70}
              timeout={3000} //3 secs
            />
          )}
        </h1>
      </main>

      <footer className={styles.footer}>Brought to you by Euronews SDD</footer>
    </div>
  );
}
