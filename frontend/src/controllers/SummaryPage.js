import React, { useState } from 'react';
import UploadFile from './../components/UploadFile/UploadFile';
import SummaryTable from './../components/SummaryTable/SummaryTable';
import axios from 'axios';
import DisplayData from '../components/DisplayJSONData/DisplayJSONData';
import Modal from 'react-modal'; // Importiamo react-modal
import { Button } from '@mui/material'; // Importiamo il componente Button di MUI
Modal.setAppElement('#root');

function SummaryPage() {
  const [report, setReport] = useState(null);  // Stato per il report caricato
  const [loading, setLoading] = useState(false);  // Stato per la gestione del caricamento
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per gestire l'apertura del modal

  const handleFileUpload = async (file) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('https://mlore97.pythonanywhere.com/api/upload/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // Supponiamo che la risposta contenga il report in formato JSON
      const { data } = response;  // Assicurati che la risposta contenga i dati in formato JSON
      setReport(data);  // Imposta i dati nel nostro stato

      setLoading(false);  // Impostiamo lo stato di caricamento a false quando il file è stato elaborato
    } catch (error) {
      console.error('Error uploading file:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container-full">
        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Security Report"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <DisplayData data={report}/>
            <Button onClick={() => setIsModalOpen(false)}>Close</Button>
        </Modal>
      <h1>Security Report Viewer</h1>
      <UploadFile onFileUpload={handleFileUpload} />
      {report && (
        <div className="w-100">
            <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>Riepilogo del file</Button>
        </div>
      )}
      {loading ? (
        <p>Loading report...</p>
      ) : (
        report && <SummaryTable report={report} />
      )}
    </div>
  );
}

export default SummaryPage;
