import React, { useState } from 'react';
import { useEffect } from 'react';
import classes from './Clock.module.css';

const Clock = () => {
  const [time, setTime] = useState(new Date());

  const currentTime = () => {
    setTime(new Date());
  };

  useEffect(() => {
    const loop = setInterval(() => currentTime(), 1000);

    return () => clearInterval(loop);
  }, []);

  return (
    <h6 className={classes.clock}>
        CT:&nbsp;
      {time.toLocaleTimeString()}
    </h6>
  );
};

export default Clock;
