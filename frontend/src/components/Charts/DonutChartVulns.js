import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

// Registriamo i componenti necessari di Chart.js
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function DonutChartVulns({ report }) {
  // Estrai le vulnerabilità passive dai dati del report
  const passiveVulns = report.results.map(item => item.vulnerability_score_passive);

  // Conta quante vulnerabilità ci sono in totale
  const totalVulns = passiveVulns.reduce((acc, vuln) => acc + vuln, 0); // Somma di tutte le vulnerabilità

  // Configurazione dei dati del grafico a ciambella
  const data = {
    labels: ['Vulnerabilità Passive'],
    datasets: [
      {
        data: [totalVulns], // Usa solo il valore delle vulnerabilità passive
        backgroundColor: ['#333'], // Colore per vulnerabilità passive
        hoverBackgroundColor: ['#332'],
        borderColor: ['#332'],
        borderWidth: 1,
      }
    ]
  };

  // Configurazione delle opzioni per il grafico a ciambella
  const options = {
    responsive: true,
    cutout: '70%', // Crea l'effetto ciambella
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.raw} vulnerabilities`;
          },
        },
      },
    },
  };

  return (
    <div>
      <h3>Vulnerabilità Passive</h3>
      <span>{totalVulns}</span>
      <Pie data={data} options={options} />
    </div>
  );
}

export default DonutChartVulns;
