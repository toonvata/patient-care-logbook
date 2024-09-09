import React, { useState } from 'react';
import { Patient, Treatment } from '../types';
import BodyChart from './BodyChart';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { generateMedicalCertificatePDF } from '../utils/pdfGenerator';

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
    bodyChart: '',
    doctor: '',
    licenseType: '',
    licenseNumber: '',
    startDate: '',
    endDate: '',
    dayCount: 0
  });

  const handlePatientSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const patient = patients.find(p => p.hn === e.target.value) || null;
    setSelectedPatient(patient);
    setTreatment(prev => ({ ...prev, patientHN: patient ? patient.hn : '' }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          bodyChart: '',
          doctor: '',
          licenseType: '',
          licenseNumber: '',
          startDate: '',
          endDate: '',
          dayCount: 0
        });
      } catch (error) {
        console.error("Error adding treatment: ", error);
      }
    }
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
          <select
            name="doctor"
            value={treatment.doctor}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">เลือกแพทย์</option>
            <option value="นายแพทย์นิรัตน์พงษ์ เชาวนิช">นายแพทย์นิรัตน์พงษ์ เชาวนิช</option>
            <option value="นายวาตา โสดา">นายวาตา โสดา</option>
          </select>
          <select
            name="licenseType"
            value={treatment.licenseType}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">เลือกประเภทใบอนุญาต</option>
            <option value="เวชกรรมแผนปัจจุบัน">เวชกรรมแผนปัจจุบัน</option>
            <option value="แพทย์แผนไทยประยุกต์">แพทย์แผนไทยประยุกต์</option>
          </select>
          <input
            type="text"
            name="licenseNumber"
            value={treatment.licenseNumber}
            onChange={handleChange}
            placeholder="เลขที่ใบอนุญาต"
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="startDate"
            value={treatment.startDate}
            onChange={handleChange}
            placeholder="วันที่เริ่มลา"
            className="w-full p-2 border rounded"
          />
          <input
            type="date"
            name="endDate"
            value={treatment.endDate}
            onChange={handleChange}
            placeholder="วันที่สิ้นสุดการลา"
            className="w-full p-2 border rounded"
          />
          <input
            type="number"
            name="dayCount"
            value={treatment.dayCount}
            onChange={handleChange}
            placeholder="จำนวนวันลา"
            className="w-full p-2 border rounded"
          />
          <BodyChart onChange={handleBodyChartChange} initialData={treatment.bodyChart} />
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            บันทึกการรักษา
          </button>
          <button type="button" onClick={() => generateMedicalCertificatePDF(selectedPatient, treatment)} className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600">
            สร้าง PDF ใบรับรองแพทย์
          </button>
        </>
      )}
    </form>
  );
};

export default TreatmentForm;