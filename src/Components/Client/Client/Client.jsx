import React from 'react';
import { withNamespaces } from 'react-i18next';
import Card from 'react-bootstrap/Card';
import {Button, Container, Table} from 'react-bootstrap';
import './Client.css';
import makeStyles from "@material-ui/core/styles/makeStyles";
import withStyles from "@material-ui/core/styles/withStyles";
import MuiExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";


const useStyles = makeStyles((theme) => ({

  CardHeader: {
    headerColour: 'rgba(0, 0, 0, 0.03)',
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
    minHeight: '3rem'
  },
  exp: {
    maxWidth: 1500,
    minWidth: 800,
    shadow: 0,
    expansionShadow: 0
  }
}));


const ExpansionPanel = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiExpansionPanel);

const Client = ({ t, client, index, onClientDelete }) => {

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (client) => (event, newExpanded) => {
    setExpanded(newExpanded ? client : false);
  };

  return(
    <>
      <ExpansionPanel key={index}>
        <ExpansionPanelSummary
          style={{backgroundColor: 'rgba(0, 0, 0, 0.03)'}}>
          <Container>
            {t('cName')} {client.companyName}
            </Container>
          <div className='align-top'>
            <Button onClick={() => onClientDelete()} className="delete__btn" variant="outline-danger btn-sm">
              {t('Del')}
            </Button>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table className="w-300" striped hover>
            <tbody>
            <tr>
              <td className="w-25 text-right"> {t('cID')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{client.id}</td>
            </tr>
            <tr>
              <td className="w-25 text-right"> {t('cCity')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{client.city}</td>
            </tr>
            <tr>
              <td className="w-25 text-right"> {t('cStreet')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{client.address}</td>
            </tr>
            <tr>
              <td className="w-25 text-right"> {t('cCode')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{client.zipCode}</td>
            </tr>
            <tr>
              <td className="w-25 text-right">{t('cNumber')}</td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{client.phoneNumber}</td>
            </tr>
            <tr>
              <td className="w-25 text-right">{t('NIP')}</td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{client.nip}</td>
            </tr>
            <tr>
              <td className="w-25 text-right">{t('cContact')}</td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{client.email}</td>
            </tr>
            </tbody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>



    </>
  );


}


export default withNamespaces('Client')(Client);



