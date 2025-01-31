import React, { useState } from 'react';
import axios from 'axios';

const UploadFile = ({ onFileUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await axios.post('https://mlore97.pythonanywhere.com/api/upload/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });

        // Passiamo i dati del report ricevuti dal server al componente padre
        onFileUpload(response.data);  // Qui invii i dati del report
      } catch (error) {
        console.error('Errore nel caricamento del file:', error);
      }
    }
  };

  return (
    <div>
      <h2>Carica un file JSON</h2>

      {/* Label che simula il bottone per l'input file */}
      <label htmlFor="file-input" className="w-100 text-white bg-secondary" style={{ cursor: 'pointer' }}>
        Sfoglia...
      </label>
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        style={{ display: 'none' }}  // Rende l'input invisibile
        id="file-input"
      />
    </div>
  );
};

export default UploadFile;
