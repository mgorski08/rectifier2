import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Modal, Form} from 'react-bootstrap';
import {withNamespaces} from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import axios from '../../config/axios.js';
import DetailList from "../../Components/Detail/DetailList/DetailList";


const Details = ({t}) => {
  const [detailsList, setDetailsList] = useState();
  const [show, setShow] = useState(false);
  const [newDetailData, setNewDetailData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);
  //const [clients, setClientsNameList] = useState();


  const handleSend = () => {
    setShow(false);
    setIsLoading(true);
    axios.post('/element', {
      ...newDetailData,
    })
      .then(() =>
      {
        fetchData();
      });
  };

  const fetchClients = () => {
    axios
      .get('client/name')
    //  .then((res) => {setClientsNameList(res.data);});
  };

  const fetchData = () => {
    axios
      .get('element/')
      .then((res) => {setDetailsList(res.data); setIsLoading(false);});
  };

  const handleDetailDelete = (id) => {
    axios.delete(`element/${id}`)
      .then(() => fetchData());
  };

  useEffect(() => {
    fetchData();
    fetchClients();
  }, []);

  const renderDetailsList = () => ( <DetailList
    onDetailDelete={handleDetailDelete}
    details={detailsList}
    isLoading={isLoading}
  />);


  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '5rem' }}>
    <Card variant="top" className="text-center w-75">
      <Card.Header className="d-flex align-items-center justify-content-center">
        {t('Details')}
        <Button onClick={() => setShow(true)} className="add__btn" variant="outline-secondary">
          {t('Add')}
        </Button>
      </Card.Header>
      <Card.Body style={{marginLeft: 0, marginRight: 0}}>
        <Col as={Card} border="light" text="center">
          <Accordion >
            {renderDetailsList()}
          </Accordion>
        </Col>
      </Card.Body>
      <Card.Footer>
      </Card.Footer>
    </Card>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Add')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{t('dName')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewDetailData({
                  ...newDetailData,
                  name: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('dClient')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewDetailData({
                  ...newDetailData,
                  client: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button variant="success" onClick={handleSend}>
          {t('save changes')}
        </Button>
      </Modal.Footer>
    </Modal>
  </div>;

};

export default withNamespaces('Detail')(Details);

/*<Form.Label>{t('Client')}</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) =>
                setNewDetailData({
                  ...newDetailData,
                  client: e.target.value,
                })
              }
            >
              {clients.map((c, i) => {
                return <option key={i}>{c}</option>;
              })}
            </Form.Control>*/
