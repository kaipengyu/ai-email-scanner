import React from 'react';
import ReactDOM from 'react-dom/client';
import { PDFToEmail } from './EmailScanner';
import './EmailScanner.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PDFToEmail />
  </React.StrictMode>,
);
