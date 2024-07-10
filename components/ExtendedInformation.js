import { ApiContext } from "../pages";
import React, { useContext } from "react";
import styles from '../styles/ExtendedInformation.module.css';
import Image from 'next/image';
import { Grid } from "@mui/material";

export default function ExtendedInformation(){
    const apiData = React.useContext(ApiContext);

    const imageLoader = ({src})=>{
        return apiData.current ? apiData.current.condition.icon : '';
    }

    return (
        <div className={styles.container}>
            <p className={styles.title}>{apiData.location ? apiData.location.name + ', ' + apiData.location.country : ''}</p>
            <Grid container alignItems="center">
                <Grid item xs={4}>
                    <div className={styles.container}>
                        <p className={styles.text}>Extended Information:</p>
                        <p className={styles.label}>Feels like: {apiData.current ? apiData.current.feelslike_c + '°C' : ''}</p>
                        <p className={styles.label}>Precip: {apiData.current ? apiData.current.precip_mm + ' mm': ''}</p>
                        <p className={styles.label}>Humidity: {apiData.current ? apiData.current.humidity + '%': ''}</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={styles.container}>
                        <p className={styles.text}>Current weather <strong className={styles.additional}>(last updated at {apiData.current ? apiData.current.last_updated : ''})</strong>:</p>
                        <p className={styles.label}>{apiData.current ? apiData.current.condition.text : ''}</p>
                        <Image loader={imageLoader} alt="Weather" width={64} height={64} src={apiData.current ? apiData.current.condition.icon : ''} />
                        <p className={styles.temperature}>{apiData.current ? apiData.current.temp_c + '°C' : '' }</p>
                    </div>
                </Grid>
                <Grid item xs={4}>
                    <div className={styles.container}>
                        <p className={styles.text}>Temperature during the day:</p>
                        <p className={styles.label}>Morning (8:00): {apiData.forecast ? apiData.forecast.forecastday[0].hour[8].temp_c + '°C' : ''}</p>
                        <p className={styles.label}>Afternoon (16:00): {apiData.forecast ? apiData.forecast.forecastday[0].hour[16].temp_c + '°C' : ''}</p>
                        <p className={styles.label}>Evening (20:00): {apiData.forecast ? apiData.forecast.forecastday[0].hour[20].temp_c + '°C' : ''}</p>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}