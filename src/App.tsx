import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PatientManagement from './components/PatientManagement';
import TreatmentManagement from './components/TreatmentManagement';
import Navigation from './components/Navigation';

const App: React.FC = () => {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">ระบบบันทึกประวัติผู้ป่วยและการรักษา</h1>
        <Navigation />
        <Routes>
          <Route path="/" element={<PatientManagement />} />
          <Route path="/treatment" element={<TreatmentManagement />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;