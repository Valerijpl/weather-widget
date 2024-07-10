import React, { useContext } from "react";
import styles from '../styles/Widget.module.css';
import Image from 'next/image';
import Day from "./Day";
import ExtendedInformation from "./ExtendedInformation";
import { Grid } from "@mui/material";

export default function Widget({size}){

    return (
        <div>
            {
                size === "small" && 
                <div>
                    <br></br>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <div className={styles.widget}>
                                <Day dayIndex={0}></Day>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className={styles.blocks}>
                                {
                                    [...Array(4)].map((e, i) => <div key={i} className={styles.empty}>Empty block</div>)
                                }  
                            </div>
                        </Grid>
                    </Grid>
                </div>
                }
            {
                size === "medium" && 
                <div>
                    <br></br>
                    <Grid container>
                        <Grid item xs={12}>
                            <div className={styles.widget}>
                                <Grid container alignItems="center">
                                    <Grid item xs={6}>
                                        <Day dayIndex={0}></Day>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Day dayIndex={1}></Day>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Day dayIndex={2}></Day>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            }
            {
                size === "large" && 
                <div>
                    <br></br>
                    <div className={styles.widget}>
                        <Grid container>
                            <Grid item xs={12}>
                                <ExtendedInformation dayIndex={0}></ExtendedInformation>
                            </Grid>
                            <Grid container>
                                {
                                    [...Array(6)].map((e, i) => <Grid item xs={2} key={i}><Day dayIndex={i + 1}></Day></Grid>)
                                }
                            </Grid>
                        </Grid>
                        <br></br>
                    </div>
                </div>
            }
        </div>
    )
}