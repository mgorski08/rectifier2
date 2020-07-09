import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import withStyles from "@material-ui/core/styles/withStyles";
import {Table, Button, Container} from "react-bootstrap";
import { withNamespaces } from 'react-i18next';

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

const Record = ({ t, record, index, onRecordDelete }) => {

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (record) => (event, newExpanded) => {
    setExpanded(newExpanded ? record : false);
  };

  return(
    <>
      <ExpansionPanel key={index}>
        <ExpansionPanelSummary
          style={{backgroundColor: 'rgba(0, 0, 0, 0.03)'}}>
          <Container>{t('Process')} {record.id}</Container>
          <div className='align-top'>
            <Button onClick={() => onRecordDelete()} className="delete__btn" variant="outline-secondary btn-sm" disabled >
              {t('Del')}
            </Button>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Table className="w-300" striped hover>
            <tbody>
            <tr>
              <td className="w-25 text-right"> {t('ID')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{record.id}</td>
            </tr>
            <tr>
              <td className="w-25 text-right"> {t('Start')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{record.startTimestamp}</td>
            </tr>
            <tr>
              <td className="w-25 text-right"> {t('End')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{record.stopTimestamp}</td>
            </tr>
            </tbody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>


      </>
  );

}

export default withNamespaces('Record')(Record);
