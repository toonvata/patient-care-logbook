import React, { useState, useEffect } from 'react';
import TreatmentForm from './TreatmentForm';
import TreatmentHistory from './TreatmentHistory';
import { Patient, Treatment } from '../types';

const TreatmentManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const storedPatients = localStorage.getItem('patients');
    const storedTreatments = localStorage.getItem('treatments');
    if (storedPatients) setPatients(JSON.parse(storedPatients));
    if (storedTreatments) setTreatments(JSON.parse(storedTreatments));
  }, []);

  const addTreatment = (treatment: Treatment) => {
    const updatedTreatments = [...treatments, treatment];
    setTreatments(updatedTreatments);
    localStorage.setItem('treatments', JSON.stringify(updatedTreatments));
  };

  const deleteTreatment = (patientHN: string, treatmentDate: string) => {
    const updatedTreatments = treatments.filter(
      t => !(t.patientHN === patientHN && t.date === treatmentDate)
    );
    setTreatments(updatedTreatments);
    localStorage.setItem('treatments', JSON.stringify(updatedTreatments));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">บันทึกการรักษา</h2>
      <TreatmentForm
        patients={patients}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
        addTreatment={addTreatment}
      />
      {selectedPatient && (
        <TreatmentHistory
          treatments={treatments.filter(t => t.patientHN === selectedPatient.hn)}
          deleteTreatment={deleteTreatment}
        />
      )}
    </div>
  );
};

export default TreatmentManagement;