import React, { useEffect } from 'react';
import './App.css';
import Menu from './Components/Menu/Menu';
import { Container } from 'react-bootstrap';
import Routes from './Routes/Routes';
import { withNamespaces } from 'react-i18next';
import * as actions from '../src/Redux/actions/auth';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.authCheckState());
  }, [dispatch]);

  return (
    <>
      <Menu />
      <Container fluid>
        <Routes />
      </Container>
    </>
  );
}

export default withNamespaces()(App);
