import React, { useState } from 'react';
import { Patient } from '../types';

interface PatientFormProps {
  addPatient: (patient: Patient) => void;
}

const PatientForm: React.FC<PatientFormProps> = ({ addPatient }) => {
  const [patient, setPatient] = useState<Patient>({
    hn: '',
    name: '',
    birthdate: '',
    occupation: '',
    address: '',
    phone: '',
    underlyingDisease: '',
    allergies: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setPatient(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient = { ...patient, hn: 'HN' + Date.now().toString().slice(-6) };
    addPatient(newPatient);
    setPatient({
      hn: '',
      name: '',
      birthdate: '',
      occupation: '',
      address: '',
      phone: '',
      underlyingDisease: '',
      allergies: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="name"
        value={patient.name}
        onChange={handleChange}
        placeholder="ชื่อ-นามสกุล"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="date"
        name="birthdate"
        value={patient.birthdate}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="occupation"
        value={patient.occupation}
        onChange={handleChange}
        placeholder="อาชีพ"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="address"
        value={patient.address}
        onChange={handleChange}
        placeholder="ที่อยู่"
        className="w-full p-2 border rounded"
      />
      <input
        type="tel"
        name="phone"
        value={patient.phone}
        onChange={handleChange}
        placeholder="เบอร์โทรศัพท์"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="underlyingDisease"
        value={patient.underlyingDisease}
        onChange={handleChange}
        placeholder="โรคประจำตัว"
        className="w-full p-2 border rounded"
      />
      <textarea
        name="allergies"
        value={patient.allergies}
        onChange={handleChange}
        placeholder="ประวัติการแพ้ยา"
        className="w-full p-2 border rounded"
      />
      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        บันทึกข้อมูล
      </button>
    </form>
  );
};

export default PatientForm;