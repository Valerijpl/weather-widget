import { ApiContext } from "../pages";
import React, { useContext, useEffect, useState } from "react";
import styles from '../styles/Day.module.css';
import Image from 'next/image';

export default function Day({dayIndex}){
    const apiData = React.useContext(ApiContext);
    const [date, setDate] = useState('');

    const imageLoader = ({src})=>{
        return apiData.forecast ? apiData.forecast.forecastday[dayIndex].day.condition.icon : '';
    }

    useEffect(() => {
        if (apiData.forecast){
            const currentDate = new Date(apiData.forecast.forecastday[dayIndex].date).toLocaleString('en-us', {weekday:'long'});
            setDate(currentDate);
        }
    }, [apiData]);


    return (
        <div className={styles.container}>
            { dayIndex === 0 ? <p className={styles.text}>{apiData.location ? apiData.location.name + ', ' + apiData.location.country : ''}</p> : 
            <p className={styles.text}>{apiData ? date : ''}</p> }
            <p className={styles.label}>{apiData.forecast ? apiData.forecast.forecastday[dayIndex].day.condition.text : ''}</p>
            <Image loader={imageLoader} alt="Weather" width={dayIndex === 0 ? 64 : 32} height={dayIndex === 0 ? 64 : 32} src={apiData.forecast ? apiData.forecast.forecastday[dayIndex].day.condition.icon : ''} />
            <p className={styles.text}>{apiData.forecast ? apiData.forecast.forecastday[dayIndex].day.avgtemp_c + '°C' : '' }</p>
        </div>
    )
}