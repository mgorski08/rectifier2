import React, { useCallback } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import classes from './SessionTimer.module.css';
import {withNamespaces} from "react-i18next";

const SessionTimer = ({ t }) => {
  const [hours, setHours] = useState();
  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();

  const MIN_IN_MS = 1000 * 60;
  const HOUR_IN_MS = MIN_IN_MS * 60;
  const DAY_IN_MS = HOUR_IN_MS * 24;


  const currentTime = useCallback(
    (expirationTime) => {
      const remainingTime = new Date(expirationTime).getTime() - new Date();
      const hours = Math.floor((remainingTime % DAY_IN_MS) / HOUR_IN_MS);
      const minutes = Math.floor((remainingTime % HOUR_IN_MS) / MIN_IN_MS);
      const seconds = Math.floor((remainingTime % MIN_IN_MS) / 1000);
      setHours(hours);
      setMinutes(minutes);
      setSeconds(seconds);
    },
    [MIN_IN_MS, HOUR_IN_MS, DAY_IN_MS]
  );

  useEffect(() => {
    const expirationTime = localStorage.getItem('expirationDate');
    const loop = setInterval(() => currentTime(expirationTime), 1000);

    return () => clearInterval(loop);
  }, [currentTime]);

  return (
    <h6 className={classes.time}>
      {t('Time left')} {0}{hours}:{minutes < 10 ? 0 : null}{minutes}:{seconds < 10 ? 0 : null}{seconds}
    </h6>
  );
};

export default withNamespaces('SessionTimer')(SessionTimer);
