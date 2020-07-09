import React from "react";
import Record from "../Record/Record";
import { Spinner } from "react-bootstrap";

const RecordList = ({ records, isLoading, onRecordDelete }) => {

  const renderRecordsContent = () => {
    return records.map ((r,i) => {
      return <Record onRecordDelete={() => onRecordDelete(r.id)} record={r} key={r.id} index={i}/>;
    });
  };

  return (
    isLoading ? <Spinner size={5} animation="border" /> : renderRecordsContent()
  );
};

export default RecordList;
