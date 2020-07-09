//Wersja najpózniejsza
import React, { useEffect, useCallback, useRef } from 'react';
import { Card, Col, Button, Table} from 'react-bootstrap';
import classes from './Stand.module.css';
import { useState } from 'react';
import axios from '../../config/axios';
import { withNamespaces } from 'react-i18next';
import { useSelector } from 'react-redux';
import EventSource from 'eventsource';
import ChartModal from '../Modals/ChartModal/ChartModal';
import ProcessModal from '../Modals/ProcessModal/ProcessModal';
import ParametersTable from './ParametersTable/ParametersTable';

const Stand = (props) => {

  //#region Hooks
  const [isProcessModalVisible, setIsProcessModalVisible] = useState(false);
  const [isChartModalVisisble, setIsChartModalVisible] = useState(false);
  const [process, setProcess] = useState();
  const [data, setData] = useState([]);
  const username = useSelector((state) => state.auth.username);
  const token = useSelector( state => state.auth.token);
  const eventSourceRef = useRef(null);

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };
  const { t } = props;

  const updateSamplesList = useCallback((sample) => {
    let samples = data;
    samples.push(sample);
    setData([...samples]);
  },[data]);

  const unmountEventSource = () => {
    if(!eventSourceRef){
      eventSourceRef.current.close();
    }
    eventSourceRef.current = null;
  };

  useEffect(() => {
    if (props.process !== undefined) {
      setProcess(props.process);

      if (props.process !== null) {
        mountEventSource(props.process.id);
      }
    }

    return(() => {
      unmountEventSource();
    });
  },[]);
  //#endregion

  //#region Modals
  const handleChartModalClose = () => {
    setIsChartModalVisible(false);
  };

  const mountEventSource = (id) => {
    if(!eventSourceRef.current){
      let es = new EventSource(`https://rectifier-backend.herokuapp.com/process/${id}/liveSamples`, config);
      es.onmessage = result => {
        updateSamplesList(JSON.parse(result.data));
      };

      es.onerror = err => {
        console.error('Event Source Error', err);
      };
      eventSourceRef.current = es;
    }
  };



  const handleShow = () => setIsProcessModalVisible(true);
  const handleClose = () => setIsProcessModalVisible(false);
  //#endregion

  const handleProcessSubmit = () => {
    setIsProcessModalVisible(false);
    const body = {
      bathId: props.id
    };

    axios.post('/process/start', body)
      .then(res => {
        setProcess(res.data);
        mountEventSource(res.data.id);
      });
  };

  const handleProcessStop = () => {
    const body = {};
    eventSourceRef.current.close();
    axios.post(`/process/${process.id}/stop`, body)
      .then(() => {
        setProcess(undefined);
        unmountEventSource();
        setData([]);
      });
  };

  const testId = [1,2,3,4,5,6,7,8];
  const testElement = ['name1','name2','name3', 'name4', 'name5', 'name6', 'name6', 'name7', 'name8'];
  const testTypeOfChrome = [1,2,3,4,5,6,7,8];

  const [insertion, setInsertion] = useState({
    id: testId[0],
    element: testElement[0],
    typeOfChrome: testTypeOfChrome[0],
    name: '',
    nrOfDrawing: '',
    nrOfOrder: '',
    nrOfOperation: '',
  });

  const renderOccupationButton = () => {
    if (props.user === null) {
      return (
        <Button variant="outline-secondary mb-1 mr-1 ml-1" size="sm" onClick={() => props.handleOccupy()}>
          {t('Occupy stand')}
        </Button>
      );
    } else if ( props.user.username === username) {
      return (
        <>
          { !process && (
            <Button
              onClick={handleShow}
              variant="outline-success mb-1 mr-1 ml-1"
              size="sm"
            >
              {t('Create insert')}
            </Button>
          ) }
          { process && (
            <Button onClick={handleProcessStop} variant="outline-danger mb-1 ml-1 mr-1" size="sm">
              {t('Finish a process')}
            </Button>
          ) }
          { !process && ( <Button variant="outline-secondary mb-1 mr-1 ml-1" size="sm" onClick={() => props.handleFreeUp()}>
            {t('Free stand')}
          </Button> )
          }
        </>
      );
    } else return null;
  };

  const changeFormInsertion = (name , value) => {
    let insertionUpdate = {...insertion};
    insertionUpdate[name] = value;

    setInsertion(insertionUpdate);
  };

  const renderCurrentBathUser = () => {
    let info = '';
    props.user && props.user.username !== username ? info = <span>{t("Occupied by")} {props.user.username}</span> : info = null;
    return info;
  };

  const ocuppiedClass = props.user ? classes.occupied : classes.vacant;

  return (
    <>
      <Col className="mt-2 mb-2" md="3" as={Card} border="light" text="center">
        <Card.Header className={`${ocuppiedClass}`}>
          {t('Bath')} {props.id} {renderCurrentBathUser()}
        </Card.Header>
        <Card.Body>
          <h6>{t('Process ID')} {process && process.id}</h6>
          <div>
            {renderOccupationButton()}
          </div>
          <Table className="w-100">
            <tbody>
              <ParametersTable
                data={data}
                t = {t}/>
            </tbody>
          </Table>
        </Card.Body>
        <Card.Footer className={classes.card__footer}>
          {process && (
            <Button onClick={() => setIsChartModalVisible(true)} variant="outline-dark" size="sm">
              {t('Show a chart')}
            </Button>
          )}
        </Card.Footer>
      </Col>
      <ProcessModal
        show={isProcessModalVisible}
        t = {t}
        testId={testId}
        insertion={insertion}
        testElement={testElement}
        testTypeOfChrome={testTypeOfChrome}
        changeFormInsertion={(name, value) => changeFormInsertion(name, value)}
        handleClose={() => handleClose()}
        onProcessSubmit={() => handleProcessSubmit()}/>
      <ChartModal
        onModalClose={() => handleChartModalClose()}
        show={isChartModalVisisble}
        samples={data}
      />
    </>
  );
};

export default withNamespaces('Stand')(Stand);
