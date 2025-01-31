import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    // Supponiamo che l'API accetti l'upload del file su '/api/upload/'
    axios.post('https://mlore97.pythonanywhere.com/api/upload/', formData)
      .then(response => {
        onFileUpload(file);  // Passiamo il file caricato al componente padre
      })
      .catch(error => console.error('Errore nel caricamento del file:', error));
  };

  return (
    <div>
      <h2>Carica un file JSON</h2>
      <input type="file" accept=".json" onChange={handleFileChange} />
      <button onClick={handleFileUpload} disabled={!file}>Carica</button>
    </div>
  );
};

export default UploadFile;
