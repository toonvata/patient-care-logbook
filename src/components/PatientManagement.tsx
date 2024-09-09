import React, { useState, useEffect } from 'react';
import PatientForm from './PatientForm';
import PatientList from './PatientList';
import { Patient } from '../types';

const PatientManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);

  useEffect(() => {
    const storedPatients = localStorage.getItem('patients');
    if (storedPatients) {
      setPatients(JSON.parse(storedPatients));
    }
  }, []);

  const addPatient = (patient: Patient) => {
    const updatedPatients = [...patients, patient];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const deletePatient = (hn: string) => {
    const updatedPatients = patients.filter(p => p.hn !== hn);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">บันทึกข้อมูลผู้ป่วย</h2>
      <PatientForm addPatient={addPatient} />
      <PatientList patients={patients} deletePatient={deletePatient} />
    </div>
  );
};

export default PatientManagement;