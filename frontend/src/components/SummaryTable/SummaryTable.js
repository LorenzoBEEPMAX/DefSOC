import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Modal from 'react-modal';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale, BarElement, LinearScale } from 'chart.js';
import DonutChartVulns from '../Charts/DonutChartVulns';
// Registriamo i componenti necessari di Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale, BarElement, LinearScale);

function SummaryTable({ report }) {
  const [open, setOpen] = useState(false);
  const [summaryText, setSummaryText] = useState("");
  
  // Funzione per aprire la modal con il summary
  const handleOpen = (summary) => {
    setSummaryText(summary);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // useEffect(() => {
  //   console.log("REPORT", report);
  // }, [report]);

  // Se il report non è ancora caricato
  if (!report || !report.results || report.results.length === 0) {
    return <div>Loading...</div>;
  }

  const getRiskColor = (riskScore) => {
    // Determina il colore in base al punteggio di rischio
    if (riskScore >= 80) return 'bg-danger'; // Rosso per valori sopra 80
    if (riskScore >= 60) return 'bg-warning'; // Giallo per valori sopra 60
    return 'bg-success'; // Verde per valori sotto 60
  };

  

  // Dati per il grafico a torta
  const riskScores = report.results.map(item => item.risk_score);
  const riskCategories = ['Low Risk', 'Medium Risk', 'High Risk'];
  
  // Calcoliamo la distribuzione dei rischi (ad esempio, 0-40% = Low Risk, 40-70% = Medium Risk, 70-100% = High Risk)
  const riskDistribution = [0, 0, 0];

  riskScores.forEach(score => {
    if (score <= 40) riskDistribution[0]++;
    else if (score <= 70) riskDistribution[1]++;
    else riskDistribution[2]++;
  });

  // Configurazione dei dati del grafico
  const data = {
    labels: riskCategories,
    datasets: [
      {
        data: riskDistribution,
        backgroundColor: ['#4CAF50', '#FFC107', '#F44336'], // Verde per Low, Giallo per Medium, Rosso per High
        hoverBackgroundColor: ['#81C784', '#FFEB3B', '#FF7043'],
        borderColor: ['#388E3C', '#F57C00', '#D32F2F'],
        borderWidth: 1,
      }
    ]
  };

  // Sommiamo le vulnerabilità attive per ciascun dominio
  const domainNames = report.results.map(item => item.domain_name);
  const activeVulnerabilities = report.results.map(item => item.vulnerability_score_active);

  // Dati per il grafico a barre (istogramma)
  const barData = {
    labels: domainNames,
    datasets: [
      {
        label: 'Active Vulnerabilities',
        data: activeVulnerabilities,
        backgroundColor: '#FF6347',  // Colore delle barre
        borderColor: '#D32F2F', // Colore del bordo
        borderWidth: 1,
      }
    ]
  };

  const barOptions = {
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };


  return (
    <div className="container">
      <h2>Security Summary</h2>
      <div className="row">
        <div className="col-md-4 col-lg-2 col-sm-8 d-flex flex-column mt-2">
          <h3>Distribuzione del Rischio</h3>
            <Pie 
              data={data} 
              height={10} // Imposta l'altezza
              width={10}  // Imposta la larghezza
            />
        </div>
        <div className="col-md-8 col-lg-6 col-sm-8 d-flex flex-column mt-2">
          <h3>Vulnerabilità Attive per Dominio</h3>
          <Bar data={barData} options={barOptions} height={250} width={500} />
        </div>
        <div className="col-md-8 col-lg-2 col-sm-8 d-flex flex-column mt-2">
          <DonutChartVulns report={report} />
        </div>
      </div>
      {/* Tabella per il riepilogo */}
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
                      
                    </div>
                    <div className="progress-bar-background"><span>{item.risk_score}%</span> {/* Testo sempre centrato */}</div> {/* Barra di supporto */}
                  </div>
                </td>
                <td>
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
      

      

      {/* Modal per visualizzare il summary */}
      <Modal isOpen={open} className="modal-content" overlayClassName="modal-overlay" onClose={handleClose}>
        <h3>Executive Summary</h3>
        <pre>{summaryText}</pre>
        <Button variant="contained" onClick={handleClose}>Close</Button>
      </Modal>
            {/* Grafico a torta */}
      
    </div>
  );
}

export default SummaryTable;
