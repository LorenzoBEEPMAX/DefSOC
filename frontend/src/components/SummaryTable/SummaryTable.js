import React, { useEffect, useState } from 'react';
import { Button, Box } from '@mui/material';
import Modal from 'react-modal'; // Importiamo react-modal


function SummaryTable({ report }) {
  const [open, setOpen] = useState(false); // Stato per la Modal
  const [summaryText, setSummaryText] = useState(""); // Stato per il testo della modal

  const handleOpen = (summary) => {
    setSummaryText(summary);
    setOpen(true); // Apre la Modal
  };

  const handleClose = () => {
    setOpen(false); // Chiude la Modal
  };

  useEffect(() => {
    console.log("REPORT", report);
  }, [report]);

  if (!report || !report.results || report.results.length === 0) {
    return <div>Loading...</div>;
  }

  const getRiskColor = (riskScore) => {
    // Determina il colore in base al punteggio di rischio
    if (riskScore >= 80) return 'bg-danger'; // Rosso per valori sopra 80
    if (riskScore >= 60) return 'bg-warning'; // Giallo per valori sopra 60
    return 'bg-success'; // Verde per valori sotto 60
  };

  return (
    <div className="container">
      <h2>Security Summary</h2>

      {/* Table for the summary */}
      <div className="table-wrapper">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Domain Name</th>
              <th>Risk Score</th>
              <th>Executive Summary</th>
              <th>Active Vulnerabilities</th>
              <th>Passive Vulnerabilities</th>
              <th>Email Spoofing</th>
              <th>DMARC Policy</th>
              <th>Blacklist Detections</th>
            </tr>
          </thead>
          <tbody>
            {report.results.map((item) => (
              <tr key={item.idsummary}>
                <td>{item.domain_name}</td>
                <td>
                  <div className="progress">
                    <div
                      className={`progress-bar ${getRiskColor(item.risk_score)}`}
                      role="progressbar"
                      style={{ width: `${item.risk_score}%` }}
                      aria-valuenow={item.risk_score}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {item.risk_score}%
                    </div>
                  </div>
                </td>
                <td className="th-description">
                  <Button variant="outlined" onClick={() => handleOpen(item.summary_text)}>
                    Leggi resoconto
                  </Button>
                </td>
                <td>{item.vulnerability_score_active}</td>
                <td>{item.vulnerability_score_passive}</td>
                <td>{item.email_security?.spoofable}</td>
                <td>{item.email_security?.dmarc_policy}</td>
                <td>{item.email_security?.blacklist_detections}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Open Ports section */}
      <h3>Open Ports:</h3>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Port</th>
            <th>Occurrences</th>
          </tr>
        </thead>
        <tbody>
          {report.results[0]?.n_port && Object.entries(report.results[0].n_port).map(([port, { n }]) => (
            <tr key={port}>
              <td>Port {port}</td>
              <td>{n} occurrences</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal to show summary text */}
      <Modal isOpen={open} className="modal-content" overlayClassName="modal-overlay"  onClose={handleClose}>
          <h3>Executive Summary</h3>
          <pre>{summaryText}</pre>
          <Button variant="contained" onClick={handleClose}>Close</Button>
      </Modal>
    </div>
  );
}


export default SummaryTable;
