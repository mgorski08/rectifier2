import React from 'react';
import './Archive.module.css';
import { withNamespaces } from 'react-i18next';
import {Button, Card, Form,  Table} from 'react-bootstrap';

const Archive = ({t}) => {
  return (
    <>
      <div>
        <Card variant="top" className="text-center" style={{ width: '45rem'}}>
          <Card.Header>
            {t('Date')}: Wybor daty
            <br/>
            {t('Bath no')}
            <Form className="d-inline-block ml-0">
              <Form.Group controlId="ControlSelect1">
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                  <option>9</option>
                  <option>10</option>
                  <option>11</option>
                  <option>12</option>
                  <option>13</option>
                  <option>14</option>
                </Form.Control>
              </Form.Group>
            </Form>
          </Card.Header>
          <Card.Body>
          Dane
            <Table className="w-100" striped hover>
              <tr>
                <td className="w-25 text-right"> {t('Insert ID')}: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">Jakis wklad 1456</td>
              </tr>
              <tr>
                <td className="w-25 text-right"> {t('Insert number')}: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">125456432</td>
              </tr>
              <tr>
                <td className="w-25 text-right"> {t('Stand')}: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">5</td>
              </tr>
              <tr>
                <td className="w-25 text-right"> {t('Operators Surname')}: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">Kowalski</td>
              </tr>
              <tr>
                <td className="w-25 text-right"> {t('Information')}: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">Jedn</td>
              </tr>
              <tr>
                <td className="w-25 text-right">Info nr 2: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">Jedn</td>
              </tr>
              <tr>
                <td className="w-25 text-right">Info nr 3: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">Jedn</td>
              </tr>
              <tr>
                <td className="w-25 text-right">Info nr 4: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">Jedn</td>
              </tr>
              <tr>
                <td className="w-25 text-right">Info nr 5: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">Jedn</td>
              </tr>
              <tr>
                <td className="w-25 text-right">Info nr 6: </td>
                <td className="w-10"> </td>
                <td className="w-40 text-left">Jedn</td>
              </tr>
            </Table>
          </Card.Body>
          <Card.Footer>
            <Button variant="secondary">
              {t('Print report')}
            </Button>
          </Card.Footer>
        </Card>
      </div>
    </>
  );
};

export default withNamespaces('Archive')(Archive);
