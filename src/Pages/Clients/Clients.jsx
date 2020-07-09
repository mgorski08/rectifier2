import React, {useState, useEffect} from 'react';
import './Clients.css';
import {Button, Card, Col, Modal, Form} from 'react-bootstrap';
import { withNamespaces } from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import axios from '../../config/axios.js';
import ClientList from '../../Components/Client/ClientList/ClientList';

const Clients = ({ t }) => {
  const [clientsList, setClientsList] = useState();
  const [show, setShow] = useState(false);
  const [newClientData, setNewClientData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);

  const handleSend = () => {
    setShow(false);
    setIsLoading(true);
    axios.post('/client', {
      ...newClientData,
    })
      .then(() =>
      {
        fetchData();
      });
  };

  const fetchData = () => {
    axios
      .get('client/')
      .then((res) => {setClientsList(res.data); setIsLoading(false);});
  };

  const handleClientDelete = (id) => {
    axios.delete(`client/${id}`)
      .then(() => fetchData());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderClientsList = () => ( <ClientList
    onClientDelete={handleClientDelete}
    clients={clientsList}
    isLoading={isLoading}
  />);

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '5rem' }}>
    <Card variant="top" className="text-center w-75">
      <Card.Header className="d-flex align-items-center justify-content-center">
        {t('Clients')}
        <Button onClick={() => setShow(true)} className="add__btn" variant="outline-secondary">
          {t('Add')}
        </Button>
      </Card.Header>
      <Card.Body style={{marginLeft: 0, marginRight: 0}}>
        <Col as={Card} border="light" text="center">
          <Accordion >
            {renderClientsList()}
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
            <Form.Label>{t('cName')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewClientData({
                  ...newClientData,
                  companyName: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('NIP')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewClientData({
                  ...newClientData,
                  nip: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('cCity')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewClientData({
                  ...newClientData,
                  city: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('cStreet')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewClientData({
                  ...newClientData,
                  address: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('cCode')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewClientData({
                  ...newClientData,
                  zipCode: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('cNumber')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewClientData({
                  ...newClientData,
                  phoneNumber: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('cContact')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewClientData({
                  ...newClientData,
                  email: e.target.value,
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

export default withNamespaces('Client')(Clients);

