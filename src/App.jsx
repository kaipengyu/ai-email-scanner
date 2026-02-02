import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/shared/Navigation';
import { PDFToEmail } from './EmailScanner';
import ValidationPage from './components/validation/ValidationPage';
import './EmailScanner.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="pdf-to-email-storybook">
        <Navigation />
        <Routes>
          <Route path="/" element={<PDFToEmail />} />
          <Route path="/validation" element={<ValidationPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
