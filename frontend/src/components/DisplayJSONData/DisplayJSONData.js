import React from 'react';

const DisplayData = ({ data }) => {
  return (
    <div>
      <h2>Dati del Report</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default DisplayData;
