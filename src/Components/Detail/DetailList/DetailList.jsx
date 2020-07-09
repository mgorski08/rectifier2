import React from 'react';
import Detail from "../Detail/Detail";
import { Spinner } from 'react-bootstrap';

const DetailList = ({ details, isLoading, onDetailDelete }) => {

  const renderDetailsContent = () => {
    return details.map((d,i) => {
      return <Detail onDetailDelete={() => onDetailDelete(d.id)} detail={d} key={d.id} index={i}/>;
    });
  };

  return (
    isLoading ? <Spinner size={5} animation="border" /> : renderDetailsContent()
  );
};


export default DetailList;
