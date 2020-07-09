import React, {useState, useEffect} from 'react';
import './Bath.css';
import { withNamespaces } from 'react-i18next';
import { Card, Col, Table, Button } from 'react-bootstrap';
import classes from './Bath.module.css';
import axios from '../../config/axios.js';

const Bath = (props) => {
  const [parameters, setParameters] = useState('');
  const[fetched, setFetched] = useState('');
  const[changed, setChanged] = useState(false);
  const{minVoltage,minCurrent,minTemperature,minTime,maxVoltage,maxCurrent,maxTemperature,maxTime} = props;
  const object =  {
    minVoltage,
    maxVoltage,
    minCurrent,
    maxCurrent,
    minTemperature,
    maxTemperature,
    minTime,
    maxTime
  };

  useEffect(() => {
    setParameters(object);
    setFetched(object);
  },[]);

  const compareToFetchedData = (params) => {
    if(JSON.stringify(params) === JSON.stringify(fetched)) {
      setChanged(false);
    } else {
      setChanged(true);
    }
  };

  const handleVoltageMinChange = (value) => {
    let parsedValue = parseFloat(value);
    let params = {...parameters, minVoltage: parsedValue};
    compareToFetchedData(params);
    setParameters(params);
  };

  const handleVoltageMaxChange = (value) => {
    let parsedValue = parseFloat(value);
    let params = {...parameters, maxVoltage: parsedValue};
    compareToFetchedData(params);
    setParameters(params);
  };

  const handlePowerMinChange = (value) => {
    let parsedValue = parseFloat(value);
    let params = {...parameters, minCurrent: parsedValue};
    compareToFetchedData(params);
    setParameters(params);
  };

  const handlePowerMaxChange = (value) => {
    let parsedValue = parseFloat(value);
    let params = {...parameters, maxCurrent: parsedValue};
    compareToFetchedData(params);
    setParameters(params);
  };

  const handleTemperatureMinChange = (value) => {
    let parsedValue = parseFloat(value);
    let params = {...parameters, minTemperature: parsedValue};
    compareToFetchedData(params);
    setParameters(params);
  };

  const handleTemperatureMaxChange = (value) => {
    let parsedValue = parseFloat(value);
    let params = {...parameters, maxTemperature: parsedValue};
    compareToFetchedData(params);
    setParameters(params);
  };

  const handleTimeMinChange = (value) => {
    let parsedValue = parseFloat(value);
    let params = {...parameters, minTime: parsedValue};
    compareToFetchedData(params);
    setParameters(params);
  };

  const handleTimeMaxChange = (value) => {
    let parsedValue = parseFloat(value);
    let params = {...parameters, maxTime: parsedValue};
    compareToFetchedData(params);
    setParameters(params);
  };

  const handleDiscardChanges = () => {
    setParameters(fetched);
    setChanged(false);
  };

  const handleSaveChanges = () => {
    setFetched(parameters);
    setChanged(false);

    axios
      .patch(`bath/${props.id}`,parameters);
  };

  return (
    <>
      <Col className="mt-2 mb-2" md="3" as={Card} border="light" text="center" >
        <Card.Header className={classes.lightblue}>
          {props.t('Bath')}: {props.index}
        </Card.Header>
        <Card.Body  className={classes.evenlighter}>
          <Table >
            <tbody>
              <tr>
                <td align="center" className="w-25"> {props.t('Voltage')}</td>
                <td width="15%"> min: </td>
                <td width="15%"><input onChange={(e) => handleVoltageMinChange(e.target.value)} value={parameters.minVoltage} type="number"/></td>
                <td width="15%"> max: </td>
                <td width="15%"><input onChange={(e) => handleVoltageMaxChange(e.target.value)} value={parameters.maxVoltage} type="number"/></td>
                <td width="15%">V</td>
              </tr>
              <tr>
                <td className="w-25"> {props.t('Power')}</td>
                <td className="w-10"> min: </td>
                <td className="w-10"><input onChange={(e) => handlePowerMinChange(e.target.value)} value={parameters.minCurrent} type="number"/></td>
                <td className="w-10"> max: </td>
                <td className="w-10"><input onChange={(e) => handlePowerMaxChange(e.target.value)} value={parameters.maxCurrent} type="number"/></td>
                <td className="w-10">A</td>
              </tr>
              <tr>
                <td className="w-25"> {props.t('Temprature')}</td>
                <td className="w-10"> min: </td>
                <td className="w-10"><input onChange={(e) => handleTemperatureMinChange(e.target.value)} value={parameters.minTemperature} type="number"/></td>
                <td className="w-10"> max: </td>
                <td className="w-10"><input onChange={(e) => handleTemperatureMaxChange(e.target.value)} value={parameters.maxTemperature} type="number"/></td>
                <td className="w-10">C</td>
              </tr>
              <tr>
                <td className="w-25"> {props.t('Time')}</td>
                <td className="w-10"> min: </td>
                <td className="w-10"><input onChange={(e) => handleTimeMinChange(e.target.value)} value={parameters.minTime} type="number"/></td>
                <td className="w-10"> max: </td>
                <td className="w-10"><input onChange={(e) => handleTimeMaxChange(e.target.value)} value={parameters.maxTime} type="number"/></td>
                <td className="w-10">min</td>
              </tr>
            </tbody>
          </Table>
          <div className="button__section">
            {changed ? <><Button onClick={handleDiscardChanges} variant="outline-danger">{props.t('Discard')}</Button> <Button onClick={handleSaveChanges} variant="outline-success">{props.t('Save')}</Button></> : null}
          </div>
        </Card.Body>
      </Col>
    </>
  );
};

export default withNamespaces('Bath')(Bath);
