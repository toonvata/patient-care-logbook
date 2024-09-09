import React from 'react';

interface DoctorSelectProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DoctorSelect: React.FC<DoctorSelectProps> = ({ value, onChange }) => (
  <select
    name="doctor"
    value={value}
    onChange={onChange}
    className="w-full p-2 border rounded"
  >
    <option value="">เลือกแพทย์</option>
    <option value="นายแพทย์นิรัตน์พงษ์ เชาวนิช">นายแพทย์นิรัตน์พงษ์ เชาวนิช</option>
    <option value="นายวาตา โสดา">นายวาตา โสดา</option>
  </select>
);

export default DoctorSelect;