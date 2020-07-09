import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Modal, Form, Container} from 'react-bootstrap';
import {withNamespaces} from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import axios from '../../config/axios.js';
import RecordList from "../../Components/Record/RecordList/RecordList";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Records = ({ t }) => {
  const [recordsList, setRecordsList] = useState();
  const [show, setShow] = useState(false);
  const [newRecordData, setNewRecordData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const handleSend = () => {
    setShow(false);
    setIsLoading(true);
    axios.post('/process', {
      ...newRecordData,
    })
      .then(() =>
      {
        fetchData();
      });
  };

  const fetchData = () => {
    axios
      .get('process/')
      .then((res) => {setRecordsList(res.data); setIsLoading(false);});
  };

  const handleRecordDelete = (id) => {
    axios.delete(`process/${id}`)
      .then(() => fetchData());
  };

  useEffect(() => {
    fetchData();
    filterRecordStart(startDate, endDate);
  }, []);

  const renderRecordsList = () => ( <RecordList
    onRecordDelete={handleRecordDelete}
    records={recordsList}
    isLoading={isLoading}
/>);


  const filterRecordStart = ({startDate, endDate}) =>{
    axios
      .get(`/process/byStart/{startDate}/{endDate}`)
      .then((res) => {setRecordsList(res.data);});
  }


  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '5rem' }}>
    <Card variant="top" className="text-center w-75">
      <Card.Header className="d-flex align-items-center justify-content-center">
        <div>
          {t('Processes')}
        </div>
        <div>
          &nbsp;&nbsp;&nbsp;
          <DatePicker
            selected={startDate}
            onChange={date => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat='dd/MM/yyyy'
          />
          &nbsp;
          <DatePicker
            selected={endDate}
            onChange={date => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat='dd/MM/yyyy'
          />
        </div>
      </Card.Header>
      <Card.Body style={{marginLeft: 0, marginRight: 0}}>
        <Col as={Card} border="light" text="center">
          <Accordion >
            {renderRecordsList()}
          </Accordion>
        </Col>
      </Card.Body>
      <Card.Footer/>
    </Card>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{t('ID')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewRecordData( {
                  ...newRecordData,
                  id: e.target.value,
                })
              }
              >
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          {t('Close')}
        </Button>
        <Button variant="success" onClick={handleSend}>
          {t('Save Changes')}
        </Button>
      </Modal.Footer>
    </Modal>
  </div>;

};

export default withNamespaces('Record')(Records);
