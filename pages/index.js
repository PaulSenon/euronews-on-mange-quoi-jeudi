import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState, useEffect } from 'react';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';

function getWeekNumber(date) {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
  );
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
}

export default function Home() {
  const today = new Date();
  const isJeudi = today.getDay() === 4;
  const weekNumber = getWeekNumber(today);
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
    return meals[(weekNumber + offset) % 2];
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

      <footer className={styles.footer}>Broad to you by Euronews SDD</footer>
    </div>
  );
}
