import React, { useState } from 'react';
import { Patient, Treatment } from '../types';
import BodyChart from './BodyChart';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';
import { generateMedicalCertificatePDF } from '../utils/pdfGenerator';
import DoctorSelect from './DoctorSelect';
import LicenseSelect from './LicenseSelect';
import VitalSignsInputs from './VitalSignsInputs';
import DateInputs from './DateInputs';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import DrugSearch from './DrugSearch';

interface TreatmentFormProps {
  patients: Patient[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  onTreatmentAdded: () => void;
}

const treatmentOptions = [
  { id: 'massage', label: 'นวด' },
  { id: 'cutAdhesions', label: 'ตัดพังผืด' },
  { id: 'neckAdjustment', label: 'จัดกระดูกคอ' },
  { id: 'neckTraction', label: 'ดึงคอ' },
  { id: 'backAdjustment', label: 'จัดกระดูกหลัง' },
  { id: 'backTraction', label: 'ดึงหลัง' },
  { id: 'shoulderAdjustment', label: 'ปรับไหล่' },
  { id: 'armAdjustment', label: 'ปรับมือ ศอก แขน' },
];

interface Drug {
  id: number;
  name: string;
  price: number;
  unit: string;
  quantity: number;
}

const TreatmentForm: React.FC<TreatmentFormProps> = ({
  patients,
  selectedPatient,
  setSelectedPatient,
  onTreatmentAdded
}) => {
  const [treatment, setTreatment] = useState<Treatment & { drugs: Drug[] }>({
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
    dayCount: 0,
    treatmentOptions: {},
    drugs: [],
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

  const handleCheckboxChange = (optionId: string, checked: boolean) => {
    setTreatment(prev => ({
      ...prev,
      treatmentOptions: {
        ...prev.treatmentOptions,
        [optionId]: checked
      }
    }));
  };

  const handleBodyChartChange = (dataUrl: string) => {
    setTreatment(prev => ({ ...prev, bodyChart: dataUrl }));
  };

  const handleDrugSelect = (drug: Drug, quantity: number) => {
    setTreatment(prev => ({
      ...prev,
      drugs: [...prev.drugs, { ...drug, quantity }]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedPatient) {
      try {
        const treatmentToSave = {
          ...treatment,
          treatment: Object.entries(treatment.treatmentOptions)
            .filter(([_, value]) => value)
            .map(([key, _]) => treatmentOptions.find(option => option.id === key)?.label)
            .join(', '),
          medication: treatment.drugs.map(drug => `${drug.name} x ${drug.quantity}`).join(', '),
          totalCost: treatment.drugs.reduce((total, drug) => total + drug.price * drug.quantity, 0)
        };
        await addDoc(collection(db, 'treatments'), treatmentToSave);
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
          dayCount: 0,
          treatmentOptions: {},
          drugs: [],
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
          <VitalSignsInputs treatment={treatment} handleChange={handleChange} />
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
          <div className="space-y-2">
            <Label>การรักษา</Label>
            {treatmentOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={treatment.treatmentOptions[option.id] || false}
                  onCheckedChange={(checked) => handleCheckboxChange(option.id, checked as boolean)}
                />
                <Label htmlFor={option.id}>{option.label}</Label>
              </div>
            ))}
          </div>
          <DrugSearch onDrugSelect={handleDrugSelect} />
          <div>
            <h3>รายการยาที่เลือก:</h3>
            <ul>
              {treatment.drugs.map((drug, index) => (
                <li key={index}>
                  {drug.name} x {drug.quantity} - {drug.price * drug.quantity} บาท
                </li>
              ))}
            </ul>
            <p>ราคารวม: {treatment.drugs.reduce((total, drug) => total + drug.price * drug.quantity, 0)} บาท</p>
          </div>
          <input
            type="date"
            name="nextAppointment"
            value={treatment.nextAppointment}
            onChange={handleChange}
            placeholder="วันนัดครั้งต่อไป"
            className="w-full p-2 border rounded"
          />
          <DoctorSelect value={treatment.doctor} onChange={handleChange} />
          <LicenseSelect
            licenseType={treatment.licenseType}
            licenseNumber={treatment.licenseNumber}
            onChange={handleChange}
          />
          <DateInputs treatment={treatment} handleChange={handleChange} />
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