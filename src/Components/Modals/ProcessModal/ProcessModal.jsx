import React from 'react';
import { Button, Modal, Form } from 'react-bootstrap';

const ProcessModal = ({testElement, testTypeOfChrome, changeFormInsertion ,handleClose, show, onProcessSubmit, t, testId}) => {

  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('Creating a new insert')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>{t('id')}:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => changeFormInsertion('id', parseInt(e.target.value))}
            >
              {testId.map((o, i) => {
                return <option key={i}>{o}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('element')}:</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => changeFormInsertion('element', e.target.value)
              }
            >
              {testElement.map((o, i) => {
                return <option key={i}>{o}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('typeOfChrome')}</Form.Label>
            <Form.Control
              as="select"
              onChange={(e) => changeFormInsertion('typeOfChrome', parseInt(e.target.value))
              }
            >
              {testTypeOfChrome.map((o, i) => {
                return <option key={i}>{o}</option>;
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('name')}:</Form.Label>
            <Form.Control
              onChange={(e) => changeFormInsertion('name', e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('nrOfDrawing')}:</Form.Label>
            <Form.Control
              onChange={(e) => changeFormInsertion('nrOfDrawing', e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('nrOfOrder')}</Form.Label>
            <Form.Control
              onChange={(e) => changeFormInsertion('nrOfOrder', e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label>{t('nrOfOperation')}</Form.Label>
            <Form.Control
              onChange={(e) => changeFormInsertion('nrOfOperation', e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          {t('cancel')}
        </Button>
        <Button variant="success" onClick={onProcessSubmit}>
          {t('save changes')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProcessModal;
