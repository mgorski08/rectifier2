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

const Detail = ({ t, detail, index, onDetailDelete }) => {



  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (detail) => (event, newExpanded) => {
    setExpanded(newExpanded ? detail : false);
  };

  return(
    <>
      <ExpansionPanel key={index}>
        <ExpansionPanelSummary
          style={{backgroundColor: 'rgba(0, 0, 0, 0.03)'}}>
          <Container>{t('dName')} {detail.name} </Container>
          <div className='align-top'>
            <Button onClick={() => onDetailDelete()} className="delete__btn" variant="outline-danger btn-sm">
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
              <td className="w-40 text-left">{detail.id}</td>
            </tr>
            <tr>
              <td className="w-25 text-right"> {t('dName')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{detail.name}</td>
            </tr>
            <tr>
              <td className="w-25 text-right"> {t('dClient')} </td>
              <td className="w-10"> </td>
              <td className="w-40 text-left">{detail.client}</td>
            </tr>
            </tbody>
          </Table>
        </ExpansionPanelDetails>
      </ExpansionPanel>



    </>
  );
};

export default withNamespaces('Detail')(Detail);
