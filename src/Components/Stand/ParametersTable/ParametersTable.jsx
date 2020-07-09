import React from 'react';

const ParametersTable = ({ data, t }) => {
  return(
    <>
      <tr>
        <td className="w-25">{t('Voltage')}</td>
        <td>{data.length > 0 ? parseFloat(data[data.length - 1].voltage).toPrecision(5) : '-'}</td>
        <td className="w-10">V</td>
      </tr>
      <tr>
        <td className="w-25">{t('Power')}</td>
        <td>{data.length > 0 ? parseFloat(data[data.length - 1].current).toPrecision(5) : '-'}</td>
        <td className="w-10">A</td>
      </tr>
      <tr>
        <td className="w-25">{t('Temperature')}</td>
        <td>{data.length > 0 ? 'unknown' : '-'}</td>
        <td className="w-10">C</td>
      </tr>
      <tr>
        <td className="w-25">{t('Time')}</td>
        <td>{data.length > 0 ? (new Date(data[data.length - 1].timestamp).toDateString()) : '-'}</td>
        <td className="w-10">min</td>
      </tr>
      <tr>
        <td className="w-25">{t('State')}</td>
        <td>{data.length > 0 ? 'ok' : '-'}</td>
        <td className="w-10"></td>
      </tr>
    </>
  );
};

export default ParametersTable;
