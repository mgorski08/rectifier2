import React, {useState, useEffect} from 'react';
import {Button, Card, Col, Modal, Form} from 'react-bootstrap';
import {withNamespaces} from 'react-i18next';
import Accordion from 'react-bootstrap/Accordion';
import axios from '../../config/axios.js';
import OrderList from "../../Components/Order/OrderList/OrderList";

const Orders = ({ t }) => {
  const [ordersList, setOrdersList] = useState();
  const [show, setShow] = useState(false);
  const [newOrderData, setNewOrderData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const handleClose = () => setShow(false);

  const handleSend = () => {
    setShow(false);
    setIsLoading(true);
    axios.post('/order', {
      ...newOrderData,
    })
      .then(() =>
      {
        fetchData();
      });
  };

  const fetchData = () => {
    axios
      .get('order/')
      .then((res) => {setOrdersList(res.data); setIsLoading(false);});
  };

  const handleOrderDelete = (id) => {
    axios.delete(`order/${id}`)
      .then(() => fetchData());
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderOrdersList = () => ( <OrderList
      onOrderDelete={handleOrderDelete}
      orders={ordersList}
      isLoading={isLoading}
    />);

  return <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '5rem' }}>
    <Card variant="top" className="text-center w-75">
      <Card.Header className="d-flex align-items-center justify-content-center">
        {t('Orders')}
        <Button onClick={() => setShow(true)} className="add__btn" variant="outline-secondary">
          {t('Add')}
        </Button>
      </Card.Header>
      <Card.Body style={{marginLeft: 0, marginRight: 0}}>
        <Col as={Card} border="light" text="center">
          <Accordion >
            {renderOrdersList()}
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
            <Form.Label>{t('oName')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewOrderData({
                  ...newOrderData,
                  name: e.target.value,
                })
              }
            >
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('oClient')}</Form.Label>
            <Form.Control
              onChange={(e) =>
                setNewOrderData({
                  ...newOrderData,
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

export default withNamespaces('Order')(Orders);
