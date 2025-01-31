import React, { useState } from 'react';
import UploadFile from './../components/UploadFile/UploadFile';
import SummaryTable from './../components/SummaryTable/SummaryTable';
import DisplayData from '../components/DisplayJSONData/DisplayJSONData';
import Modal from 'react-modal'; // Importiamo react-modal
import { Button } from '@mui/material'; // Importiamo il componente Button di MUI
import DescriptionIcon from '@mui/icons-material/Description';  // Icona per il documento

Modal.setAppElement('#root');

function SummaryPage() {
  const [report, setReport] = useState(null);  // Stato per il report caricato
  const [loading, setLoading] = useState(false);  // Stato per la gestione del caricamento
  const [isModalOpen, setIsModalOpen] = useState(false); // Stato per gestire l'apertura del modal

  // Funzione per gestire i dati del report dopo il caricamento del file
  const handleFileUpload = (data) => {
    setReport(data);  // Aggiorniamo lo stato con i dati ricevuti
  };

  return (
    <div className="container-full">
        {report && (
          <button
          className="btn-fixed-riepilogofile"
          onClick={() => setIsModalOpen(true)}
        >
          <DescriptionIcon />
        </button>
        )}

        <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            contentLabel="Security Report"
            className="modal-content"
            overlayClassName="modal-overlay"
        >
            <DisplayData data={report}/>
            <Button className="bg-danger text-white" onClick={() => setIsModalOpen(false)}>Chiudi</Button>
        </Modal>

      <h1>Security Report Viewer</h1>
      <div className="d-flex flex-row justify-content-center align-items-center">
        <UploadFile onFileUpload={handleFileUpload} /> {/* Passiamo la funzione di gestione al componente figlio */}
        
      </div>
      {loading ? (
        <p>Loading report...</p>
      ) : (
        report && <SummaryTable report={report} />
      )}
    </div>
  );
}

export default SummaryPage;
