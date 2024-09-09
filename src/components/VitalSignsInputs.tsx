import React from 'react';
import { Treatment } from '../types';

interface VitalSignsInputsProps {
  treatment: Treatment;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VitalSignsInputs: React.FC<VitalSignsInputsProps> = ({ treatment, handleChange }) => (
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
);

export default VitalSignsInputs;