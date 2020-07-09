import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import Dynamic from '../../../Chart/Chart';

const ChartModal = ({show, onModalClose, handleSend, samples}) => {
  return(
    <Modal show={show} onHide={onModalClose}>
      <Modal.Header closeButton>
        <Modal.Title>Wykres</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Dynamic />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={onModalClose}>
          Zamknij
        </Button>
        <Button variant="success" onClick={handleSend}>
          Zapisz zmiany
        </Button>
      </Modal.Footer>
    </Modal>
  );

};

export default ChartModal;
