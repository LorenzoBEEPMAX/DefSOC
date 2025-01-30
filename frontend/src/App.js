import React, { useState } from 'react';
import Navbar from './components/Navbar/Navbar';
import UploadFile from './components/UploadFile/UploadFile';
import DisplayData from './components/DisplayJSONData/DisplayJSONData';
import './App.css';
import SummaryPage from './controllers/SummaryPage';

function App() {
  const [fileData, setFileData] = useState(null);

  const handleFileUpload = (file) => {

    const reader = new FileReader();
    reader.onload = () => {
      const jsonData = JSON.parse(reader.result);
      setFileData(jsonData);
      console.log(jsonData);

    };
    reader.readAsText(file);
  }
  
  return (
    <div className="App">
      <Navbar />
      <div className="App-content">
        <SummaryPage/>
      </div>
    </div>
  );
}

export default App;
