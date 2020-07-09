import React from 'react';
import Order from "../Order/Order";
import { Spinner } from 'react-bootstrap';

const OrderList = ({ orders, isLoading, onOrderDelete }) => {

  const renderOrdersContent = () => {
    return orders.map((o,i) => {
      return <Order onOrderDelete={() => onOrderDelete(o.id)} order={o} key={o.id} index={i}/>;
    });
  };

  return (
    isLoading ? <Spinner size={5} animation="border" /> : renderOrdersContent()
  );
};


export default OrderList;
