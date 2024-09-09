import React, { useState } from 'react';
import { Patient, Treatment } from '../types';
import BodyChart from './BodyChart';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { jsPDF } from 'jspdf';

interface TreatmentFormProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  onTreatmentAdded: () => void;
}

const TreatmentForm: React.FC<TreatmentFormProps> = ({
  patients,
  selectedPatient,
  setSelectedPatient,
  onTreatmentAdded
}) => {
  const [treatment, setTreatment] = useState<Treatment>({
    patientHN: '',
    date: '',
    vitalSigns: { bloodPressure: '', pulse: 0, temperature: 0, respiratoryRate: 0 },
    symptoms: '',
    diagnosis: '',
    treatment: '',
    medication: '',
    nextAppointment: '',
    bodyChart: ''
  });

  const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const patient = patients.find(p => p.hn === e.target.value) || null;
    setSelectedPatient(patient);
    setTreatment(prev => ({ ...prev, patientHN: patient ? patient.hn : '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTreatment(prev => ({
      ...prev,
      [name]: name.includes('vitalSigns.') ? {
        ...prev.vitalSigns,
        [name.split('.')[1]]: value
      } : value
    }));
  };

  const handleBodyChartChange = (dataUrl: string) => {
    setTreatment(prev => ({ ...prev, bodyChart: dataUrl }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatient) {
      try {
        await addDoc(collection(db, 'treatments'), treatment);
        onTreatmentAdded();
        setTreatment({
          patientHN: selectedPatient.hn,
          date: '',
          vitalSigns: { bloodPressure: '', pulse: 0, temperature: 0, respiratoryRate: 0 },
          symptoms: '',
          diagnosis: '',
          treatment: '',
          medication: '',
          nextAppointment: '',
          bodyChart: ''
        });
      } catch (error) {
        console.error("Error adding treatment: ", error);
      }
    }
  };

  const generatePDF = () => {
    if (!selectedPatient) return;

    const doc = new jsPDF();

    doc.setFont("Sarabun");
    doc.setFontSize(16);
    doc.text('ใบรับรองแพทย์', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`ชื่อ-นามสกุล: ${selectedPatient.name}`, 20, 40);
    doc.text(`HN: ${selectedPatient.hn}`, 20, 50);
    doc.text(`วันที่ตรวจ: ${treatment.date}`, 20, 60);
    doc.text(`อาการ: ${treatment.symptoms}`, 20, 70);
    doc.text(`การวินิจฉัย: ${treatment.diagnosis}`, 20, 80);
    doc.text(`การรักษา: ${treatment.treatment}`, 20, 90);
    doc.text(`ยาที่ได้รับ: ${treatment.medication}`, 20, 100);
    doc.text(`นัดครั้งต่อไป: ${treatment.nextAppointment}`, 20, 110);

    if (treatment.bodyChart) {
      doc.addImage(treatment.bodyChart, 'JPEG', 20, 120, 100, 100);
    }

    doc.save(`medical_certificate_${selectedPatient.hn}_${treatment.date}.pdf`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <select
        value={selectedPatient?.hn || ''}
        onChange={handlePatientSelect}
        className="w-full p-2 border rounded"
      >
        <option value="">เลือกผู้ป่วย</option>
        {patients.map(patient => (
          <option key={patient.hn} value={patient.hn}>
            {patient.name} ({patient.hn})
          </option>
        ))}
      </select>
      {selectedPatient && (
        <>
          <input
            type="date"
            name="date"
            value={treatment.date}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
          <fieldset className="border p-4 rounded">
            <legend className="text-lg font-semibold">Vital Signs</legend>
            <input
              type="text"
              name="vitalSigns.bloodPressure"
              value={treatment.vitalSigns.bloodPressure}
              onChange={handleChange}
              placeholder="ความดันโลหิต"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="vitalSigns.pulse"
              value={treatment.vitalSigns.pulse}
              onChange={handleChange}
              placeholder="ชีพจร"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="vitalSigns.temperature"
              value={treatment.vitalSigns.temperature}
              onChange={handleChange}
              placeholder="อุณหภูมิ"
              className="w-full p-2 border rounded mb-2"
            />
            <input
              type="number"
              name="vitalSigns.respiratoryRate"
              value={treatment.vitalSigns.respiratoryRate}
              onChange={handleChange}
              placeholder="อัตราการหายใจ"
              className="w-full p-2 border rounded"
            />
          </fieldset>
          <textarea
            name="symptoms"
            value={treatment.symptoms}
            onChange={handleChange}
            placeholder="อาการ"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="diagnosis"
            value={treatment.diagnosis}
            onChange={handleChange}
            placeholder="การวินิจฉัย"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="treatment"
            value={treatment.treatment}
            onChange={handleChange}
            placeholder="การรักษา"
            className="w-full p-2 border rounded"
          />
          <textarea
            name="medication"
            value={treatment.medication}
            onChange={handleChange}
            placeholder="ยาที่ได้รับ"
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="nextAppointment"
            value={treatment.nextAppointment}
            onChange={handleChange}
            placeholder="วันนัดครั้งต่อไป"
            className="w-full p-2 border rounded"
          />
          <BodyChart onChange={handleBodyChartChange} initialData={treatment.bodyChart} />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            บันทึกการรักษา
          </button>
          <button type="button" onClick={generatePDF} className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
            สร้าง PDF
          </button>
        </>
      )}
    </form>
  );
};

export default TreatmentForm;