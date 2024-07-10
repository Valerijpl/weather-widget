import Head from 'next/head';
import Image from 'next/image';
import { useEffect, useState, useContext, useCallback } from 'react';
import styles from '../styles/Home.module.css';
import Widget from '../components/Widget.js';
import React from 'react';
import TextField, { InputProps } from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { GetServerSideProps } from 'next';

export const ApiContext = React.createContext();

export const getServerSideProps = (async () => {
  const res = await fetch('http://ip-api.com/json');
  const userInfo = await res.json();
  return { props: { userInfo } }
});

export default function Home({ userInfo }) {
  const [apiData, setApiData] = useState('');
  const [city, setCity] = useState('');

  const fetchApiData = async function(city){
    const res = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=3cf7df3ee4ca449cb6b04322241007&q=${city}&days=7`);
    if (res.ok) {
      const result = await res.json();
      result.current.condition.icon = adjustWeatherIconSrc(result.current.condition.icon);
      setApiData(result);
    } else {
      window.alert('Get current weather, ' + res.statusText);
    }
  }

  const updateCityValue = useCallback(event => {
    const currentCityValue = event.target.value;
    setCity(currentCityValue);
  });

  const submitCityForm = useCallback(event => {
    event.preventDefault();
    fetchApiData(city);
  });

  useEffect(() => {
    fetchApiData(userInfo.city);
  }, []);

  function adjustWeatherIconSrc(src){
    return 'https:' + src;
  }

  return (
    <div>
        <Head>
            <title>Weather widget app</title>
            <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className={styles.main}>
            <ApiContext.Provider value={ apiData }>
                <Box component="form" autoComplete="off" onSubmit={submitCityForm }>
                    <TextField id="city" inputProps={{className: styles.search, classes: {notchedOutline: styles.search}}} label="City" variant="standard" onChange={ updateCityValue } fullWidth></TextField>
                </Box>
                { apiData.current ? 
                    <div>
                        <Widget size="small"></Widget>
                        <Widget size="medium"></Widget>
                        <Widget size="large"></Widget>
                    </div> :
                    <div className={styles.notification}>No valid data to display</div>
                }
            </ApiContext.Provider>
        </main>

        <style jsx global>{`
            @media (prefers-color-scheme: dark)  {
                html {
                  background-color: #333;
                }
            }
          
            @media (prefers-color-scheme: light) {
                html {
                    background-color: #fff;
                }
            }
        `}</style>

    </div>
  );
}
