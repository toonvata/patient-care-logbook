import React, { useState, useEffect } from 'react';
import TreatmentForm from './TreatmentForm';
import TreatmentHistory from './TreatmentHistory';
import { Patient, Treatment } from '../types';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';

const TreatmentManagement: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const fetchPatients = async () => {
      const querySnapshot = await getDocs(collection(db, 'patients'));
      const patientsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Patient));
      setPatients(patientsData);
    };

    fetchPatients();
  }, []);

  useEffect(() => {
    const fetchTreatments = async () => {
      if (selectedPatient) {
        const q = query(collection(db, 'treatments'), where('patientHN', '==', selectedPatient.hn));
        const querySnapshot = await getDocs(q);
        const treatmentsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Treatment));
        setTreatments(treatmentsData);
      }
    };

    fetchTreatments();
  }, [selectedPatient]);

  const handleTreatmentAdded = () => {
    // Refresh treatments after adding a new one
    if (selectedPatient) {
      const fetchTreatments = async () => {
        const q = query(collection(db, 'treatments'), where('patientHN', '==', selectedPatient.hn));
        const querySnapshot = await getDocs(q);
        const treatmentsData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Treatment));
        setTreatments(treatmentsData);
      };

      fetchTreatments();
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">บันทึกการรักษา</h2>
      <TreatmentForm
        patients={patients}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
        onTreatmentAdded={handleTreatmentAdded}
      />
      {selectedPatient && (
        <TreatmentHistory
          treatments={treatments}
          deleteTreatment={() => {}} // Implement delete functionality if needed
        />
      )}
    </div>
  );
};

export default TreatmentManagement;