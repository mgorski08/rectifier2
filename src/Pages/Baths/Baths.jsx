import React from 'react';
import Bath from '../../Components/Bath/Bath';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import axios from '../../config/axios.js';

const Baths = () => {
  const [fetchedBaths, setFetchedBaths] = useState();

  useEffect(() => {
    axios
      .get('bath/')
      .then((res) => setFetchedBaths(res.data));
  }, []);

  const renderBaths = () => {
    const baths = [];
    if (fetchedBaths) {
      fetchedBaths.forEach((b, i) => {
        baths.push(<Bath key={b.id} index={i + 1} id={b.id} user={b.user}
          minVoltage={b.minVoltage}
          minCurrent={b.minCurrent}
          minTemperature={b.minCurrent}
          minTime={b.minTime}
          maxVoltage={b.maxVoltage}
          maxCurrent={b.maxCurrent}
          maxTemperature={b.maxTemperature}
          maxTime={b.maxTime}
        />);
      });
      return <Row>{baths}</Row>;
    } else return <Spinner animation="border" />;
  };

  return (
    <>
      <div>{renderBaths()}</div>
    </>
  );
};

export default Baths;
