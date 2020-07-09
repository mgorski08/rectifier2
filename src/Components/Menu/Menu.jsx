import React from 'react';
import { Navbar, Nav, NavItem, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Clock from '../Clock/Clock';
import { withNamespaces } from 'react-i18next';
import i18n from '../../i18n';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from '../../Redux/actions/auth';
import SessionTimer from '../SessionTimer/SessionTimer';

const Menu = (props) => {
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const token = useSelector( state => state.auth.token !== null);
  const dispatch = useDispatch();
  const { t } = props;

  let navLinks = (
    <Nav className="ml-auto">
      <Clock/>
      <LinkContainer as={Button}  variant="outline-dark" to="/login" className="mr-2">
        <NavItem>{t('Log in')}</NavItem>
      </LinkContainer>
      <NavItem as={Button} onClick={() => changeLanguage('pl')} variant="outline-info" className="mr-2">PL</NavItem>
      <NavItem as={Button} onClick={() => changeLanguage('en')} variant="outline-info" className="mr-2">EN</NavItem>
    </Nav>
  );

  if (token) {
    navLinks = (
      <>
        <Nav className="mr-auto">
          <LinkContainer as={Button}  variant="outline-dark" to="/stanowiska" className="ml-2">
            <NavItem>{t('StandsBtn')}</NavItem>
          </LinkContainer>
          <LinkContainer as={Button}  variant="outline-dark" to="/wanny" className="ml-2">
            <NavItem>{t('BathsBtn')}</NavItem>
          </LinkContainer>
          <LinkContainer as={Button}  variant="outline-dark" to="/archiwum" className="ml-2">
            <NavItem>{t('ProcessesBtn')}</NavItem>
          </LinkContainer>
          <LinkContainer as={Button}  variant="outline-dark" to="/klient" className="ml-2">
            <NavItem>{t('ClientsBtn')}</NavItem>
          </LinkContainer>
          <LinkContainer as={Button}  variant="outline-dark" to="/detale" className="ml-2">
            <NavItem>{t('DetailsBtn')}</NavItem>
          </LinkContainer>
          <LinkContainer as={Button}  variant="outline-dark" to="/zamowienia" className="ml-2">
            <NavItem>{t('OrdersBtn')}</NavItem>
          </LinkContainer>
        </Nav>
        <SessionTimer t = {t}/>
        <Clock/>
        <Nav>
          <LinkContainer exact to="/" variant="outline-danger" className="mr-2">
            <NavItem as={Button}  onClick={() => dispatch(actions.logout())}>{t('Log out')}</NavItem>
          </LinkContainer>
          <NavItem as={Button} onClick={() => changeLanguage('pl')} variant="outline-info" className="mr-2">PL</NavItem>
          <NavItem as={Button} onClick={() => changeLanguage('en')} variant="outline-info" className="mr-2">EN</NavItem>
        </Nav>
      </>
    );
  }

  return (
    <Navbar id="menu" bg="light" expand="md" collapseOnSelect>
      <Navbar.Brand>
        {t('Programs name')}
      </Navbar.Brand>
      <Navbar.Toggle/>
      <Navbar.Collapse>
        {navLinks}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default withNamespaces('Menu')(Menu);
