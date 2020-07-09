import React from 'react';
import Stand from '../../Components/Stand/Stand';
import { Row, Spinner } from 'react-bootstrap';
import axios from '../../config/axios.js';
import { useState } from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Stands = () => {
  const [fetchedStands, setFetchedStands] = useState();
  const token = useSelector((state) => state.auth.token);

  const fetchData = () => {
    axios
      .get('bath/')
      .then((res) => setFetchedStands(res.data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOccupy = (id) => {
    axios
      .post(`bath/${id}/occupy`,token)
      .then(() => fetchData());
  };

  const handleFreeUp = (id) => {
    axios
      .post(`bath/${id}/free`,token)
      .then(() => fetchData());
  };

  const renderStands = () => {
    const baths = [];
    if (fetchedStands) {
      fetchedStands.forEach((s, i) => {
        baths.push(<Stand
          handleOccupy={() => handleOccupy(s.id)}
          handleFreeUp={() => handleFreeUp(s.id)}
          key={s.id}
          index={i + 1}
          id={s.id}
          process={s.process}
          user={s.user} />);
      });
      return <Row>{baths}</Row>;
    } else return <Spinner animation="border" />;
  };

  return <div>{renderStands()}</div>;
};

export default Stands;
