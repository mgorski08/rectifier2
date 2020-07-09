import React from 'react';
import Client from '../Client/Client';
import { Spinner } from 'react-bootstrap';

const ClientList = ({ clients, isLoading, onClientDelete }) => {

  const renderClientsContent = () => {
    return clients.map((c,i) => {
      return <Client onClientDelete={() => onClientDelete(c.id)} client={c} key={c.id} index={i}/>;
    });
  };

  return (
    isLoading ? <Spinner size={5} animation="border" /> : renderClientsContent()
  );
};


export default ClientList;
